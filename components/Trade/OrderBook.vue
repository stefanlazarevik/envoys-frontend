<template>
  <v-card class="ma-1" height="500" elevation="0">

    <!-- Start: filter assigning tab element -->
    <v-app-bar color="transparent" height="50" flat>
      <template v-if="hover">
        <v-row no-gutters>
          <v-col cols="4">
            <small :class="$vuetify.theme.dark ? 'grey--text' : ''">{{ $vuetify.lang.t('$vuetify.lang_52') }}<b>({{ query.split('-')[1].toUpperCase() }})</b></small>
          </v-col>
          <v-col class="text-right" cols="4">
            <small :class="$vuetify.theme.dark ? 'grey--text' : ''">{{ $vuetify.lang.t('$vuetify.lang_53') }}<b>({{ query.split('-')[0].toUpperCase() }})</b></small>
          </v-col>
          <v-col class="text-right" cols="4">
            <small :class="$vuetify.theme.dark ? 'grey--text' : ''">{{ $vuetify.lang.t('$vuetify.lang_56') }}<b>({{ query.split('-')[1].toUpperCase() }})</b></small>
          </v-col>
        </v-row>
      </template>
      <template v-else>
        <v-tabs fixed-tabs :color="replayColor" v-model="eyelet" icons-and-text>
          <v-tab @click="getOrders(0)">
            <small>{{ $vuetify.lang.t('$vuetify.lang_57') }}</small>
            <v-icon>
              mdi-alpha-b-circle-outline
            </v-icon>
          </v-tab>
          <v-tab @click="getOrders(1)">
            <small>{{ $vuetify.lang.t('$vuetify.lang_58') }}</small>
            <v-icon>
              mdi-alpha-s-circle-outline
            </v-icon>
          </v-tab>
          <v-tab @click="getOrders(2)">
            <small>{{ $vuetify.lang.t('$vuetify.lang_64') }}</small>
            <v-icon>
              mdi-alpha-a-circle-outline
            </v-icon>
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <!-- End: filter assigning tab element -->

    <v-divider />

    <!-- Start: orders list element -->
    <template v-if="orders.length">
      <v-virtual-scroll @mouseover="hover = true" @mouseleave="hover = false" :class="hover ? '' : 'overflow-y-hidden'" bench="0" :items="orders" height="393" item-height="30">
        <template v-slot:default="{ item }">
          <v-component-shift-item :width="Number($decimal.div($decimal.mul(item.value, 100), item.quantity).toFixed(0))" :assigning="item.assigning ? 1 : 0" :key="item.id">
            <v-row style="cursor: pointer;" @click="addPriceToForm(item.price, base_decimal)" no-gutters>
              <v-col cols="4">
                <span :class="(item.assigning ? 'red' : 'teal') + '--text'">{{ $decimal.format(item.price, quote_decimal) }}</span>

                <!-- Start: children orders list element -->
                <v-menu v-model="item.menu" :close-on-content-click="false" :nudge-width="200" content-class="elevation-1" dense offset-x max-height="260">
                  <template v-slot:activator="{ on, attrs }">
                    <v-chip v-if="item.orders && item.orders.length" class="pa-1" style="height: 15px" label outlined small v-bind="attrs" v-on="on">
                      <small>{{ item.orders.length }}x</small>
                    </v-chip>
                  </template>
                  <v-card>
                    <v-list dense disabled>
                      <v-list-item-group eager>
                        <v-list-item v-for="o in item.orders" :key="o.id" style="min-height: 35px">
                          <v-list-item-content>
                            <v-list-item-title>
                              <span class="orange--text">{{ $decimal.sub(100, $decimal.div($decimal.mul(o.value, 100), o.quantity)).toFixed(0) }}%</span> <span>{{ $decimal.format(o.value, base_decimal) }}</span> / <span>{{ $decimal.format(o.quantity, base_decimal) }}</span>
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>
                  </v-card>
                </v-menu>
                <!-- End: children orders list element -->

              </v-col>
              <v-col :class="'text-right ' + ($vuetify.theme.dark ? 'grey--text' : '')" cols="4">
                {{ $decimal.format(item.value, base_decimal) }}
              </v-col>
              <v-col :class="'text-right ' + ($vuetify.theme.dark ? 'grey--text' : '')" cols="4">
                {{ $decimal.truncate($decimal.mul(item.value, item.price), quote_decimal) }}
              </v-col>
            </v-row>
          </v-component-shift-item>
        </template>
      </v-virtual-scroll>
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
          <h4 class="text-overline">{{ $vuetify.lang.t('$vuetify.lang_62') }}</h4>
        </v-flex>
        <v-flex/>
      </v-layout>
    </template>
    <!-- End: orders list element -->

    <!-- Start: price and value element -->
    <template v-if="!overlay">
      <v-divider />
      <v-card-actions style="height: 56px;">
        <v-row justify="center" no-gutters>
          <v-col cols="6">
            <div class="mx-2">
              <v-icon v-if="priceConcurrency === 'red'" :class="priceConcurrency + '--text'">
                mdi-call-received
              </v-icon>
              <v-icon v-else-if="priceConcurrency === 'teal'" :class="priceConcurrency + '--text'">
                mdi-call-made
              </v-icon>
              <v-icon v-else>
                mdi-keyboard-tab
              </v-icon>
              <span :class="priceConcurrency + '--text'">{{ priceCurrent ? $decimal.format(priceCurrent) : $vuetify.lang.t('$vuetify.lang_61') }}</span>
            </div>
          </v-col>
          <v-col class="text-right" cols="6">
            <small class="mx-2">
              {{ eyelet === 1 ? $decimal.truncate(volume, quote_decimal) : $decimal.truncate($decimal.mul(volume, priceCurrent), quote_decimal) }}<b>({{ eyelet === 1 ? query.split('-')[0].toUpperCase() : query.split('-')[1].toUpperCase() }})</b>
            </small>
          </v-col>
        </v-row>
        <v-divider class="mx-2" vertical />
        <v-menu readonly content-class="elevation-1" top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn elevation="0" small fab :color="$vuetify.theme.dark ? '' : 'blue lighten-4'" icon v-bind="attrs" v-on="on">
              <template v-if="scale">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon :color="$vuetify.theme.dark ? '' : 'grey darken-1'" v-bind="attrs" v-on="on">
                      mdi-cog
                    </v-icon>
                  </template>
                  <span v-if="scale">{{ scale }}</span>
                </v-tooltip>
              </template>
              <template v-else>
                <v-icon :color="$vuetify.theme.dark ? '' : 'grey darken-1'" v-bind="attrs" v-on="on">
                  mdi-cog
                </v-icon>
              </template>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="scale in $scale.getScale(quote_decimal)" :key="scale" @click="setScale(scale)" link>
              <v-list-item-title>{{ scale > 0 ? scale : $vuetify.lang.t('$vuetify.lang_64')}}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-actions>

    </template>
    <!-- End: price and value element -->

    <v-overlay absolute :color="$vuetify.theme.dark ? 'grey darken-4' : 'white'" opacity="0.8" :value="overlay">
      <v-progress-circular color="yellow darken-3" indeterminate size="50" />
    </v-overlay>

  </v-card>
