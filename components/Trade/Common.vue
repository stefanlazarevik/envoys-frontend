<template>
  <v-card class="ma-1" height="500" elevation="0">

    <!-- Start: app bar element -->
    <v-app-bar color="transparent" height="50" flat>
      <v-tabs grow color="primary" v-model="eyelet">
        <v-tab v-show="$auth.loggedIn" class="text-capitalize">{{ $vuetify.lang.t('$vuetify.lang_79') }}</v-tab>
        <v-tab class="text-capitalize">{{ $vuetify.lang.t('$vuetify.lang_80') }}</v-tab>
        <v-tab class="text-capitalize">{{ $vuetify.lang.t('$vuetify.lang_83') }}</v-tab>
      </v-tabs>
    </v-app-bar>
    <!-- End: app bar element -->

    <v-divider />

    <!-- Start: assets list element -->
    <v-tabs-items v-model="eyelet">
      <v-tab-item>
        <template v-if="assets.length">
          <v-hover v-slot="{ hover }">
            <v-virtual-scroll :class="hover ? '' : 'overflow-y-hidden'" bench="0" :items="assets" height="448" item-height="49">
              <template v-slot:default="{ item }">
                <v-hover v-slot:default="{ hover }">
                  <v-list-item :color="$vuetify.theme.dark ? 'grey darken-3' : 'deep-purple lighten-5'" :to="'/assets/' + item.symbol + '/deposit'" :key="item.id" dense>
                    <v-list-item-avatar size="30">
                      <v-img :src="$storages(['icon'], item.symbol)"/>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>{{ item.symbol.toUpperCase() }}</v-list-item-title>
                      <v-list-item-subtitle>{{ item.name }}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action class="d-block text-right">
                      <template v-if="hover">
                        <small v-if="$decimal.truncate(item.balance)" class="teal--text">
                          ≈ ${{ item.convert }}
                        </small>
                      </template>
                      <template v-else>
                        <small v-if="$decimal.truncate(item.balance)" class="teal--text">
                          {{ $decimal.truncate(item.balance) }}
                        </small>
                      </template>
                    </v-list-item-action>
                  </v-list-item>
                </v-hover>
              </template>
            </v-virtual-scroll>
          </v-hover>
        </template>
        <template v-else-if="!overlay">
          <v-layout style="height: 449px" wrap>
            <v-flex/>
            <v-flex class="text-center mx-5" align-self-center>
              <div>
                <v-icon size="50">
                  mdi-database-remove-outline
                </v-icon>
              </div>
              <h4 class="text-overline">{{ $vuetify.lang.t('$vuetify.lang_78') }}</h4>
            </v-flex>
            <v-flex/>
          </v-layout>
        </template>
      </v-tab-item>
      <v-tab-item style="height: 449px">
        <v-component-soon />
      </v-tab-item>
      <v-tab-item style="height: 449px">
        <v-component-soon />
      </v-tab-item>
      <v-tab-item style="height: 449px">
        <v-component-soon />
      </v-tab-item>
      <v-tab-item style="height: 449px">
        <v-component-soon />
      </v-tab-item>
    </v-tabs-items>
    <!-- End: assets list element -->

    <v-overlay absolute :color="$vuetify.theme.dark ? 'grey darken-4' : 'white'" opacity="0.8" :value="overlay">
      <v-progress-circular color="yellow darken-3" indeterminate size="50" />
    </v-overlay>

  </v-card>
</template>

