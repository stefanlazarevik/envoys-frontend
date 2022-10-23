<template>
  <section class="pa-0">

    <template v-if="loader">

      <!-- Start: parallax cover component -->
      <v-parallax src="./cover.webp" class="pa-0">
        <v-layout justify-center align-end>
          <v-flex xs8>
            <v-img position="center center" src="./wrapper/1.svg"/>
          </v-flex>
        </v-layout>
        <div class="text-center py-5" style="background-color: #1e1e1eba;z-index: 6;position: absolute;width: 100%;">
          <h2 class="mb-4">
            EXCHANGE
          </h2>
          <div class="subheading">
            {{ $vuetify.lang.t('$vuetify.lang_47') }}
          </div>
          <v-btn color="black--text yellow darken-1 text-capitalize" large elevation="0" class="mt-2" to="/signup">
            {{ $vuetify.lang.t('$vuetify.lang_6') }}
          </v-btn>
        </div>
      </v-parallax>
      <!-- End: parallax cover component -->

      <!-- Start: pairs list component -->
      <v-container class="px-1">
        <hooper v-if="pairs.length" :settings="settings" style="height: auto;">
          <slide v-for="(item, index) in pairs" :key="index" :index="index">
            <v-hover v-slot="{ hover }" open-delay="200">
              <v-card class="text-center ma-2 mt-1 mb-1" :elevation="hover ? 3 : 0" height="100" rounded="lg">
                <v-card-text>
                  <h3 class="font-weight-medium">{{ item.base_unit.toUpperCase() }}/{{ item.quote_unit.toUpperCase() }}</h3>
                  <b :class="($vuetify.theme.dark ? 'white' : 'black') + '--text'">{{ item.price ? item.price : '--' }}</b>
                  <div :class="Math.sign(item.ratio) === -1 ? 'red--text' : 'green--text'">
                    {{ item.ratio ? (Math.sign(item.ratio) === -1 ? item.ratio.toFixed(2) : `+${item.ratio.toFixed(2)}`) : '+0.00' }}%
                    <v-icon color="red" v-if="Math.sign(item.ratio) === -1">
                      mdi-menu-down
                    </v-icon>
                    <v-icon color="green" v-else>
                      mdi-menu-up
                    </v-icon>
                  </div>
                </v-card-text>
              </v-card>
            </v-hover>
          </slide>
          <hooper-navigation slot="hooper-addons"></hooper-navigation>
        </hooper>
      </v-container>
      <!-- End: pairs list component -->

      <!-- Start: currencies list component -->
      <div :class="($vuetify.theme.dark ? 'grey darken-4' : 'white')">
        <v-container>
          <v-timeline>
            <v-timeline-item v-for="item in currencies.items" :key="item.id" large>
              <template v-slot:icon>
                <v-dialog scrollable max-width="300">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-avatar>
                            <v-img v-bind="attrs" v-on="on" height="50" width="50" :src="$storages(['icon'], item.symbol)"/>
                          </v-avatar>
                        </template>
                        <span>{{ $vuetify.lang.t('$vuetify.lang_20') }}</span>
                      </v-tooltip>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>{{ $vuetify.lang.t('$vuetify.lang_20') }}</v-card-title>
                    <v-divider class="mb-4"></v-divider>
                    <v-card-text>
                      <ul>
                        <li v-for="pair in item.pairs" :key="pair.id">
                          {{ pair.symbol.toUpperCase() }}:
                          <ul>
                            <li>{{ $vuetify.lang.t('$vuetify.lang_148') }}: <span class="red--text">{{ item.fees_trade }}%</span></li>
                            <li>{{ $vuetify.lang.t('$vuetify.lang_149') }}: <span class="teal--text">{{ $decimal.truncate($decimal.sub(item.fees_trade, item.fees_discount)) }}%</span></li>
                          </ul>
                        </li>
                      </ul>
                    </v-card-text>
                  </v-card>
                </v-dialog>
              </template>
              <template v-slot:opposite>
                <span><b>{{ item.symbol.toUpperCase() }}</b> <small>({{ item.name }})</small></span>
              </template>
            </v-timeline-item>
            <v-timeline-item class="timeline-more" v-if="currencies.more" large>
              <template v-slot:icon>
                <span @click="getMore">
                  <v-icon color="white">
                    mdi-chevron-double-down
                  </v-icon>
                </span>
              </template>
            </v-timeline-item>
          </v-timeline>
        </v-container>
      </div>
      <!-- End: currencies list component -->

    </template>

    <v-overlay absolute :color="$vuetify.theme.dark ? 'grey darken-4' : 'white'" opacity="1" :value="!loader">
      <v-progress-circular color="yellow darken-3" indeterminate size="100" />
    </v-overlay>

  </section>
</template>

<script>

  import {Hooper, Navigation as HooperNavigation, Slide} from 'hooper';
  import 'hooper/dist/hooper.css';

  export default {
    auth: 'guest',
    components: {
      Hooper,
      Slide,
      HooperNavigation
    },
    data() {
      return {
        loader: false,
        settings: {
          itemsToShow: 6,
          centerMode: false,
          infiniteScroll: false,
          breakpoints: {
            1500: {
              itemsToShow: 6
            },
            1100: {
              itemsToShow: 3
            },
            0: {
              itemsToShow: 1
            }
          }
        },
        currencies: {
          count: 0,
          items: [],
          more: false
        },
        pairs: []
      }
    },
    mounted() {
      setTimeout(() => {
        if (this.$auth.loggedIn) {
          return this.$router.push('/assets');
        } else {
          this.loader = true;
        }
      }, 1000);
      this.getCurrencies(0);
      this.getPairs();
    },
    methods: {
      getMore() {
        this.getCurrencies(this.currencies.items[this.currencies.items.length - 1].id)
      },
      getCurrencies(id) {
        this.$axios.$post(this.$api.index.getCurrencies, {id: id}).then((response) => {

          if (!id) {
            this.currencies.items = [];
          }

          if (response.fields !== undefined) {

            this.currencies.count = response.count;
            for (let i = 0; i < response.fields.length; i++) {
              this.currencies.items.push(response.fields[i])
            }

            this.currencies.more = this.currencies.count > this.currencies.items.length;
          }

        });
      },
      getPairs() {
        this.$axios.$post(this.$api.index.getPairs).then((response) => {
          this.pairs = response.fields;
        });
      }
    }
  }

</script>

<style>

  ul.hooper-track {
    padding: 0 !important;
  }

  .hooper-next, .hooper-prev {
    line-height: 50%;
  }

  .timeline-more .v-timeline-item__inner-dot {
    height: 48px;
    width: 48px;
    margin: 2px;
    cursor: pointer;
  }

</style>
