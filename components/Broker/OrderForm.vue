<template>
  <v-card class="ma-1" height="500" elevation="0">

    <!-- Start: asset balance element -->
    <v-app-bar color="transparent" height="50" flat>
      <v-tabs color="primary" v-model="eyelet" fixed-tabs>
        <v-tab @click="getInsert(index)" v-for="(item, index) in $broker.market.type" :key="index">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">{{ item.name }}</span>
            </template>
            <span>{{ item.title }}</span>
          </v-tooltip>
        </v-tab>
      </v-tabs>
    </v-app-bar>

    <v-divider />

    <!-- Start: form order trade element -->
    <v-card-text>

      <v-text-field v-model="$broker.market.type[eyelet].title" disabled class="mb-4" color="primary" height="40" dense hide-details outlined></v-text-field>
      <v-text-field v-if="query" v-model="value" placeholder="0.00000000" :label="active ? 'Volume' : 'Size'" dense hide-details outlined>
        <template v-slot:append>
          <div @click="active = !active" class="input-model">
            <span class="my-1 ml-3 mr-1 float-left" style="display: block;">{{ active ? getQuery()[0].toUpperCase() : getQuery()[1].toUpperCase() }}</span>
            <v-icon>
              mdi-reload
            </v-icon>
          </div>
        </template>
      </v-text-field>
      <v-text-field v-if="$broker.market.type[eyelet].value === 'limitIOC' || $broker.market.type[eyelet].value === 'limitFOK'" v-model="price" class="mt-4" placeholder="0.00000000" label="Price" dense hide-details outlined>
        <template v-slot:append>
          <div @click="price = 0" class="input-model">
            <v-icon class="ml-3">
              mdi-close-circle-outline
            </v-icon>
          </div>
        </template>
      </v-text-field>

    </v-card-text>
    <!-- End: form order trade element -->

    <v-divider />

    <v-card-actions class="ma-2">
      <v-row>
        <v-col cols="12" sm="6">
          <v-btn block color="green darken-1 white--text" @click="setOrder('bid')" elevation="0">BUY</v-btn>
        </v-col>
        <v-col cols="12" sm="6">
          <v-btn block color="red darken-1 white--text" @click="setOrder('ask')" elevation="0">SELL</v-btn>
        </v-col>
      </v-row>
    </v-card-actions>

    <v-divider />

    <template v-if="init">
      <v-overlay :color="$vuetify.theme.dark ? 'grey darken-4' : 'white'" opacity="0.8" absolute :value="overlay">
        <v-progress-circular color="yellow darken-3" indeterminate size="50" />
      </v-overlay>

      <template v-if="orders.length">
        <v-hover v-slot="{ hover }">
          <v-virtual-scroll :class="hover ? '' : 'overflow-y-hidden'" bench="0" :items="orders" :height="$broker.market.type[eyelet].value === 'limitIOC' || $broker.market.type[eyelet].value === 'limitFOK' ? 196 : 252" item-height="60">
            <template v-slot:default="{ item }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-list-item v-bind="attrs" v-on="on">
                    <v-list-item-icon class="mr-4">
                      <v-avatar size="40" :color="$broker.getType(item.type).color">
                        <small>{{ $broker.getType(item.type).type }}</small>
                      </v-avatar>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>{{ $vuetify.lang.t('$vuetify.lang_52') }}: {{ $decimal.truncate(item.price) }} {{ getQuery()[1].toUpperCase() }}</v-list-item-title>
                      <v-list-item-subtitle>{{ $vuetify.lang.t('$vuetify.lang_53') }}: {{ $decimal.truncate(item.size) }} {{ getQuery()[0].toUpperCase() }}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-list-item-action-text>
                        {{ $moment(item.create_at).format('h:mm:ss') }}
                      </v-list-item-action-text>
                    </v-list-item-action>
                  </v-list-item>
                </template>
                <span>{{ $broker.getType(item.type).title }}</span>
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

  </v-card>
</template>

<script>
  export default {
    name: "v-component-broker-order-form",
    props: {
      unit: String
    },
    data() {
      return {
        init: false,
        overlay: true,
        active: false,
        orders: [],
        eyelet: 0,
        value: 0,
        price: 0,
        query: null
      }
    },
    watch: {
      $route(e) {
        this.setQuery(
          e.params.unit
        );
        this.getOrders();
      }
    },
    mounted() {
      this.setQuery(this.$route.params.unit);
      this.getOrders();

      this.$nuxt.$on('price:update', (price) => {
        if (this.$broker.market.type[this.eyelet].value !== 'marketIOC' || this.$broker.market.type[this.eyelet].value !== 'marketFOK') {
          this.eyelet = 2;
          this.price = price;
        } else {
          this.price = 0;
        }
      });

      this.$nuxt.$on('orders:update', (order) => {
        this.orders.unshift(Object.assign({}, order));
      });

      this.overlay = true;
      this.init = this.$auth.loggedIn;
      setTimeout(() => {
        this.overlay = false;
      }, 1000);
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
       *
       */
      getInsert(index) {
        if (this.$broker.market.type[index].value === 'marketIOC' || this.$broker.market.type[index].value === 'marketFOK') {
          this.price = 0;
        }
      },

      /**
       * @param side
       */
      setOrder(side) {

        if (!this.$auth.loggedIn) {
          return false;
        }

        this.$axios.$post(this.$api.market.setOrder, {symbol: this.query.toUpperCase(), price: Number(this.price), size: Number(this.value), side: side, type: this.$broker.market.type[this.eyelet].value}).then((response) => {
          if (response.fields.length) {
            this.$nuxt.$emit("orders:update", response.fields[0])

            this.price = 0;
            this.value = 0;

            // Озвучиваем действие звуковым сопровождением.
            this.$single.play('create');
          }

        }).catch((error) => {
          this.$snackbar.open({content: `${error.response.data.code}: ${error.response.data.message}`, color: 'red darken-2'});
        });
      },

      /**
       *
       */
      getOrders() {

        if (!this.$auth.loggedIn) {
          return false;
        }

        this.$axios.$post(this.$api.market.getOrders, {symbol: this.query.toUpperCase()}).then((response) => {
          this.orders = response.fields ?? [];
        });
      }
    }
  }
</script>

<style lang="scss" scoped>

  .input-model {
    display: flex;
    cursor: pointer;
    border-left: 1px solid #a5a5a5;
  }

</style>