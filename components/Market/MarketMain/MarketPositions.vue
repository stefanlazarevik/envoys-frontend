<template>
  <v-card class="ma-2 pa-0 mt-4" elevation="0" rounded="lg">
    <v-card-title>
      <v-row no-gutters>
        <v-col cols="12" md="6">
          <div class="mt-1">Not Open Positions</div>
        </v-col>
        <v-col cols="12" md="6">
          <div class="float-right">
            <v-layout fill-height wrap>
              <v-flex mx-1>
                <v-select style="max-width: 200px;" v-model="selected" :items="options" item-text="name" item-value="name" label="Group by counterparty" color="grey darken-1" flat outlined filled dense hide-details />
              </v-flex>
              <v-flex mx-1>
                <v-btn class="text-capitalize" height="40" color="grey darken-1" outlined elevation="0">Total Equity <span class="blue--text">—</span></v-btn>
              </v-flex>
            </v-layout>
          </div>
        </v-col>
      </v-row>
    </v-card-title>
    <v-divider />
    <v-card-text>
      <v-data-table :headers="headers" :items="data" hide-default-footer :mobile-breakpoint="0">
        <template v-slot:item.position="{ item }">
          <span class="mb-0" :class="item.position[0] === '-' ? 'red--text': 'teal--text' ">
            {{ item.position }}
          </span>
        </template>
        <template v-slot:top>
          <v-layout>
            <v-chip label class="mr-3" :color="$vuetify.theme.dark ? 'grey darken-3' : 'blue-grey lighten-5'">
              Equity:<span :class="$vuetify.theme.dark ? 'grey--text accent-3--text' : 'indigo--text accent-3--text'">1126.79</span>
            </v-chip>
            <v-chip label class="mr-3" :color="$vuetify.theme.dark ? 'grey darken-3' : 'blue-grey lighten-5'">
              FM-Test-MM <span :class="$vuetify.theme.dark ? 'grey--text accent-3--text' : 'indigo--text accent-3--text'">(87)</span>
            </v-chip>
          </v-layout>
        </template>
      </v-data-table>
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <v-btn block to="/market/positions" class="text-capitalize" height="40" :color="$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-4'" elevation="0">Not Open Positions</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

  export default {
    data() {
      return {
        options: [
          { value: 0, name: "Group by counterparty"},
          { value: 1, name: "counterparty 2"},
          { value: 2, name: "counterparty 3"},
        ],
        selected: null,
        headers: [
          {
            text: 'Counterparty / Asset',
            align: 'start',
            width: 50,
            sortable: false,
            filterable: false,
            value: 'asset',
          },
          {
            text: 'Position	',
            align: 'start',
            width: 100,
            sortable: false,
            filterable: false,
            value: 'position',
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
            text: 'Position, $',
            align: 'start',
            width: 100,
            sortable: false,
            filterable: false,
            value: 'sumPosition',
          },
        ],
        data: [
          {
            asset: 'AUD',
            position: '-29402.36000000',
            price: '0.63',
            sumPosition: '-18523.49'
          },
          {
            asset: 'BTC',
            position: '1.00264980',
            price: '19660.12',
            sumPosition: '19720.30'
          },
          {
            asset: 'LTC',
            position: '-1.00000000',
            price: '52.15',
            sumPosition: '-52.19'
          },
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>