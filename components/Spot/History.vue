<template>
  <v-card class="ma-1" height="410" elevation="0">

    <!-- Start: app bar element -->
    <v-app-bar color="transparent" height="50" flat>
      <v-tabs color="primary" v-model="eyelet">
        <v-tab class="text-capitalize" @click="getOrders(2)">{{ $vuetify.lang.t('$vuetify.lang_136') }}</v-tab>
        <v-tab class="text-capitalize" @click="getOrders(1)">{{ $vuetify.lang.t('$vuetify.lang_137') }}</v-tab>
        <v-tab class="text-capitalize" @click="getOrders(0)">{{ $vuetify.lang.t('$vuetify.lang_296') }}</v-tab>
      </v-tabs>
    </v-app-bar>
    <!-- End: app bar element -->

    <v-divider />

    <template v-if="orders.length">

      <!-- Start: data table -->
      <v-data-table :class="count > limit ? 'none-radius ' : ''" :headers="headers" :headers-length="6" :items="orders" :page.sync="page" item-key="id" :server-items-length="length" :items-per-page="limit" hide-default-footer>
        <template v-slot:item.assigning="{ item }">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <template v-if="item.assigning">
                <v-chip :class="($vuetify.theme.dark ? 'grey darken-3' : 'red lighten-5 red--text') + ' ml-0 mr-2'" label small>
                  <v-icon color="red" size="15">
                    mdi-arrow-top-left
                  </v-icon>
                  {{ $vuetify.lang.t('$vuetify.lang_140') }}
                </v-chip>
              </template>
              <template v-else>
                <v-chip :class="($vuetify.theme.dark ? 'grey darken-3' : 'blue lighten-5 blue--text') + ' ml-0 mr-2'" label small>
                  <v-icon color="blue" size="15">
                    mdi-arrow-bottom-left
                  </v-icon>
                  {{ $vuetify.lang.t('$vuetify.lang_141') }}
                </v-chip>
              </template>
            </template>
            <span>{{ $vuetify.lang.t('$vuetify.lang_139') }}: {{ item.id }}</span>
          </v-tooltip>
        </template>
        <template v-slot:item.symbol="{ item }">
          <b class="text-uppercase">{{ item.base_unit }}/{{ item.quote_unit }}</b>
        </template>
        <template v-slot:item.quantity="{ item }">
          {{ $decimal.truncate(item.quantity) }} {{ item.base_unit.toUpperCase() }}
        </template>
        <template v-slot:item.price="{ item }">
          {{ item.price }} {{ item.quote_unit.toUpperCase() }}
        </template>
        <template v-slot:item.total="{ item }">
          {{ $decimal.truncate($decimal.mul(item.quantity, item.price)) }} {{ item.quote_unit.toUpperCase() }}
        </template>
        <template v-slot:item.status="{ item }">
          <template v-if="item.status === 'PENDING'">
            <v-chip :class="($vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-3 brown--text') + ' ml-0 mr-2'" label small>
              {{ $vuetify.lang.t('$vuetify.lang_131') }}
            </v-chip>
          </template>
          <template v-if="item.status === 'FILLED'">
            <v-chip :class="($vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-3 brown--text') + ' ml-0 mr-2'" label small>
              {{ $vuetify.lang.t('$vuetify.lang_129') }}
            </v-chip>
          </template>
          <template v-if="item.status === undefined">
            <v-chip :class="($vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-3 brown--text') + ' ml-0 mr-2'" label small>
              {{ $vuetify.lang.t('$vuetify.lang_130') }}
            </v-chip>
          </template>
        </template>
        <template v-slot:item.create_at="{ item }">
          <div>
            {{ $moment(item.create_at).format('DD MMM') }}
          </div>
          <div>
            <small class="grey--text">{{ $moment(item.create_at).format('hh:mm:ss') }}</small>
          </div>
        </template>
        <template v-slot:item.canceled="{ item }">
          <v-btn @click="cancelOrder(item.id)" elevation="0" icon>
            <v-icon>
              mdi-trash-can-outline
            </v-icon>
          </v-btn>
        </template>
      </v-data-table>
      <!-- End: data table -->

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
    <template v-else-if="!overlay">

      <div class="mx-4 mt-16 max-width">
        <v-layout fill-height wrap>
          <v-flex/>
          <v-flex align-self-center class="text-center my-16" md4 mx5 sm6 xl3>
            <h2>{{ $vuetify.lang.t('$vuetify.lang_123') }}</h2>
            {{ $vuetify.lang.t('$vuetify.lang_135') }}
          </v-flex>
          <v-flex/>
        </v-layout>
      </div>

    </template>

    <template v-if="$auth.loggedIn">
      <v-overlay absolute :color="$vuetify.theme.dark ? 'grey darken-4' : 'white'" opacity="0.8" :value="overlay">
        <v-progress-circular color="yellow darken-3" indeterminate size="50" />
      </v-overlay>
    </template>
    <template v-else>
      <v-overlay :color="$vuetify.theme.dark ? 'grey darken-4' : 'white'" opacity="0.8" absolute>
        <v-btn color="black--text yellow darken-1 text-capitalize" to="/signin" large elevation="0">{{ $vuetify.lang.t('$vuetify.lang_29') }}</v-btn>
      </v-overlay>
    </template>

  </v-card>
