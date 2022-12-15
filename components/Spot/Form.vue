<template>
  <v-card :disabled="!status && $auth.loggedIn" class="ma-1" height="500" elevation="0">

    <!-- Start: asset balance element -->
    <v-app-bar color="transparent" height="50" flat>
      <v-icon size="20">
        mdi-wallet-outline
      </v-icon>
      <v-switch v-model="type" class="mx-3" :label="type ? $vuetify.lang.t('$vuetify.lang_128') : $vuetify.lang.t('$vuetify.lang_24')" hide-details />
      <v-spacer />
      <v-menu max-width="110" content-class="elevation-1" open-on-hover bottom offset-y>
        <template v-slot:activator="{ on, attrs }">
          <template v-if="$decimal.truncate(balance)">
            <div :class="$vuetify.theme.dark ? 'grey--text' : ''" v-bind="attrs" v-on="on">
              {{ $decimal.truncate(balance) }} {{ String(symbol).toUpperCase() }}
            </div>
          </template>
          <template v-else>
            <div :class="$vuetify.theme.dark ? 'grey--text' : ''" v-bind="attrs">
              0 {{ String(symbol).toUpperCase() }}
            </div>
          </template>
        </template>
        <v-list>
          <v-list-item link @click="setPercent(25)">
            <v-list-item-icon class="mr-1">
              <v-icon>
                mdi-alpha-a-box-outline
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title>25%</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="setPercent(50)">
            <v-list-item-icon class="mr-1">
              <v-icon>
                mdi-alpha-b-box-outline
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title>50%</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="setPercent(75)">
            <v-list-item-icon class="mr-1">
              <v-icon>
                mdi-alpha-c-box-outline
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title>75%</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="setPercent(100)">
            <v-list-item-icon class="mr-1">
              <v-icon>
                mdi-alpha-d-box-outline
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title>100%</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <!-- End: asset balance element -->

    <v-divider />

    <!-- Start: form order trade element -->
    <v-card-text>
      <template v-if="type">
        <v-text-field :disabled="type" :value="$vuetify.lang.t('$vuetify.lang_134')" class="mb-4" color="primary" height="40" dense hide-details outlined :label="$vuetify.lang.t('$vuetify.lang_52')">
          <template v-slot:append>
            <span class="my-1">{{ getQuery()[0].toUpperCase() }}/{{ getQuery()[1].toUpperCase() }}</span>
          </template>
        </v-text-field>
      </template>
      <template v-else>
        <v-text-field v-model="price" @keyup="setPrice" class="mb-4" color="primary" height="40" dense hide-details outlined :label="$vuetify.lang.t('$vuetify.lang_52')">
          <template v-slot:append>
            <span class="my-1">{{ getQuery()[0].toUpperCase() }}/{{ getQuery()[1].toUpperCase() }}</span>
          </template>
        </v-text-field>
      </template>
      <v-text-field v-model="quantity" @keyup="setQuantity" class="mb-4" color="primary" height="40" dense hide-details outlined :label="$vuetify.lang.t('$vuetify.lang_53')">
        <template v-slot:append>
          <span class="my-1">{{ getQuery()[0].toUpperCase() }}</span>
        </template>
      </v-text-field>
      <v-text-field v-model="value" @keyup="setValue" color="primary" height="40" dense hide-details outlined :label="$vuetify.lang.t('$vuetify.lang_56')">
        <template v-slot:append>
          <span class="my-1">{{ getQuery()[1].toUpperCase() }}</span>
        </template>
      </v-text-field>
    </v-card-text>
    <!-- End: form order trade element -->

    <v-divider />

    <!-- Start: create new order element -->
    <v-card-actions>
      <div class="flex-fill">
        <v-btn @click="setOrder" :color="(assigning === 'buy' ? 'teal darken-1' : 'red darken-1') + ' white--text'" large block elevation="0">{{ assigning === 'buy' ? $vuetify.lang.t('$vuetify.lang_57') : $vuetify.lang.t('$vuetify.lang_58') }}</v-btn>
      </div>
    </v-card-actions>
    <!-- End: create new order element -->

    <v-divider />

    <template v-if="!$auth.loggedIn">
      <v-overlay :color="$vuetify.theme.dark ? 'grey darken-4' : 'white'" opacity="0.8" absolute>
        <v-btn color="black--text yellow darken-1 text-capitalize" to="/signin" large elevation="0">{{ $vuetify.lang.t('$vuetify.lang_29') }}</v-btn>
      </v-overlay>
    </template>

  </v-card>
