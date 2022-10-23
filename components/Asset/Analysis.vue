<template>
  <div>

    <!-- Start: analysis asset -->
    <template v-if="analysis">

      <div class="pa-3">
        {{ $vuetify.lang.t('$vuetify.lang_158') }}
      </div>

      <v-divider />

      <!-- Start: data table -->
      <v-data-table :class="(count > limit ? 'none-radius ' : '') + 'analysis'" :headers="headlines" :items="analysis" :page.sync="page" item-key="id" :server-items-length="length" :items-per-page="limit" hide-default-footer>
        <template v-slot:item.icons="{ item }">
          <div class="icon">
            <v-img class="base" width="30" :src="$storages(['icon'], item.base_unit)"/>
            <v-img class="quote" width="30" :src="$storages(['icon'], item.quote_unit)"/>
          </div>
        </template>
        <template v-slot:item.price="{ item }">
          <nuxt-link :class="($vuetify.theme.dark ? 'white--text' : 'grey--text text--darken-3') + ' text-decoration-none'" :to="`/trade/${item.base_unit}-${item.quote_unit}`">
            {{ item.price }}&nbsp;<b>{{ item.quote_unit.toUpperCase() }}</b>
          </nuxt-link>
        </template>
        <template v-slot:item.buy_ratio="{ item }">
          <v-progress-circular :value="getRatio(item.buy_ratio)" :size="40" :color="getColor(item.buy_ratio)" :width="2">
            <small style="font-size: 9px;">{{ item.buy_ratio ? item.buy_ratio : 0 }}</small>
          </v-progress-circular>
        </template>
        <template v-slot:item.sell_ratio="{ item }">
          <v-progress-circular :value="getRatio(item.sel_ratio)" :size="40" :color="getColor(item.sel_ratio)" :width="2">
            <small style="font-size: 9px;">{{ item.sel_ratio ? item.sel_ratio : 0 }}</small>
          </v-progress-circular>
        </template>
        <template v-slot:item.chart="{ item }">
          <v-sparkline :value="item.chart" :smooth="16" :height="80" line-width="2" :padding="10" :gradient="['#396dc7', '#d3d4ef', '#dbe7e7']" />
        </template>
      </v-data-table>
      <!-- End: data table -->

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
    <!-- End: select asset -->

    <!-- Start: select asset -->
    <template v-else-if="!overlay">
      <v-layout fill-height wrap>
        <v-flex/>
        <v-flex align-self-center class="text-center my-16" md4 mx5 sm6 xl3>
          <v-img src="/asset/1.png" />
          {{ $vuetify.lang.t('$vuetify.lang_97') }}
        </v-flex>
        <v-flex/>
      </v-layout>
    </template>
    <!-- End: select asset -->

    <v-overlay absolute :color="$vuetify.theme.dark ? 'grey darken-4' : 'white'" opacity="0.8" :value="overlay">
      <v-progress-circular color="yellow darken-3" indeterminate size="50" />
    </v-overlay>

  </div>
</template>

<script>

  export default {
    name: "v-component-analysis",
    data() {
      return {
        analysis: undefined,
        limit: 12,
        page: 1,
        count: 0,
        length: 0,
        overlay: true
      }
    },
    watch: {
      $route() {
        this.getAnalysis();
      }
    },
    mounted() {
      this.getAnalysis();
    },
    methods: {
      /**
       *
       */
      getAnalysis() {
        this.overlay = true;

        this.$axios.$post(this.$api.exchange.getAnalysis, {
          limit: this.limit,
          page: this.page
        }).then((response) => {
          this.analysis = response.fields ?? [];
          this.analysis.map((item) => {
            if(item.chart) {
              item.chart.reverse()
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
        this.getAnalysis();
      },

      /**
       * @param ratio
       * @returns {string|*}
       */
      getRatio(ratio) {
        if (!ratio) {
          return 0
        }

        if (Math.sign(ratio) === -1) {
          let number = String(ratio).split('-');
          return number[1]
        }
        return ratio
      },

      /**
       * @param ratio
       * @returns {string}
       */
      getColor(ratio) {
        if (!ratio || Math.sign(ratio) === -1) {
          return 'red'
        }
        return 'teal'
      }
    },
    computed: {
      headlines() {
        return [
          {
            text: this.$vuetify.lang.t('$vuetify.lang_160'),
            width: '5%',
            align: 'start',
            sortable: false,
            value: 'icons'
          }, {
            text: this.$vuetify.lang.t('$vuetify.lang_52'),
            width: '35%',
            align: 'start',
            sortable: true,
            value: 'price'
          }, {
            text: this.$vuetify.lang.t('$vuetify.lang_156'),
            width: '20%',
            align: 'start',
            sortable: false,
            value: 'buy_ratio'
          }, {
            text: this.$vuetify.lang.t('$vuetify.lang_157'),
            width: '20%',
            align: 'start',
            sortable: false,
            value: 'sell_ratio'
          }, {
            text: this.$vuetify.lang.t('$vuetify.lang_159'),
            width: '20%',
            align: 'end',
            sortable: false,
            value: 'chart'
          }
        ]
      }
    }
  }
</script>

<style scoped>

  .analysis {
    width: 100%;
  }

  .analysis .icon > .base,
  .analysis .icon > .quote {
    position: relative;
  }

  .analysis .icon > .base {
    position: absolute;
  }

  .analysis .icon > .quote {
    margin-left: 20px;
  }

</style>