</template>

<script>
  export default {
    name: "v-component-spot-history",
    data() {
      return {
        eyelet: 0,
        status: 0,
        overlay: true,
        query: '',
        orders: [],
        limit: 5,
        count: 0,
        length: 0,
        page: 1,
        headers: [
          {
            text: this.$vuetify.lang.t('$vuetify.lang_132'),
            align: 'start',
            sortable: true,
            value: 'assigning'
          }, {
            text: this.$vuetify.lang.t('$vuetify.lang_133'),
            align: 'start',
            sortable: false,
            value: 'symbol'
          }, {
            text: this.$vuetify.lang.t('$vuetify.lang_53'),
            align: 'start',
            sortable: true,
            value: 'quantity'
          }, {
            text: this.$vuetify.lang.t('$vuetify.lang_52'),
            align: 'start',
            sortable: true,
            value: 'price'
          }, {
            text: this.$vuetify.lang.t('$vuetify.lang_56'),
            align: 'start',
            sortable: false,
            value: 'total'
          }, {
            text: this.$vuetify.lang.t('$vuetify.lang_81'),
            align: 'start',
            sortable: false,
            value: 'status'
          }, {
            text: this.$vuetify.lang.t('$vuetify.lang_118'),
            align: 'start',
            sortable: true,
            value: 'create_at'
          }
        ]
      }
    },
    props: {
      unit: {
        type: String
      }
    },
    watch: {
      $route(e) {
        this.eyelet = 0;
        this.setQuery(
            e.params.unit
        );
        this.getOrders(2);
      }
    },
    mounted() {
      this.setQuery(
          this.unit
      );
      this.getOrders(2);

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
        data.assigning = data.assigning ? 'SELL' : 'BUY';

        if (

            this.eyelet === 0 &&

            // Сверяем принадлежат ли новые события к данному активу,
            // если аргументы совпадают то привязываем полученные данные из события к данному активу.
            data.base_unit === this.getQuery()[0] &&
            data.quote_unit === this.getQuery()[1]

        ) {

          data.status = 'PENDING';

          this.count += 1;
          this.length = Math.ceil(this.count / this.limit);

          // Добавляем новый ордер в массив.
          this.orders.unshift(Object.assign({}, data));

          if (this.orders.length > this.limit) {
            this.orders.splice(-1)
          }
        }
      });

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
       * @param status
       * @returns {boolean}
       */
      getOrders(status) {

        this.status = status;
        if (!this.$auth.loggedIn) {
          return false;
        }

        let item = this.headers.find((o) => o.value === "canceled");
        if (item) {
          if (this.status === 1 || this.status === 0) {
            this.header.delete();
          }
        } else {
          if (this.status === 2) {
            this.header.set();
          }
        }

        this.$axios.$post(this.$api.spot.getOrders, {
          // Назначение [sell:1] - [buy:0] - [default:3].
          assigning: 3,
          // Имя актива (symbol-base).
          base_unit: this.getQuery()[0],
          // Имя актива (symbol-quote).
          quote_unit: this.getQuery()[1],
          // Показывать количество записей в массиве.
          limit: this.limit,
          // Показывать страицу по номеру.
          page: this.page,
          // Показывать записи только если я их владелец.
          owner: true,
          // Показывать записи если они со статусом в ожидании.
          status: status
        }).then((response) => {

          // Записываем список ордеров в ожидании в массив.
          this.orders = response.fields ?? [];
          this.count = response.count ?? 0;
          this.length = Math.ceil(this.count / this.limit);

          this.orders.map(item => {
            item.id = Number(item.id);
          });

          this.overlay = false;
        });
      },

      /**
       *
       */
      getMore() {
        this.getOrders(this.status);
      },

      /**
       * @param item
       * @returns {*|number}
       */
      getFees(item) {
        if (item.assigning) {
          return this.$decimal.truncate(this.$decimal.mul(this.$decimal.div(this.$decimal.mul(item.quantity, item.price), 100), item.fees), 0);
        } else {
          return this.$decimal.truncate(this.$decimal.mul(this.$decimal.div(item.quantity, 100), item.fees), 0);
        }
      },

      /**
       * @param id
       */
      cancelOrder(id) {
        this.$axios.$post(this.$api.spot.cancelOrder, {
          // Идентификатор ордера для удаления.
          id: id
        }).then(() => {

          // Удаляем ордер с массива по идентификатору.
          this.count -= 1;
          this.length = Math.ceil(this.count / this.limit);
          this.orders.splice(this.orders.map((o) => o.id).indexOf(id), 1);

          this.$nuxt.$emit('order/cancel', null);
          this.$single.play('delete');

          if (this.orders.length === 1 && this.count > 1) {
            this.getMore();
          }
        }).catch((error) => {
          this.$snackbar.open({
            content: `${error.response.data.code}: ${error.response.data.message}`,
            color: 'red darken-2'
          });
        });
      },
    },
    computed: {
      header() {
        return {
          set: () => {
            this.headers.push({
              text: this.$vuetify.lang.t('$vuetify.lang_222'),
              align: 'end',
              sortable: false,
              value: 'canceled'
            });
          },
          delete: () => {
            this.headers.pop();
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>