<script>

  import Soon from "../../components/Soon";

  export default {
    name: "v-component-common",
    components: {
      'v-component-soon': Soon
    },
    data() {
      return {
        overlay: true,
        eyelet: 0,
        assets: []
      }
    },
    mounted() {
      this.eyelet = this.$auth.loggedIn ? 0 : 1;
      if (this.$auth.loggedIn) {

        this.getAssets();

        /**
         * Отслеживаем события нового депозита.
         * @event 'deposit/open/status'
         * @return {callback}:
         */
        this.$nuxt.$on('deposit/open/status', (data) => {
          if (

              // Сверяем локальный штат пользователя
              // это у нас пользовательский [id] с полученным из события пользовательским [user_id],
              // если аргументы совпадают то это значит что ордер сработал частично или полностью.
              data.user_id === Number(this.$auth.$state.user.id)

          ) {
            // Обновляем данные об активе, в нашем случае нам нужно обновить текущий баланс актива.
            this.getAssets();
          }
        });

        /**
         * Отслеживаем события нового ордера.
         * @return {callback}:
         * @object {base_unit: string},
         * @object {id: int},
         * @object {assigning: string}
         * @object {price: float},
         * @object {quantity: float},
         * @object {quote_unit: string},
         * @object {create_at: int},
         * @object {user_id: int},
         * @object {value: float}
         */
        this.$publish.bind('order/create', (data) => {
          data.assigning = data.assigning ? 1 : 0;

          if (

            // Сверяем локальный штат пользователя
            // это у нас пользовательский [id] с полученным из события пользовательским [user_id],
            // если аргументы совпадают то это значит что ордер сработал частично или полностью.
            data.user_id === Number(this.$auth.$state.user.id)

          ) {
            this.getAssets();
          }

        });

        /**
         * Отслеживаем события удаленного ордера.
         * @return {callback}:
         * @object {base_unit: string},
         * @object {id: int},
         * @object {price: float},
         * @object {quantity: float},
         * @object {quote_unit: string},
         * @object {create_at: int},
         * @object {user_id: int},
         * @object {value: float},
         */
        this.$publish.bind('order/cancel', (data) => {
          data.assigning = data.assigning ? 1 : 0;

          if (

            // Сверяем локальный штат пользователя
            // это у нас пользовательский [id] с полученным из события пользовательским [user_id],
            // если аргументы совпадают то это значит что ордер сработал частично или полностью.
            data.user_id === Number(this.$auth.$state.user.id)

          ) {
            this.getAssets();
          }
        });

        /**
         * Отслеживаем статус ордера.
         * @return {callback}:
         * @object {base_unit: string},
         * @object {id: int},
         * @object {assigning: string}
         * @object {price: float},
         * @object {quantity: float},
         * @object {quote_unit: string},
         * @object {create_at: int},
         * @object {user_id: int},
         * @object {value: float}
         */
        this.$publish.bind('order/status', (data) => {

          if (

              // Сверяем локальный штат пользователя
              // это у нас пользовательский [id] с полученным из события пользовательским [user_id],
              // если аргументы совпадают то это значит что ордер сработал частично или полностью.
              data.user_id === Number(this.$auth.$state.user.id)

          ) {
            this.getAssets();
          }

        });

      } else {
        this.overlay = false;
      }
    },
    methods: {

      /**
       * Получаем список всех активов.
       */
      getAssets() {
        this.overlay = true;
        this.$axios.$post(this.$api.exchange.getAssets).then((response) => {

          this.assets = response.fields ?? [];
          this.assets.map(item => {
            this.getPrice(item)
          });
          this.overlay = false;

          // Sort assets by index.
          this.sort();
        });
      },

      /**
       * @param item
       */
      getPrice(item) {
        this.$axios.$get(this.$api.exchange.getPrice + '?base_unit=' + item.symbol + '&quote_unit=usd').then((response) => {
          item.convert = this.$decimal.truncate(response.price ? (item.balance ? this.$decimal.mul(response.price, item.balance) : 0) : (item.balance ? item.balance : 0), 0)
        });
      },

      /**
       *
       */
      sort() {
        this.assets.sort((a, b) => {
          if (!a.balance) {
            a.balance = 0
          }
          if (!b.balance) {
            b.balance = 0
          }
          return b.balance - a.balance;
        });
      }
    }
  }
</script>

<style scoped>

</style>
