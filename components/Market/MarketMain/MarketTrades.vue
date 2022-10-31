<template>
  <v-card class="ma-2 pa-0" elevation="0" rounded="lg">
    <v-card-title>
      Last Trades
    </v-card-title>
    <v-divider />
    <v-card-text>
      <v-data-table :headers="headers" :items="data" hide-default-footer disable-filtering :mobile-breakpoint="0">
        <template v-slot:item.side="{ item }">
          <p class="mb-0" :class="item.side === 'Sell' ? 'red--text': 'teal--text' ">
            {{ item.side }}
          </p>
        </template>
        <template v-slot:item.price="{ item }">
          <p class="mb-0" :class="item.side === 'Sell' ? 'red--text': 'teal--text' ">
            {{ item.price }}
          </p>
        </template>
      </v-data-table>
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <v-btn to="/market/trades" block class="text-capitalize" height="40" :color="$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-4'" elevation="0">See History</v-btn>
    </v-card-actions>
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
          value: 'instrument',
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
        },
      ],
      data: [
        {
          instrument: 'LTC-BTC',
          side: 'Sell',
          price: 0.00264980,
          size: 1.00000000,
          volume: 0.00264980
        },
        {
          instrument: 'LTC-BTC',
          side: 'Buy',
          price: 0.00264980,
          size: 1.00000000,
          volume: 0.00264980
        },
        {
          instrument: 'LTC-BTC',
          side: 'Sell',
          price: 0.00264980,
          size: 1.00000000,
          volume: 0.00264980
        }
      ],
    }
  },
}
</script>

<style lang="scss" scoped>

</style>