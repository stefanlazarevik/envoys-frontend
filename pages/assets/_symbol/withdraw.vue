<template>
  <div class="ma-4">

    <template v-if="asset.chains">
      <template v-if="!asset.fin_type">

        <!-- Start: tabs bar -->
        <v-tabs v-model="eyelet" color="primary">
          <v-tab v-for="item in asset.chains" :key="item.id" class="text-capitalize">{{ item.contract ? item.contract.protocol : 'mainnet' }}</v-tab>
        </v-tabs>
        <!-- End: tabs bar -->

        <!-- Start: tabs items -->
        <v-tabs-items v-model="eyelet" class="mt-3">
          <v-tab-item v-for="(item, index) in asset.chains" :key="item.id" :transition="false" class="mt-1">

            <template v-if="item.address">

              <v-row>
                <v-col cols="12" md="6">
                  <v-card class="mb-4" elevation="0" outlined>
                    <v-card-title class="text-uppercase">
                      {{ item.name }}
                      <v-icon class="green--text" v-if="item.status">
                        mdi-check-circle-outline
                      </v-icon>
                      <v-icon class="red--text" v-else>
                        mdi-close-circle-outline
                      </v-icon>
                    </v-card-title>
                    <v-card-subtitle class="text-uppercase" v-if="item.network">
                      {{ $vuetify.lang.t('$vuetify.lang_112') }}: {{ item.network }}
                    </v-card-subtitle>
                    <v-divider />
                    <v-card-subtitle>
                      {{ $vuetify.lang.t('$vuetify.lang_113') }}: <b>{{ item.platform ? item.platform : 'BITCOIN' }}</b>
                    </v-card-subtitle>
                    <v-divider v-if="item.contract" />
                    <v-card-subtitle v-if="item.contract">
                      {{ $vuetify.lang.t('$vuetify.lang_269') }}: {{ item.contract.address }}
                    </v-card-subtitle>
                    <v-divider />
                    <v-card-text :class="$vuetify.theme.dark ? 'white--text' : 'black--text'">
                      {{ $vuetify.lang.t('$vuetify.lang_87').replace(/%1/g, item.confirmation) }}
                    </v-card-text>
                  </v-card>

                  <template v-if="!item.status">
                    <v-card class="mb-4" elevation="0" outlined>
                      <v-card-subtitle>
                        <b class="red--text">{{ $vuetify.lang.t('$vuetify.lang_99') }}</b>
                      </v-card-subtitle>
                      <v-divider />
                      <v-card-text class="red--text">
                        {{ $vuetify.lang.t('$vuetify.lang_98') }}
                      </v-card-text>
                    </v-card>
                  </template>
                  <template v-else>

                    <template v-if="getReserve(item)">

                      <!-- Start: init steps component -->
                      <v-card elevation="0" outlined>
                        <v-stepper class="transparent" v-model="next" flat>
                          <v-stepper-header class="step-header">
                            <v-stepper-step color="yellow darken-1" editable :complete="next > 1" step="1">
                              {{ $vuetify.lang.t('$vuetify.lang_152') }}
                            </v-stepper-step>
                            <v-divider />
                            <v-stepper-step color="yellow darken-1" :complete="next > 2" step="2">
                              {{ $vuetify.lang.t('$vuetify.lang_153') }}
                            </v-stepper-step>
                          </v-stepper-header>

                          <!-- Start: step withdraw: 1 -->
                          <v-stepper-content step="1">
                            <v-form class="mt-1" ref="form">
                              <v-text-field v-model="to" color="primary" :label="$vuetify.lang.t('$vuetify.lang_104')" outlined :rules="rulesAddress" required>
                                <template #message="{ message }">
                                  {{ $vuetify.lang.t(message) }}
                                </template>
                              </v-text-field>
                              <v-text-field v-model="quantity" color="primary" :label="$vuetify.lang.t('$vuetify.lang_106')" outlined :hint="`≈ $${price ? $decimal.truncate((quantity ? $decimal.mul(price, quantity) : 0)) : (quantity ? quantity : 0)}`" persistent-hint :rules="rulesQuantity" required>
                                <template v-slot:append>
                                  <span class="my-1" @click="getBalance(item)" style="cursor: pointer;">
                                    <span class="primary--text">MAX</span> <span class="grey--text">{{ $decimal.truncate(getReserveBalance(item)) }} {{ asset.symbol.toUpperCase() }}</span>
                                  </span>
                                </template>
                                <template #message="{ message }">
                                  {{ $vuetify.lang.t(message) }}
                                </template>
                              </v-text-field>

                              <template v-if="to && quantity">
                                <v-btn color="black--text yellow darken-1 text-capitalize" large block elevation="0" @click="setStep(2, item)">{{ $vuetify.lang.t('$vuetify.lang_40') }}</v-btn>
                              </template>
                            </v-form>

                          </v-stepper-content>
                          <!-- End: step withdraw: 1 -->

                          <!-- Start: step withdraw: 2 -->
                          <v-stepper-content step="2">

                            <v-text-field class="mt-2" color="primary" outlined :label="$vuetify.lang.t('$vuetify.lang_155')" v-model="secure" :counter="6" :hint="$vuetify.lang.t('$vuetify.lang_43') + $auth.$state.user.email">
                              <template v-slot:append>
                                <template v-if="timer === 60 || timer === 0">
                                  <span class="my-1" @click="setRefresh()" style="cursor: pointer;">{{ $vuetify.lang.t('$vuetify.lang_36') }}</span>
                                </template>
                                <template v-else>
                                  <span class="my-1">{{ timer }}</span>
                                </template>
                              </template>
                            </v-text-field>

                            <template v-if="secure">
                              <v-btn color="black--text yellow darken-1 text-capitalize" large block elevation="0" @click="setWithdraw(item)">
                                {{ $vuetify.lang.t('$vuetify.lang_111') }} <span v-if="quantity">({{ $vuetify.lang.t('$vuetify.lang_103') }}: {{ $decimal.truncate(quantity > 0 ? $decimal.sub(quantity, item.fees_withdraw) : 0) }} <b>{{ asset.symbol.toUpperCase() }}</b>)</span>
                              </v-btn>
                            </template>
                          </v-stepper-content>
                          <!-- End: step withdraw: 2 -->

                        </v-stepper>
                      </v-card>
                      <!-- End: init steps component -->

                    </template>

                    <template v-else>
                      <v-card elevation="0" outlined>
                        <v-card-text :class="$vuetify.theme.dark ? 'white--text' : 'black--text'">
                          {{ $vuetify.lang.t('$vuetify.lang_86') }}
                        </v-card-text>
                      </v-card>
                    </template>

                  </template>

                </v-col>
                <v-col cols="12" md="6">
                  <v-card class="mb-4" elevation="0" outlined>
                    <v-card-text :class="$vuetify.theme.dark ? 'white--text' : 'black--text'">
                      {{ $vuetify.lang.t('$vuetify.lang_110') }}
                    </v-card-text>
                  </v-card>
                  <v-card class="mb-4" elevation="0" outlined>
                    <v-card-subtitle>
                      <b class="blue--text">{{ $vuetify.lang.t('$vuetify.lang_101') }}</b>
                    </v-card-subtitle>
                    <v-divider />
                    <v-card-text class="blue--text">
                      {{ $vuetify.lang.t('$vuetify.lang_102').replace(/%1/g, item.time_withdraw) }}
                    </v-card-text>
                  </v-card>
                  <v-card v-if="item.fees_withdraw" elevation="0" outlined>
                    <v-card-subtitle :class="$vuetify.theme.dark ? 'white--text' : 'black--text'">
                      <b>{{ $vuetify.lang.t('$vuetify.lang_20') }}:</b> {{ $decimal.truncate(item.fees_withdraw) }} {{ asset.symbol.toUpperCase() }} /≈ ${{ $decimal.truncate(price ? (item.fees_withdraw ? $decimal.mul(price, item.fees_withdraw) : 0) : (item.fees_withdraw ? item.fees_withdraw : 0)) }}
                    </v-card-subtitle>
                    <v-divider />
                    <v-card-text :class="$vuetify.theme.dark ? 'white--text' : 'black--text'">
                      <b>{{ $vuetify.lang.t('$vuetify.lang_100') }}:</b> {{ item.fees_withdraw ? $decimal.add(asset.min_withdraw, item.fees_withdraw) : 0 }} <b>{{ asset.symbol.toUpperCase() }}</b>
                    </v-card-text>
                    <v-divider />
                    <v-card-text :class="$vuetify.theme.dark ? 'white--text' : 'black--text'">
                      <b>{{ $vuetify.lang.t('$vuetify.lang_108') }}:</b> {{ getMaxWithdraw(item) }} <b>{{ asset.symbol.toUpperCase() }}</b>
                    </v-card-text>
                    <v-divider />
                    <v-card-text :class="$vuetify.theme.dark ? 'white--text' : 'black--text'">
                      <b>{{ $vuetify.lang.t('$vuetify.lang_109') }}:</b> {{ getReserve(item) }} <b>{{ asset.symbol.toUpperCase() }}</b>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>

            </template>
            <template v-else-if="!overlay">
              <v-layout fill-height style="height:200px;" wrap>
                <v-flex/>
                <v-flex align-self-center class="text-center" md4 mx5 sm6 xl3>
                  <v-btn block color="black--text yellow darken-1 text-capitalize" elevation="0" large @click="setAsset(item.platform, (item.contract ? item.contract.protocol : 0), index)">{{ $vuetify.lang.t('$vuetify.lang_288') }}</v-btn>
                </v-flex>
                <v-flex/>
              </v-layout>
            </template>

          </v-tab-item>
        </v-tabs-items>
        <!-- End: tabs items -->

      </template>
      <template v-else>

        <!-- Start: tabs bar -->
        <v-tabs v-model="eyelet" color="primary">
          <v-tab v-for="item in asset.chains" :key="item.id" class="text-capitalize">{{ item.platform }}</v-tab>
        </v-tabs>
        <!-- End: tabs bar -->

        <!-- Start: tabs items -->
        <v-tabs-items v-model="eyelet" class="mt-3">
          <v-tab-item v-for="(item, index) in asset.chains" :key="item.id" :transition="false" class="mt-1">
            <v-alert icon="mdi-shield-lock-outline" prominent text type="info">
              {{ item }}, Index: {{ index }}
            </v-alert>
          </v-tab-item>
        </v-tabs-items>

      </template>

    </template>
    <template v-else>
      <v-alert icon="mdi-shield-lock-outline" prominent text type="error">
        {{ $vuetify.lang.t('$vuetify.lang_212') }}
      </v-alert>
    </template>

    <v-overlay absolute :color="$vuetify.theme.dark ? 'grey darken-4' : 'white'" opacity="0.8" :value="overlay">
      <v-progress-circular color="yellow darken-3" indeterminate size="50" />
    </v-overlay>

  </div>