</template>

<script>

  import Decimal from "decimal.js";

  Decimal.set({ precision: 8, rounding: 1 })

  export default {
    name: "v-component-spot-form",
    props: {
      unit: {
        type: String
      },
      assigning: {
        type: String
      }
    },
    data() {
      return {
        query: '--:--',
        symbol: null,
        price: 0,
        value: 0,
        quantity: 0,
        balance: 0,
        status: 0,
        overlay: true,
        type: false
      }
    },
    watch: {
      $route(e) {
        this.setQuery(
          e.params.unit
        );
        this.getAsset(
          this.getSymbol(e.params.unit)
        );
        this.getGraph();
      }
    },
    mounted() {

      this.setQuery(this.unit);

      /**
       * Брать цену с ордер листа.
       * @event 'price/update'
       */
      this.$nuxt.$on('price/update', (price) => {

        if (!this.$auth.loggedIn) {
          return false;
        }
        this.price = price;

        // Обновляем целевую политику в форме.
        this.setPrice();
      });

      /**
       * Обновляем данные актива.
       * @event 'order/cancel'
       */
      this.$nuxt.$on('order/cancel', () => {
        // Обновляем данные об активе, в нашем случае нам нужно обновить текущий баланс актива.
        this.getAsset(null);
      });

      /**
       * Отслеживаем события нового депозита.
       * @event 'deposit/open/status'
       * @return {callback}:
       */
      this.$nuxt.$on('deposit/open/status', (data) => {

        if (!this.$auth.loggedIn) {
          return false;
        }

        if (

            // Сверяем локальный штат пользователя
            // это у нас пользовательский [id] с полученным из события пользовательским [user_id],
            // если аргументы совпадают то это значит что ордер сработал частично или полностью.
            data.user_id === Number(this.$auth.$state.user.id)

        ) {
          // Обновляем данные об активе, в нашем случае нам нужно обновить текущий баланс актива.
          this.getAsset(null);
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

        if (!this.$auth.loggedIn) {
          return false;
        }

        if (

          // Сверяем принадлежат ли новые события к данному активу,
          // если аргументы совпадают то привязываем полученные данные из события к данному активу.
          data.base_unit === this.getQuery()[0] &&
          data.quote_unit === this.getQuery()[1]

        ) {

          // Обновляем данные об активе, в нашем случае нам нужно обновить текущий баланс актива.
          this.getAsset(null);
        }

      });

      /**
       * Отслеживаем события бегущей строки, данные об торгах.
       * @return {callback}:
       * @object {base_unit: string},
       * @object {close: float},
       * @object {high: float},
       * @object {low: float},
       * @object {open: float},
       * @object {quote_unit: string},
       * @object {time: int}
       */
      this.$publish.bind('trade/graph:0', (data) => {
          if (data.fields) {
            if (

              // Сверяем принадлежат ли новые события к данному активу,
              // если аргументы совпадают то привязываем полученные данные из события к данному активу.
              data.fields.lastItem.base_unit === this.getQuery()[0] &&
              data.fields.lastItem.quote_unit === this.getQuery()[1]

            ) {

              // Эсле поле [value] или поле [quantity] не активно то обновляем данные
              // полученные из события бегущей строки об торгах.
              if (!this.value || !this.quantity) {
                this.price = data.fields[0].close;
              }
            }
          }
      });

      this.getAsset(null);
      this.getGraph();
    },
    methods: {

      /**
       * Перезаписываем адрес запроса.
       * @param query
       */
      setQuery(query) {
        this.query = query;
      },

      /**
       * @returns {string[]}
       */
      getQuery() {
        return this.query.split('-')
      },

      /**
       * Получаем новые данные бегущей строки, данные об торгах.
       */
      getGraph() {
        this.$axios.$get(this.$api.spot.getGraph + '?base_unit=' + this.getQuery()[0] + '&quote_unit=' + this.getQuery()[1] + '&limit=1').then((response) => {
          this.price = response.fields ? response.fields[0].close : 0;
        })
      },

      /**
       * Получаем данные об активе.
       * @param symbol
       * @returns {boolean}
       */
      getAsset(symbol) {

        if (symbol !== null) {
          this.overlay = true;
        }

        symbol = (symbol === null ? this.getSymbol(this.query) : symbol);

        if (!this.$auth.loggedIn) {
          return false;
        }

        this.$axios.$post(this.$api.spot.getAsset, {symbol: symbol}).then((response) => {

          // После перехода на новый актив обнуляем все параметры.
          this.balance = 0;
          this.value = 0;
          this.quantity = 0;
          this.percent = 0;
          this.type = false;

          if (response.fields !== undefined) {
            if (response.fields[0].balance !== undefined) {
              this.balance = (response.fields[0].balance).toFixed(8) > 0 ? response.fields[0].balance : 0;
            }
            let query = this.getQuery();

            // Если в этого активе статус 1, то парного ему актива 0,
            // значит налаживаем вето на эту форму в целом.
            this.status = response.fields[0].status ?? 0;
            if (this.status) {
              this.$axios.$post(this.$api.spot.getPair, {base_unit: query[0], quote_unit: query[1]}).then((response) => {
                this.status = response.fields[0].status ?? 0;
              }).catch(e => {
                console.log(e)
              });
            }
          }

          this.overlay = false;
        });
      },

      /**
       * Оделяем запрос на [base] и [quote] ед. изм.
       * @param query
       * @returns {null}
       */
      getSymbol(query) {
        switch (this.assigning) {
          case 'buy':
            this.symbol = query.split('-')[1];
            break;
          case 'sell':
            this.symbol = query.split('-')[0];
            break;
        }
        return this.symbol;
      },

      /**
       * Обновление полей [quantity] и [value].
       */
      setPrice() {
        this.setQuantity();
        this.setValue();
      },

      /**
       * Перезаписываем поле [value].
       */
      setQuantity() {
        this.value = this.$decimal.mul(this.quantity, this.price);
      },

      /**
       * Перезаписываем поле [quantity].
       */
      setValue() {
        this.quantity = this.$decimal.div(this.value, this.price);
      },

      /**
       * Перезаписываем поле [value] по принципу процентной ставки от баланса.
       * @param percent
       */
      setPercent(percent) {
        switch (this.assigning) {
          case 'buy':
            this.value = this.$decimal.mul(this.balance, percent)  / 100;
            break;
          case 'sell':
            this.value = this.$decimal.mul((this.$decimal.mul(this.balance, percent)  / 100), this.price);
            break;
        }
        this.setValue();
      },

      /**
       * Создаём новый ордер.
       */
      setOrder() {
        this.$axios.$post(this.$api.spot.setOrder, {
          // Назначение [sell:1] - [buy:0].
          assigning: this.assigning === 'sell' ? 1 : 0,
          // Имя актива (symbol-base).
          base_unit: this.getQuery()[0],
          // Имя актива (symbol-quote).
          quote_unit: this.getQuery()[1],
          // Тип [market:0] - [limit:1]
          trade_type: this.type ? 0 : 1,
          // Количество монет sell/buy.
          quantity: this.quantity,
          // Рыночная цена монеты.
          price: this.price,
        }).then((response) => {

          response.fields[0].assigning = response.fields[0].assigning ? 1 : 0;

          // Обновляем данные об активе, в нашем случае нам нужно обновить текущий баланс актива.
          this.getAsset(null);

          // Озвучиваем действие звуковым сопровождением.
          this.$single.play('create');

        }).catch((error) => {
          this.$snackbar.open({content: `${error.response.data.code}: ${error.response.data.message}`, color: 'red darken-2'});
        });
      }
    }
  }
</script>

<style scoped>

</style>
