<template>
  <v-card class="ma-2 pa-0" elevation="0" rounded="lg">
    <v-card-title>
      Last Trades
    </v-card-title>
    <v-divider />
    <v-card-text>
      <v-data-table :headers="headers" :items="orders" hide-default-footer disable-filtering>
        <template v-slot:item.side="{ item }">
          <p class="mb-0" :class="item.side === 'ask' ? 'red--text': 'teal--text' ">
            {{ item.side === "bid" ? "Buy" : "Sell" }}
          </p>
        </template>
        <template v-slot:item.price="{ item }">
          <p class="mb-0" :class="item.side === 'ask' ? 'red--text': 'teal--text' ">
            {{ item.price }}
          </p>
        </template>
      </v-data-table>
    </v-card-text>
    <v-divider />
  </v-card>
</template>

<script>
  export default {
    data() {
      return {
        headers: [
          {
            text: 'Instrument',
            align: 'start',
            width: 100,
            sortable: false,
            filterable: false,
            value: 'symbol',
          },
          {
            text: 'Side',
            align: 'start',
            width: 100,
            sortable: false,
            filterable: false,
            value: 'side',
          },
          {
            text: 'Price',
            align: 'start',
            width: 100,
            sortable: false,
            filterable: false,
            value: 'price',
          },
          {
            text: 'Size',
            align: 'start',
            width: 100,
            sortable: false,
            filterable: false,
            value: 'size',
          },
          {
            text: 'Volume',
            align: 'start',
            width: 100,
            sortable: false,
            filterable: false,
            value: 'volume',
          }
        ],
        orders: []
      }
    },
    watch: {
      $route(route) {
        if (route.params.symbol) {
          this.getOrders();
        }
      }
    },
    mounted() {

      this.$nuxt.$on('orders:update', (order) => {
        this.orders.unshift(Object.assign({}, order));
      });

      if (this.$route.params.symbol) {
        this.getOrders();
      }
    },
    methods: {
      getOrders() {
        this.$axios.$post(this.$api.market.getOrders, {symbol: this.$route.params.symbol.toUpperCase()}).then((response) => {
            this.orders = response.fields ?? [];
        });
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>