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
            <small :class="$vuetify.theme.dark ? 'grey--text' : ''">{{ $vuetify.lang.t('$vuetify.lang_59') }}</small>
          </v-col>
        </v-row>
      </template>
      <template v-else>
        <div>
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

        <v-spacer />

        <v-menu content-class="elevation-1" left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn elevation="0" small fab icon v-bind="attrs" v-on="on">
              <v-icon>
                mdi-dots-vertical
              </v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item link @click="getTrades(0)">
              <v-list-item-icon class="mr-1">
                <v-icon>
                  mdi-alpha-b-box-outline
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ $vuetify.lang.t('$vuetify.lang_57') }}</v-list-item-title>
            </v-list-item>
            <v-list-item link @click="getTrades(1)">
              <v-list-item-icon class="mr-1">
                <v-icon>
                  mdi-alpha-s-box-outline
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ $vuetify.lang.t('$vuetify.lang_58') }}</v-list-item-title>
            </v-list-item>
            <v-list-item link @click="getTrades(2)">
              <v-list-item-icon class="mr-1">
                <v-icon>
                  mdi-alpha-a-box-outline
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ $vuetify.lang.t('$vuetify.lang_64') }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

      </template>
    </v-app-bar>
    <!-- End: filter assigning tab element -->

    <v-divider />

    <!-- Start: trades list element -->
    <template v-if="trades.length">
      <v-virtual-scroll @mouseover="hover = true" @mouseleave="hover = false" :class="hover ? '' : 'overflow-y-hidden'" bench="0" :items="trades" height="448" item-height="30">
        <template v-slot:default="{ item }">
          <v-component-shift-item :assigning="item.assigning ? 1 : 0" :width="100" :key="item.id">
            <v-row no-gutters>
              <v-col cols="4">
                <span :class="(item.assigning ? 'red' : 'teal') + '--text'">{{ $decimal.format(item.price, quote_decimal) }}</span>
              </v-col>
              <v-col :class="'text-right ' + ($vuetify.theme.dark ? 'grey--text' : '')" cols="4">
                {{ $decimal.format(item.quantity, base_decimal) }}
              </v-col>
              <v-col :class="'text-right ' + ($vuetify.theme.dark ? 'grey--text' : '')" cols="4">
                {{ item.create_at }}
              </v-col>
            </v-row>
          </v-component-shift-item>
        </template>
      </v-virtual-scroll>
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
          <h4 class="text-overline">{{ $vuetify.lang.t('$vuetify.lang_63') }}</h4>
        </v-flex>
        <v-flex/>
      </v-layout>
    </template>
    <!-- End: trades list element -->

    <v-overlay absolute :color="$vuetify.theme.dark ? 'grey darken-4' : 'white'" opacity="0.8" :value="overlay">
      <v-progress-circular color="yellow darken-3" indeterminate size="50" />
    </v-overlay>

  </v-card>
</template>

<script>

  import ShiftItem from "./ShiftItem";

  export default {
    name: "v-component-trade-book",
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
        query: '--:--',
        overlay: true,
        base_decimal: 2,
        quote_decimal: 8,
        eyelet: 2,
        trades: []
      }
    },
    watch: {
      $route(e) {
        this.getQuery(
          e.params.unit
        );
        this.getTrades(2);
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
        data.assigning = data.assigning ?? 0;

        if (

          // Сверяем принадлежат ли новые события к данному активу,
          // если аргументы совпадают то привязываем полученные данные из события к данному активу.
          data.base_unit === this.query.split('-')[0] &&
          data.quote_unit === this.query.split('-')[1] &&

          data.status === 1

        ) {

          if (this.eyelet === data.assigning || this.eyelet === 2) {

            data.create_at = this.$moment(data.create_at).format('h:mm:ss');
            this.trades.unshift(Object.assign({}, data));

          }

          // Если количество в книги торгов превышает больше 100 элементов, то начинаем удалять последний 101 елемент.
          if (this.trades.length > 100) {
            this.trades.splice(-1)
          }

        }

      });

      this.getTrades(2);
    },
    methods: {

      /**
       * Перезаписываем адрес запроса.
       * @param query
       */
      getQuery(query) {
        this.query = query;
      },

      getTrades(assigning) {
        this.overlay = true;
        this.eyelet = assigning;

        this.getPair();

        this.$axios.$post(this.$api.exchange.getTrades, {
          // Назначение [sell:1] - [buy:0].
          assigning: assigning,
          // Имя актива (symbol-base).
          base_unit: this.query.split('-')[0],
          // Имя актива (symbol-quote).
          quote_unit: this.query.split('-')[1],
        }).then((response) => {

          // Записываем список сделок в массив.
          this.trades = response.fields ?? [];
          this.trades.map(item => {
            item.id = Number(item.id);
            item.create_at = this.$moment(item.create_at).format('h:mm:ss');
            return item;
          });

          this.overlay = false;
        });
      },

      /**
       *
       */
      getPair() {
        this.$axios.$post(this.$api.exchange.getPair, {base_unit: this.query.split('-')[0], quote_unit: this.query.split('-')[1]}).then((response) => {
          this.base_decimal = response.fields[0].base_decimal ?? 2;
          this.quote_decimal = response.fields[0].quote_decimal ?? 8;
        });
      }
    },
    computed: {

      /**
       * @returns {number|*}
       */
      priceCurrent() {
        if (this.trades.length) {
          return this.trades[0].price;
        }
        return 0;
      },

      /**
       * @returns {number|*}
       */
      pricePrevious() {
        if (this.trades.length > 1) {
          return this.trades[1].price;
        }
        return 0;
      },

      /**
       * @returns {string|string}
       */
      priceConcurrency() {

        if (this.trades.length !== 1) {

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