</template>

<script>

  export default {
    data() {
      return {
        next: 1,
        asset: {
          chains: []
        },
        quantity: '',
        eyelet: 0,
        overlay: true,
        price: 0,
        timer: 60,
        secure: '',
        to: ''
      }
    },
    watch: {
      $route() {
        this.getAsset();
      }
    },
    mounted() {
      this.getAsset();
    },
    methods: {

      /**
       *
       */
      getTimer() {
        if(this.timer > 0) {
          setTimeout(() => {
            this.timer -= 1;
            this.getTimer()
          }, 1000);
        } else {
          this.timer = 60;
        }
      },

      /**
       *
       */
      getAsset() {
        this.overlay = true;

        this.$axios.$post(this.$api.exchange.getAsset, {symbol: this.$route.params.symbol}).then((response) => {
          this.asset = response.fields.lastItem ?? {};
          this.overlay = false;
          this.getPrice(this.asset.symbol);
        }).catch(e => {
          console.log(e)
        });
      },

      /**
       * @param platform
       * @param protocol
       * @param index
       */
      setAsset(platform, protocol, index) {
        this.$axios.$post(this.$api.exchange.setAsset, {symbol: this.$route.params.symbol, platform: platform, protocol: protocol}).then((response) => {
          this.asset.chains[index].address = response.address;
          this.$forceUpdate();
        });
      },

      /**
       * @param item
       */
      getBalance(item) {
        this.quantity = this.$decimal.truncate(this.getReserveBalance(item), 0);
      },

      /**
       * @param item
       * @returns {number|*}
       */
      getMaxWithdraw(item) {
        let number = item.reserve > this.asset.max_withdraw ? this.asset.max_withdraw : item.reserve;
        if (!isNaN(number)) {
          return number;
        }
        return 0
      },

      /**
       * @param item
       * @returns {number|*}
       */
      getReserve(item) {
        let number = item.reserve;
        if (!isNaN(number)) {
          return number;
        }
        return 0
      },

      /**
       * @param item
       * @returns {number|*}
       */
      getReserveBalance(item) {
        let number = item.reserve;
        let balance = this.asset.balance ?? 0;
        if (number >= balance) {
          return (balance > this.asset.max_withdraw ? this.asset.max_withdraw : balance)
        }
        return number
      },

      /**
       * @param symbol
       */
      getPrice(symbol) {
        this.$axios.$get(this.$api.exchange.getPrice + '?base_unit=' + symbol + '&quote_unit=usd').then((response) => {
          this.price = response.price ?? 0;
        });
      },

      /**
       * @param item
       */
      setWithdraw(item) {
        this.$axios.$post(this.$api.exchange.setWithdraw, {
          id: item.id,
          symbol: this.$route.params.symbol,
          platform: item.platform,
          quantity: this.quantity,
          address: this.to,
          secure: this.secure
        }).then(() => {
          this.$nuxt.$emit('withdraw/create', {
            symbol: this.$route.params.symbol,
            value: this.quantity
          });
          return this.$router.push('/assets/' + this.$route.params.symbol + '/history');
        }).catch((error) => {
          this.$snackbar.open({
            content: `${error.response.data.code}: ${error.response.data.message}`,
            color: 'red darken-2'
          });
        });
      },

      /**
       * @param step
       * @param item
       * @returns {boolean}
       */
      setStep(step, item) {
        if (!this.$refs.form[0].validate()) return false;
        if (this.quantity > this.getReserveBalance(item) || this.quantity < this.$decimal.add(this.asset.min_withdraw, item.fees_withdraw)) {
          this.$snackbar.open({
            content: this.$vuetify.lang.t('$vuetify.lang_154'),
            color: 'red darken-2'
          });
          return false;
        }
        this.next = step;
      },

      /**
       *
       */
      setRefresh() {
        this.$axios.$post(this.$api.exchange.setWithdraw, {
          refresh: true
        }).catch((error) => {
          this.$snackbar.open({
            content: `${error.response.data.code}: ${error.response.data.message}`,
            color: 'red darken-2'
          });
        });
        this.getTimer();
      }
    },
    computed: {
      rulesAddress() {
        return [
          (v) => !!v || '$vuetify.lang_114',
          (v) => v.length >= 30 || '$vuetify.lang_115'
        ]
      },
      rulesQuantity() {
        return [
          (v) => !!v || '$vuetify.lang_116',
          (v) => v > 0 || '$vuetify.lang_117'
        ]
      }
    }
  }
</script>

<style scoped>
  .step-header {
    box-shadow: 0 0 0 !important;
    border-bottom: 1px solid #ecf2f6;
  }
</style>