</template>

<script>

  import ShiftItem from "./ShiftItem";

  export default {
    name: "v-component-order-book",
    components: {
      'v-component-shift-item': ShiftItem
    },
    props: {
      unit: {
        type: String
      }
    },
    data() {
      return {
        hover: false,
        scale: 0,
        assigning: 2,
        base_decimal: 2,
        quote_decimal: 8,
        query: '--:--',
        overlay: true,
        eyelet: 2,
        orders: [],
        volume: 0,
      }
    },
    watch: {
      $route(e) {
        this.getQuery(
          e.params.unit
        );
        this.getOrders(2);
      }
    },
    mounted() {

      this.getQuery(this.unit);

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

        let index = this.orders.map((o) => o.id).indexOf(data.id);
        let matching = this.orders.some((o) => o.id === data.id);

        if (

          // Проверяем есть ли в массиве объект по идентификатору.
          matching

        ) {

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

          // Получаем текущий объем в ордерах.
          this.getVolume(this.eyelet);

        } else {

          this.orders.map((o) => {
            if (typeof o.orders !== "undefined") {

              index = o.orders.map((i) => (i.id).toString()).indexOf((data.id).toString());
              if (index !== -1) {

                o.orders[index].value = data.value ?? 0;

                if (data.status === 1) {
                  o.quantity = this.$decimal.sub(o.quantity, data.quantity);
                  o.orders.splice(index, 1)
                }

                o.value = 0;
                o.orders.map((item) => {
                  o.value += item.value;
                });

                if (o.orders.length === 0) {
                  this.orders.splice(this.orders.map((i) => (i.id).toString()).indexOf((o.id).toString()), 1);
                }
              }

              // Получаем текущий объем в ордерах.
              this.getVolume(this.eyelet);
            }
          });
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
        data.assigning = data.assigning ?? 0;

          if (

              // Сверяем принадлежат ли новые события к данному активу,
              // если аргументы совпадают то привязываем полученные данные из события к данному активу.
              data.base_unit === this.query.split('-')[0] &&
              data.quote_unit === this.query.split('-')[1]

          ) {

            if (this.eyelet === data.assigning || this.eyelet === 2) {

              // Добавляем новое значения по шкале запроса.
              if ((this.scale > 0 ? this.isBetween(data.value, 0, this.scale) : true)) {

                let item = this.orders.find((o) => o.price === data.price && (o.assigning ? "SELL" : "BUY") === (data.assigning ? "SELL" : "BUY"));
                if (item) {

                  if (typeof item.orders === "undefined") {
                    item.orders = [];
                    item.orders.unshift(Object.assign({}, item));
                  }

                  item.id += Number(data.id);
                  item.value += data.value;
                  item.quantity += data.quantity;

                  item.orders.unshift(Object.assign({}, data));
                } else {
                  this.orders.unshift(Object.assign({}, data));
                }
              }

              // Если количество в книги ордеров превышает больше 100 элементов, то начинаем удалять последний 101 елемент.
              if (this.orders.length > 100) {
                this.orders.splice(-1)
              }

              // Получаем текущий объем в ордерах.
              this.getVolume(this.eyelet);
            }

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

        // Удаляем ордер с массива по идентификатору.
        let index = this.orders.map((o) => o.id).indexOf(data.id);
        if (index !== -1) {
          this.orders.splice(index, 1);
        } else {
          this.orders.map((o) => {
            if (typeof o.orders !== "undefined") {

              index = o.orders.map((i) => (i.id).toString()).indexOf((data.id).toString());
              if (index !== -1) {
                o.orders.splice(index, 1);

                o.value = this.$decimal.sub(o.value, data.value);
                o.quantity = this.$decimal.sub(o.quantity, data.quantity);

                if (o.orders.length === 1) {
                  if (o.orders[index]) {
                    o.id = o.orders[index].id;
                  } else {
                    o.id = data.id;
                  }

                  o.orders = [];
                }
              } else {
                index = this.orders.map((i) => (i.id).toString()).indexOf((o.id).toString());
                if (index !== -1) {
                  this.orders.splice(index, 1);
                }
              }
            }
          });
        }

        // Получаем текущий объем в ордерах.
        this.getVolume(this.eyelet);
      });

      this.getOrders(2);
    },
    methods: {

      /**
       * @param value
       * @param min
       * @param max
       * @returns {boolean}
       */
      isBetween(value, min, max) {
        return value >= min && value <= max
      },

      /**
       * @param value
       */
      setScale(value) {
        this.scale = value;
        this.getOrders(this.assigning);
      },

      /**
       * Перезаписываем адрес запроса.
       * @param query
       */
      getQuery(query) {
        this.query = query;
        this.scale = 0;
      },

      /**
       *
       */
      getPair() {
        this.$axios.$post(this.$api.exchange.getPair, {base_unit: this.query.split('-')[0], quote_unit: this.query.split('-')[1]}).then((response) => {
          this.base_decimal = response.fields[0].base_decimal ?? 2;
          this.quote_decimal = response.fields[0].quote_decimal ?? 8;
        });
      },

      /**
       * @param assigning
       */
      getOrders(assigning) {
        this.overlay = true;
        this.assigning = assigning;

        this.getPair();

        this.$axios.$post(this.$api.exchange.getOrders, {
          // Назначение [sell:1] - [buy:0].
          assigning: this.assigning,
          // Имя актива (symbol-base).
          base_unit: this.query.split('-')[0],
          // Имя актива (symbol-quote).
          quote_unit: this.query.split('-')[1],
          // Показывать записи если они со статусом в ожидании.
          status: 2,
          // Максимальное значение значения.
          decimal: this.scale
        }).then((response) => {

          this.volume = response.volume ?? 0;

          // Записываем список ордеров в ожидании в массив.
          this.orders = response.fields ?? [];
          this.orders.map(item => {

            let items = this.orders.filter((o) => o.price === item.price && o.assigning === item.assigning);
            if (items.length > 1) {

              let assign = {id: 0, value: 0, quantity: 0, orders: []};

              items.map((c) => {
                let index = this.orders.map((o) => o.id).indexOf(c.id);
                if (index !== -1) {
                  assign.orders.push(this.orders[index]);
                  this.orders.splice(index, 1);
                }

                assign.id += Number(c.id);
                assign.value += c.value;
                assign.quantity += c.quantity;
              });

              this.orders.push(Object.assign({
                user_id: item.user_id,
                base_unit: item.base_unit,
                quote_unit: item.quote_unit,
                assigning: item.assigning,
                price: item.price,
                status: "PENDING"
              }, assign));
            }

            item.id = Number(item.id);
          });

          this.overlay = false;
        });
      },

      /**
       * @param assigning
       */
      getVolume(assigning) {
        this.$axios.$post(this.$api.exchange.getOrders, {
          // Назначение [sell:1] - [buy:0].
          assigning: assigning,
          // Имя актива (symbol-base).
          base_unit: this.query.split('-')[0],
          // Имя актива (symbol-quote).
          quote_unit: this.query.split('-')[1],
          // Показывать записи если они со статусом в ожидании.
          status: 2,
          // Количество объектов для вывода.
          limit: 1
        }).then((response) => {
          this.volume = response.volume ?? 0;
        });
      },

      /**
       * @param price
       */
      addPriceToForm(price) {
        this.$nuxt.$emit("price:update", price)
      }
    },
    computed: {

      /**
       * @returns {string}
       */
      replayColor() {
        switch (this.eyelet) {
          case 0:
            return 'teal'
          case 1:
            return 'red';
          case 2:
            return 'primary';
        }
      },

      /**
       * @returns {number|*}
       */
      priceCurrent() {
        if (this.orders.length) {
          return this.orders[0].price;
        }
        return 0;
      },

      /**
       * @returns {number|*}
       */
      pricePrevious() {
        if (this.orders.length > 1) {
          return this.orders[1].price;
        }
        return 0;
      },

      /**
       * @returns {string|string}
       */
      priceConcurrency() {

        if (this.orders.length !== 1) {

          if (this.priceCurrent > this.pricePrevious) {
            return 'teal'
          }
          if (this.priceCurrent < this.pricePrevious) {
            return 'red'
          }

        }

        return this.$vuetify.theme.dark ? 'grey' : ''
      }
    }
  }
</script>

<style scoped>

</style>
