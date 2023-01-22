<template>
  <div>

    <!-- Start: header bar -->
    <div class="pa-2">
      <v-row>
        <v-col cols="12" md="6">
          <v-btn color="black--text grey lighten-5 text-capitalize" elevation="0" large :to="'/admin/stock/sectors/create/editor'">
            <v-icon color="green">mdi-plus-thick</v-icon> {{ $vuetify.lang.t('$vuetify.lang_301') }}
          </v-btn>
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

    <template v-if="sectors.length">

      <!-- Start: data table -->
      <v-data-table :class="count > limit ? 'none-radius ' : ''" :headers="headlines" :items="sectors" :page.sync="page" item-key="id" :server-items-length="length" :items-per-page="limit" hide-default-footer>
        <template v-slot:item.id="{ item }">
         {{ item.id }}
        </template>
        <template v-slot:item.name="{ item }">
          {{ item.name }}
        </template>
        <template v-slot:item.symbol="{ item }">
          <v-chip class="ml-0 mr-2 black--text" label small>
            {{ item.symbol.toUpperCase() }}
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
          <v-btn :to="`/admin/stock/sectors/${item.id}/editor`" icon>
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
      </v-data-table>
      <!-- End: data table -->

      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title class="text-h5 text-center">{{ $vuetify.lang.t('$vuetify.lang_215') }}</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">{{ $vuetify.lang.t('$vuetify.lang_217') }}</v-btn>
            <v-btn color="blue darken-1" text @click="deleteSector(sector_id)">{{ $vuetify.lang.t('$vuetify.lang_216') }}</v-btn>
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
          <h2>Sectors not found</h2>
          Recommend that you create new sector
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
  name: "v-component-sectors",
  data() {
    return {
      overlay: false,
      sector_id: 0,
      sectors: [],
      limit: 8,
      count: 0,
      length: 0,
      page: 1,
      dialog: false
    }
  },
  watch: {
    $route() {
      this.getSectors();
    },
    dialog (val) {
      val || this.close()
    }
  },
  mounted() {
    this.getSectors();
  },
  methods: {

    getSectors() {
      this.overlay = true;

      this.$axios.$post(this.$api.admin.stock.getSectors, {
        limit: this.limit,
        page: this.page
      }).then((response) => {
        this.sectors = response.fields ?? [];
        this.count = response.count ?? 0;
        this.length = Math.ceil(this.count/this.limit);
        this.overlay = false;
      });
    },

    getMore() {
      this.getSectors();
    },

    deleteSector(id) {
      this.$axios.$post(this.$api.admin.stock.deleteSector, {
        id: id
      }).then(() => {
        this.sectors.splice(this.sectors.map((o) => o.id).indexOf(id), 1);
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
      this.sector_id = 0;
      this.dialog = false;
    },

    /**
     * @param sector_id
     */
    open(sector_id) {
      this.sector_id = sector_id;
      this.dialog = true;
    }
  },
  computed: {

    headlines() {
      return [
        {
          text: "Id",
          align: 'start',
          sortable: true,
          value: 'id'
        }, {
          text: "Name sector",
          align: 'start',
          sortable: true,
          value: 'name'
        }, {
          text: "Symbol",
          align: 'start',
          sortable: true,
          value: 'symbol'
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