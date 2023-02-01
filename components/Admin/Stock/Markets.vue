<template>
  <div>

    <!-- Start: header bar -->
    <div class="pa-2">
      <v-row>
        <v-col cols="12" md="4">
          <v-btn color="black--text grey lighten-5 text-capitalize" elevation="0" large :to="'/admin/stock/markets/create/editor'">
            <v-icon color="green">mdi-plus-thick</v-icon> {{ $vuetify.lang.t('$vuetify.lang_299') }}
          </v-btn>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="search" v-on:keyup="getMarkets" color="primary" :label="$vuetify.lang.t('$vuetify.lang_209')" outlined dense hide-details />
        </v-col>
        <v-col cols="12" md="4">
          <v-btn color="black--text grey lighten-5 text-capitalize" elevation="0" large class="float-end">
            {{ count }}
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <!-- End: header bar -->

    <v-divider />

    <template v-if="markets.length">

      <!-- Start: data table -->
      <v-data-table :class="count > limit ? 'none-radius ' : ''" :headers="headlines" :items="markets" :page.sync="page" item-key="id" :server-items-length="length" :items-per-page="limit" hide-default-footer show-expand single-expand>
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
        <template v-slot:item.name="{ item }">
          {{ item.name }}
        </template>
        <template v-slot:item.symbol="{ item }">
          {{ item.symbol.toUpperCase() }}
        </template>
        <template v-slot:item.sector="{ item }">
          {{ item.sector }}
        </template>
        <template v-slot:item.exchange="{ item }">
          <v-chip :color="$stock.getExchange(item.exchange).color" class="ml-0 mr-2 black--text" label small>
            {{ $stock.getExchange(item.exchange).name }}
          </v-chip>
        </template>
        <template v-slot:item.method="{ item }">
          <v-chip :color="$stock.getMethod(item.method).color" class="ml-0 mr-2 black--text" label small>
            {{ $stock.getMethod(item.method).name }}
          </v-chip>
        </template>
        <template v-slot:item.kind="{ item }">
          <v-chip :color="$stock.getKind(item.kind).color" class="ml-0 mr-2 black--text" label small>
            {{ $stock.getKind(item.kind).name }}
          </v-chip>
        </template>
        <template v-slot:item.type="{ item }">
          <v-chip :color="$stock.getType(item.type).color" class="ml-0 mr-2 black--text" label small>
            {{ $stock.getType(item.type).name }}
          </v-chip>
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
        <template v-slot:item.edit="{ item }">
          <v-btn :to="`/admin/stock/markets/${item.symbol}/editor`" icon>
            <v-icon>
              mdi-circle-edit-outline
            </v-icon>
          </v-btn>
        </template>
        <template v-slot:item.delete="{ item }">
          <v-btn @click="open(item.id)" icon>
            <v-icon>
              mdi-close-circle-outline
            </v-icon>
          </v-btn>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">

            <v-row class="my-2" align="center">
              <v-col cols="12" md="4">
                <v-card outlined elevation="0">
                  <v-card-title>
                    Start trade
                  </v-card-title>
                  <v-divider />
                  <v-card-text>
                    {{ item.start_at }}
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card outlined elevation="0">
                  <v-card-title>
                    Stop trade
                  </v-card-title>
                  <v-divider />
                  <v-card-text>
                    {{ item.stop_at }}
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card outlined elevation="0">
                  <v-card-title>
                    Create data
                  </v-card-title>
                  <v-divider />
                  <v-card-text>
                    {{ item.create_at }}
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card outlined elevation="0">
                  <v-card-title>
                    Qty. shares
                  </v-card-title>
                  <v-divider />
                  <v-card-text>
                    {{ item.qty_shares }}
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card outlined elevation="0">
                  <v-card-title>
                    Unit currency
                  </v-card-title>
                  <v-divider />
                  <v-card-text>
                    {{ item.unit.toUpperCase() }}
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card outlined elevation="0">
                  <v-card-title>
                    Address
                  </v-card-title>
                  <v-divider />
                  <v-card-text>
                    {{ item.address }}
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card outlined elevation="0">
                  <v-card-title>
                    Price buy
                  </v-card-title>
                  <v-divider />
                  <v-card-text>
                    <span class="green--text">{{ item.price_buy }}</span>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card outlined elevation="0">
                  <v-card-title>
                    Price sell
                  </v-card-title>
                  <v-divider />
                  <v-card-text>
                    <span class="red--text">{{ item.price_sell }}</span>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card outlined elevation="0">
                  <v-card-title>
                    Price market
                  </v-card-title>
                  <v-divider />
                  <v-card-text>
                    {{ item.price_market }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </td>
        </template>
      </v-data-table>
      <!-- End: data table -->

      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title class="text-h5 text-center">{{ $vuetify.lang.t('$vuetify.lang_215') }}</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">{{ $vuetify.lang.t('$vuetify.lang_217') }}</v-btn>
            <v-btn color="blue darken-1" text @click="deleteMarket(market_id)">{{ $vuetify.lang.t('$vuetify.lang_216') }}</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>

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

    <!-- Start: no sectors -->
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
            <h2>Markets not found</h2>
            Recommend that you create new market
          </template>
        </v-flex>
        <v-flex/>
      </v-layout>
    </template>
    <!-- End: no sectors -->

    <v-overlay absolute :color="$vuetify.theme.dark ? 'grey darken-4' : 'white'" opacity="0.8" :value="overlay">
      <v-progress-circular color="yellow darken-3" indeterminate size="50" />
    </v-overlay>

    </div>
</template>

<script>
  export default {
    name: "v-component-markets",
    data() {
      return {
        overlay: false,
        search: "",
        market_id: 0,
        markets: [],
        limit: 15,
        count: 0,
        length: 0,
        page: 1,
        dialog: false
      }
    },
    watch: {
      $route() {
        this.getMarkets();
      },
      dialog (val) {
        val || this.close()
      }
    },
    mounted() {
      this.getMarkets();
    },
    methods: {

      /**
       *
       */
      getMarkets() {
        this.overlay = true;

        if (this.search) {
          this.page = 1
        }

        this.$axios.$post(this.$api.admin.stock.getMarkets, {
          search: this.search,
          limit: this.limit,
          page: this.page
        }).then((response) => {
          this.markets = response.fields ?? [];
          this.count = response.count ?? 0;
          this.length = Math.ceil(this.count/this.limit);
          this.overlay = false;
        });
      },

      /**
       *
       */
      getMore() {
        this.getMarkets();
      },

      /**
       * @param id
       */
      deleteMarket(id) {
        this.$axios.$post(this.$api.admin.stock.deleteMarket, {
          id: id
        }).then(() => {
          this.markets.splice(this.markets.map((o) => o.id).indexOf(id), 1);
          this.count -= 1;
          this.dialog = false;
        }).catch((error) => {
          this.$snackbar.open({
            content: `${error.response.data.code}: ${error.response.data.message}`,
            color: 'red darken-2'
          });
        });
      },

      /**
       *
       */
      close() {
        this.market_id = 0;
        this.dialog = false;
      },

      /**
       * @param market_id
       */
      open(market_id) {
        this.market_id = market_id;
        this.dialog = true;
      }
    },
    computed: {

      headlines() {
        return [
          {
            text: "Name market",
            align: 'start',
            sortable: false,
            value: 'name'
          }, {
            text: "Symbol",
            align: 'start',
            sortable: false,
            value: 'symbol'
          }, {
            text: "Sector",
            align: 'start',
            sortable: false,
            value: 'sector'
          }, {
            text: "Exchange",
            align: 'start',
            sortable: false,
            value: 'exchange'
          }, {
            text: "Method",
            align: 'start',
            sortable: false,
            value: 'method'
          }, {
            text: "Kind",
            align: 'start',
            sortable: false,
            value: 'kind'
          }, {
            text: "Type",
            align: 'start',
            sortable: false,
            value: 'type'
          }, {
            text: this.$vuetify.lang.t('$vuetify.lang_194'),
            align: 'start',
            sortable: false,
            value: 'edit'
          }, {
            text: this.$vuetify.lang.t('$vuetify.lang_222'),
            align: 'end',
            sortable: false,
            value: 'delete'
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>