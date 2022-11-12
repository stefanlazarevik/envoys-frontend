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

    <!-- Start: order list element -->
    <client-only key="order-form">
      <template v-if="$auth.loggedIn">
        <v-overlay :color="$vuetify.theme.dark ? 'grey darken-4' : 'white'" opacity="0.8" absolute :value="overlay">
          <v-progress-circular color="yellow darken-3" indeterminate size="50" />
        </v-overlay>

        <template v-if="orders.length">
          <v-hover v-slot="{ hover }">
            <v-virtual-scroll :class="hover ? '' : 'overflow-y-hidden'" bench="0" :items="orders" height="203" item-height="64">
              <template v-slot:default="{ item }">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-list-item v-bind="attrs" v-on="on">
                      <v-list-item-icon class="mr-4">
                        <v-progress-circular size="40" :width="2" :value="$decimal.sub(100, $decimal.div($decimal.mul(item.value, 100), item.quantity)).toFixed(0)" :color="item.assigning ? 'red' : 'teal'">
                          <small style="font-size: 9px;">{{ $decimal.sub(100, $decimal.div($decimal.mul(item.value, 100), item.quantity)).toFixed(0) }}</small>
                        </v-progress-circular>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>{{ $vuetify.lang.t('$vuetify.lang_52') }}: {{ $decimal.truncate(item.price) }} {{ getQuery()[1].toUpperCase() }}</v-list-item-title>
                        <v-list-item-subtitle>{{ $vuetify.lang.t('$vuetify.lang_53') }}: {{ $decimal.truncate(item.value) }} {{ getQuery()[0].toUpperCase() }}</v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-list-item-action-text>
                          <v-btn @click="cancelOrder(item.id)" elevation="0" icon>
                            <v-icon>
                              mdi-trash-can-outline
                            </v-icon>
                          </v-btn>
                        </v-list-item-action-text>
                      </v-list-item-action>
                    </v-list-item>
                  </template>
                  <span>{{ $moment(item.create_at).format('h:mm:ss') }}</span>
                </v-tooltip>
              </template>
            </v-virtual-scroll>
          </v-hover>
        </template>

        <template v-else>
          <v-layout style="height: 203px" wrap>
            <v-flex/>
            <v-flex class="text-center mx-5" align-self-center>
              <div>
                <v-icon size="50">
                  mdi-database-remove-outline
                </v-icon>
              </div>
              <template v-if="overlay">
                <h4 class="text-overline">{{ $vuetify.lang.t('$vuetify.lang_55') }}</h4>
              </template>
              <template v-else>
                <h4 class="text-overline">{{ $vuetify.lang.t('$vuetify.lang_54') }}</h4>
              </template>
            </v-flex>
            <v-flex/>
          </v-layout>
        </template>

      </template>
      <template v-else>
        <v-overlay :color="$vuetify.theme.dark ? 'grey darken-4' : 'white'" opacity="0.8" absolute>
          <v-btn color="black--text yellow darken-1 text-capitalize" to="/signin" large elevation="0">{{ $vuetify.lang.t('$vuetify.lang_29') }}</v-btn>
        </v-overlay>
        <v-layout wrap>
          <v-flex/>
          <v-flex class="text-center mx-5 my-14" align-self-center>
            <div>
              <v-icon size="50">
                mdi-fingerprint
              </v-icon>
            </div>
            {{ $vuetify.lang.t('$vuetify.lang_51') }}
          </v-flex>
          <v-flex/>
        </v-layout>
      </template>
    </client-only>
    <!-- End: order list element -->

  </v-card>
</template>

