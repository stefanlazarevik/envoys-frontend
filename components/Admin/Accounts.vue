<template>
  <div>

    <!-- Start: header bar -->
    <div class="pa-2">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="search" v-on:keyup="getAccounts" color="primary" :label="$vuetify.lang.t('$vuetify.lang_209')" outlined dense hide-details />
        </v-col>
        <v-col cols="12" md="6">
          <v-btn color="black--text grey lighten-5 text-capitalize" elevation="0" large class="float-end">
            {{ count }}
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <!-- End: header bar -->

    <v-divider />

    <template v-if="accounts.length">

      <!-- Start: data table -->
      <v-data-table :class="count > limit ? 'none-radius ' : ''" :headers="headlines" :items="accounts" :page.sync="page" item-key="id" :server-items-length="length" :items-per-page="limit" hide-default-footer show-expand single-expand>
        <template v-slot:item.data-table-expand="{ item, expand, isExpanded }">
          <template v-if="isExpanded">
            <v-icon @click="expand(!isExpanded)">
              mdi-chevron-up
            </v-icon>
          </template>
          <template v-else>
            <v-icon @click="expand(!isExpanded)">
              mdi-chevron-down
            </v-icon>
          </template>
        </template>
        <template v-slot:item.id="{ item }">
          <v-chip color="blue lighten-4" class="ml-0 mr-2 black--text" label small>
            {{ item.id }}
          </v-chip>
        </template>
        <template v-slot:item.name="{ item }">
          <b>{{ item.name }}</b>
        </template>
        <template v-slot:item.email="{ item }">
          <i>{{ item.email }}</i>
        </template>
        <template v-slot:item.rules="{ item }">
          <template v-if="item.rules && item.rules.length">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on">mdi-circle-slice-8</v-icon>
              </template>
              <span>
                <div class="mx-1 text-uppercase" v-for="rule in item.rules" :key="rule">
                  <v-icon color="white">mdi-asterisk</v-icon> {{ rule }}
                </div>
              </span>
            </v-tooltip>
          </template>
          <template v-else>
            <v-icon>mdi-circle-off-outline</v-icon>
          </template>
        </template>
        <template v-slot:item.status="{ item }">
          <template v-if="item.status">
            <v-icon color="green">
              mdi-check-circle-outline
            </v-icon>
          </template>
          <template v-else>
            <v-icon color="red">
              mdi-close-circle-outline
            </v-icon>
          </template>
        </template>
        <template v-slot:item.create_at="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <div v-bind="attrs" v-on="on">
                <v-icon>mdi-clock-time-nine-outline</v-icon> {{ $moment(item.create_at).format('YY-MM-DD') }}
              </div>
            </template>
            <span>
              {{ $moment(item.create_at).format('YY-MM-DD h:mm:ss') }}
            </span>
          </v-tooltip>
        </template>
        <template v-slot:item.edit="{ item }">
          <v-btn :to="`/admin/accounts/${item.id}/editor`" icon>
            <v-icon>
              mdi-circle-edit-outline
            </v-icon>
          </v-btn>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <v-row class="mt-2">
              <v-col cols="12" md="4">
                <v-btn :to="`/admin/accounts/${item.id}/transactions`" class="mb-5 text-capitalize" block depressed large outlined color="red">
                  {{ $vuetify.lang.t('$vuetify.lang_273') }} {{ item.counts.transaction }}
                </v-btn>
              </v-col>
              <v-col cols="12" md="4">
                <v-btn :to="`/admin/accounts/${item.id}/orders`" class="mb-5 text-capitalize" block depressed large outlined color="cyan">
                  {{ $vuetify.lang.t('$vuetify.lang_183') }} {{ item.counts.order }}
                </v-btn>
              </v-col>
              <v-col cols="12" md="4">
                <v-btn :to="`/admin/accounts/${item.id}/assets`" class="mb-5 text-capitalize" block depressed large outlined color="lime">
                  {{ $vuetify.lang.t('$vuetify.lang_79') }} {{ item.counts.asset }}
                </v-btn>
              </v-col>
            </v-row>
          </td>
        </template>

      </v-data-table>
      <!-- End: data table -->

      <v-divider v-if="count > limit" />

      <!-- Start: pagination -->
      <v-container v-if="length > 1" class="max-width">
        <v-row justify="center">
          <v-col cols="8">
            <v-pagination v-model="page" @input="getMore()" :length="length"></v-pagination>
          </v-col>
        </v-row>
      </v-container>
      <!-- End: pagination -->

    </template>

    <!-- Start: no history -->
    <template v-else-if="!overlay">
      <v-layout fill-height wrap>
        <v-flex/>
        <v-flex align-self-center class="text-center my-16" md4 mx5 sm6 xl3>
          <v-img class="ma-auto" width="250" src="/asset/3.png" />
          <template v-if="search">
            <h2>{{ $vuetify.lang.t('$vuetify.lang_210') }}</h2>
            {{ $vuetify.lang.t('$vuetify.lang_211') }}
          </template>
          <template v-else>
            <h2>{{ $vuetify.lang.t('$vuetify.lang_262') }}</h2>
            {{ $vuetify.lang.t('$vuetify.lang_263') }}
          </template>
        </v-flex>
        <v-flex/>
      </v-layout>
    </template>
    <!-- End: no history -->

    <v-overlay absolute :color="$vuetify.theme.dark ? 'grey darken-4' : 'white'" opacity="0.8" :value="overlay">
      <v-progress-circular color="yellow darken-3" indeterminate size="50" />
    </v-overlay>

  </div>
