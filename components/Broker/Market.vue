<template>
  <v-card class="ma-1" height="500" elevation="0">

    <!-- Start: marker market tab element -->
    <template v-if="markers.length">
      <v-app-bar color="transparent" height="50" flat>
        <v-tabs color="primary" v-model="eyelet" fixed-tabs show-arrows>
          <v-tab @click="getPairs(item)" v-for="item in markers" :key="item">{{ item }}</v-tab>
        </v-tabs>
      </v-app-bar>
    </template>
    <template v-else>
      <v-layout style="height: 50px" wrap>
        <v-flex/>
        <v-flex class="text-center" align-self-center>
          {{ $vuetify.lang.t('$vuetify.lang_60') }}
        </v-flex>
        <v-flex/>
      </v-layout>
    </template>
    <!-- End: marker market tab element -->

    <v-divider />

    <!-- Start: pairs list element -->
    <template v-if="pairs.length">
      <template v-if="items.length">
        <v-virtual-scroll @mouseover="hover = true" @mouseleave="hover = false" :class="hover ? '' : 'overflow-y-hidden'" bench="0" :items="items" height="393" item-height="49">
          <template v-slot:default="{ item }">
            <v-list-item :color="$vuetify.theme.dark ? 'grey darken-3' : 'deep-purple lighten-5'" :to="'/broker/' + item.base_name.toLowerCase() + '-' + item.quote_name.toLowerCase()" :key="item.id" dense>
              <v-list-item-avatar class="mr-2" size="30">
                <v-img lazy-src="https://picsum.photos/id/11/10/6" :src="`http://test.finerymarkets.com/icons/${getIcon(item.symbol)}.svg`" :alt="item.quote_name" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title><span :class="($vuetify.theme.dark ? 'white' : 'black') + '--text'">{{ item.base_name }}/</span><span class="grey--text">{{ item.quote_name }}</span></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-virtual-scroll>
      </template>
      <template v-else>
        <v-layout style="height: 393px" wrap>
          <v-flex/>
          <v-flex class="text-center mx-5" align-self-center>
            <div>
              <v-icon size="50">
                mdi-database-remove-outline
              </v-icon>
            </div>
            <h4 class="text-overline">{{ $vuetify.lang.t('$vuetify.lang_49') }}</h4>
          </v-flex>
          <v-flex/>
        </v-layout>
      </template>
    </template>
    <template v-else-if="!overlay">
      <v-layout style="height: 393px" wrap>
        <v-flex/>
        <v-flex class="text-center mx-5" align-self-center>
          <div>
            <v-icon size="50">
              mdi-database-remove-outline
            </v-icon>
          </div>
          <h4 class="text-overline">{{ $vuetify.lang.t('$vuetify.lang_48') }}</h4>
        </v-flex>
        <v-flex/>
      </v-layout>
    </template>
    <!-- End: pairs list element -->

    <!-- Start: pair search element -->
    <template v-if="!overlay">
      <v-divider />
      <v-card-actions>
        <v-text-field color="primary" v-model="search" dense hide-details outlined :label="$vuetify.lang.t('$vuetify.lang_50')" prepend-inner-icon="mdi-layers-search-outline" />
      </v-card-actions>
    </template>
    <!-- End: pair search element -->

    <v-overlay absolute :color="$vuetify.theme.dark ? 'grey darken-4' : 'white'" opacity="0.8" :value="overlay">
      <v-progress-circular color="yellow darken-3" indeterminate size="50" />
    </v-overlay>

  </v-card>
</template>

<script>
  export default {
    name: "v-component-broker-market",
    props: {
      unit: String
    },
    data() {
      return {
        hover: false,
        search: null,
        overlay: true,
        eyelet: 0,
        markers: [],
        marker: 'BTC',
        pairs: []
      }
    },
    mounted() {
      this.getInstruments();

      setTimeout(() => {
        this.getPairs(this.unit.split('-')[0]);
      }, 1000);
    },
    methods: {

      /**
       *
       */
      getInstruments() {
        this.$axios.$post(this.$api.market.getInstruments).then((response) => {
          if (response.fields !== undefined) {
            for (let i = 0; i < response.fields.currencies.length; i++) {
              if (i !== 5) {
                this.markers.push(response.fields.currencies[i].name)
              }
            }
          }
        });
      },

      /**
       * @param symbol
       */
      getPairs(symbol) {

        this.marker = symbol;
        this.overlay = true;

        this.$axios.$post(this.$api.market.getInstruments).then((response) => {
          if (response.fields !== undefined) {
            this.pairs = response.fields.pairs.filter((item) => (item.base_name === symbol.toUpperCase() || item.quote_name === symbol.toUpperCase())) ?? [];

            if (!this.markers.find((name) => name === symbol.toUpperCase())) {
              this.markers.push(symbol.toUpperCase())
            }

            this.eyelet = this.markers.indexOf(symbol.toUpperCase());
            this.overlay = false;
          }
        });
      },

      /**
       * @param symbol
       * @returns {string}
       */
      getIcon(symbol) {

        if (symbol.split('-')[0].toLowerCase() === this.marker.toLowerCase()) {
          return symbol.split('-')[1].toLowerCase()
        } else if (symbol.split('-')[1].toLowerCase() === this.marker.toLowerCase()) {
          return symbol.split('-')[0].toLowerCase()
        }

        return symbol.split('-')[1].toLowerCase()
      }
    },
    computed: {

      /**
       * @returns {[]|*[]}
       */
      items() {
        if(this.search) {
          return this.pairs.filter((item) => {
            return item.base_name.toUpperCase().includes(this.search.toUpperCase()) || item.quote_name.toUpperCase().includes(this.search.toUpperCase())
          });
        } else {
          return this.pairs;
        }
      }
    }
  }
</script>

<style scoped>

</style>