<script>

  import Decimal from "decimal.js";

  Decimal.set({ precision: 8, rounding: 1 })

  export default {
    name: "v-component-order-form",
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
        orders: [],
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
        this.getOrders();
      }
    },
    mounted() {

      this.setQuery(this.unit);

      /**
       * Брать цену с ордер листа.
       */
      this.$nuxt.$on('price:update', (price) => {

        if (!this.$auth.loggedIn) {
          return false;
        }
        this.price = price;

        // Обновляем целевую политику в форме.
        this.setPrice();
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
          this.getAsset(undefined);
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

          let index = this.orders.map((o) => Number(o.id)).indexOf(data.id);
          let matching = this.orders.some((o) => Number(o.id) === data.id);
          if (matching) {

            switch (data.status) {
              case 1:

                // Удаляем ордер с массива по идентификатору.
                this.orders.splice(index, 1);

                break;
              case 2:

                // Обновляем количество монет ордера.
                this.orders[index].value = data.value;

                break

            }

            // Озвучиваем действие звуковым сопровождением.
            this.$single.play('trade');
          }

          // Обновляем данные об активе, в нашем случае нам нужно обновить текущий баланс актива.
          this.getAsset(undefined);
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

      this.getAsset(undefined);
      this.getGraph();
      this.getOrders();
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
        this.$axios.$get(this.$api.exchange.getGraph + '?base_unit=' + this.getQuery()[0] + '&quote_unit=' + this.getQuery()[1] + '&limit=1').then((response) => {
          this.price = response.fields ? response.fields[0].close : 0;
        })
      },

      /**
       * Получаем данные об активе.
       * @param symbol
       * @returns {boolean}
       */
      getAsset(symbol) {

        if (symbol !== undefined) {
          this.overlay = true;
        }

        symbol = (symbol === undefined ? this.getSymbol(this.query) : symbol);

        if (!this.$auth.loggedIn) {
          return false;
        }

        this.$axios.$post(this.$api.exchange.getAsset, {symbol: symbol}).then((response) => {

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
              this.$axios.$post(this.$api.exchange.getPair, {base_unit: query[0], quote_unit: query[1]}).then((response) => {
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
        this.$axios.$post(this.$api.exchange.setOrder, {
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

          // Добавляем новый ордер в массив.
          this.orders.unshift(Object.assign({}, response.fields[0]));

          // Обновляем данные об активе, в нашем случае нам нужно обновить текущий баланс актива.
          this.getAsset(undefined);

          // Озвучиваем действие звуковым сопровождением.
          this.$single.play('create');

        }).catch((error) => {
          this.$snackbar.open({content: `${error.response.data.code}: ${error.response.data.message}`, color: 'red darken-2'});
        });
      },

      /**
       * @returns {boolean}
       */
      getOrders() {

        if (!this.$auth.loggedIn) {
          return false;
        }

        this.$axios.$post(this.$api.exchange.getOrders, {
          // Назначение [sell:1] - [buy:0].
          assigning: this.assigning === 'sell' ? 1 : 0,
          // Имя актива (symbol-base).
          base_unit: this.getQuery()[0],
          // Имя актива (symbol-quote).
          quote_unit: this.getQuery()[1],
          // Показывать количество записей в массиве.
          limit: 10,
          // Показывать записи только если я их владелец.
          owner: true,
          // Показывать записи если они со статусом в ожидании.
          status: 2
        }).then((response) => {

          // Записываем список ордеров в ожидании в массив.
          this.orders = response.fields ?? [];
          this.orders.map(item => {
            item.id = Number(item.id);
          });

        });
      },

      /**
       * @param id
       */
      cancelOrder(id) {
        this.$axios.$post(this.$api.exchange.cancelOrder, {
          // Идентификатор ордера для удаления.
          id: id
        }).then(() => {

          // Удаляем ордер с массива по идентификатору.
          this.orders.splice(this.orders.map((o) => o.id).indexOf(id), 1);

          // При каждом удалению ордера, обновляем данные актива.
          this.getAsset(undefined);

          // Озвучиваем действие звуковым сопровождением.
          this.$single.play('delete');

        }).catch((error) => {
          this.$snackbar.open({content: `${error.response.data.code}: ${error.response.data.message}`, color: 'red darken-2'});
        });
      }
    }
  }
</script>

<style scoped>

</style>