</template>

<script>
  export default {
    name: "v-component-accounts",
    data() {
      return {
        search: "",
        accounts: [],
        overlay: true,
        limit: 12,
        count: 0,
        length: 0,
        page: 1
      }
    },
    watch: {
      $route() {
        this.getAccounts();
      }
    },
    mounted() {
      this.getAccounts();
    },
    methods: {

      /**
       *
       */
      getAccounts() {
        this.overlay = true;

        this.$axios.$post(this.$api.admin.account.getAccounts, {
          search: this.search,
          limit: this.limit,
          page: this.page
        }).then((response) => {
          this.accounts = response.fields ?? [];
          this.accounts.map((item) => {
            if (!item.status) {
              item.status = false;
            }
          });
          this.count = response.count ?? 0;
          this.length = Math.ceil(this.count/this.limit);
          this.overlay = false;
        });
      },

      /**
       *
       */
      getMore() {
        this.getAccounts();
      }

    },
    computed: {

      /**
       * @returns {[{text: *, sortable: boolean, align: string, value: string},{text: *, sortable: boolean, align: string, value: string},{text: *, sortable: boolean, align: string, value: string},{text: *, sortable: boolean, align: string, value: string},{text: *, sortable: boolean, align: string, value: string},null]}
       */
      headlines() {
        return [
          {
            text: this.$vuetify.lang.t('$vuetify.lang_279'),
            align: 'start',
            sortable: true,
            value: 'id'
          }, {
            text: this.$vuetify.lang.t('$vuetify.lang_188'),
            align: 'start',
            sortable: false,
            value: 'name'
          }, {
            text: this.$vuetify.lang.t('$vuetify.lang_280'),
            align: 'start',
            sortable: false,
            value: 'email'
          }, {
            text: this.$vuetify.lang.t('$vuetify.lang_281'),
            align: 'start',
            sortable: false,
            value: 'rules'
          }, {
            text: this.$vuetify.lang.t('$vuetify.lang_81'),
            align: 'start',
            sortable: true,
            value: 'status'
          }, {
            text: this.$vuetify.lang.t('$vuetify.lang_192'),
            align: 'end',
            sortable: false,
            value: 'create_at'
          }, {
            text: this.$vuetify.lang.t('$vuetify.lang_194'),
            align: 'start',
            sortable: false,
            value: 'edit'
          },
        ]
      }
    }
  }
</script>

<style scoped>

</style>