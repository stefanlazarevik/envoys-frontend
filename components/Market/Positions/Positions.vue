<template>
  <v-card class="ma-2 mt-3 pa-0" elevation="0" rounded="lg">
    <v-card-title>
      <v-row no-gutters>
        <v-col cols="12" md="4">
          <div class="mt-1">Net Open Positions</div>
        </v-col>
        <v-col cols="12" md="8">
          <div class="float-right">
            <v-layout fill-height wrap>
              <v-flex mx-1>
                <v-select v-model="selected" :items="options" item-text="name" item-value="name" label="Group by counterparty" flat filled outlined dense hide-details />
              </v-flex>
              <v-flex mx-1>
                <v-btn class="text-capitalize" height="40" color="grey darken-1" outlined elevation="0">Total planned Equity <span class="blue--text">$1080.57</span></v-btn>
              </v-flex>
              <v-flex mx-1>
                <v-btn class="text-capitalize" height="40" color="grey darken-1" outlined elevation="0">Total Equity <span class="blue--text">$1080.57</span></v-btn>
              </v-flex>
            </v-layout>
          </div>
        </v-col>
      </v-row>
    </v-card-title>
    <v-divider />
    <v-card-text>
      <v-data-table :headers="headers" :items="data" hide-default-footer disable-filtering :mobile-breakpoint="0">
        <template v-slot:item.position="{ item }">
          <p class="mb-0" :class="String(item.position)[0] === '-' ? 'red--text': 'teal--text' ">
            {{ item.position }}
          </p>
        </template>
        <template v-slot:item.sumPosition="{ item }">
          <p class="mb-0" :class="String(item.position)[0] === '-' ? 'red--text': 'teal--text' ">
            {{ item.sumPosition }}
          </p>
        </template>
        <template v-slot:item.plannedPosition="{ item }">
          <p class="mb-0" :class="String(item.position)[0] === '-' ? 'red--text': 'teal--text' ">
            {{ item.plannedPosition }}
          </p>
        </template>
        <template v-slot:item.sumPlannedPosition="{ item }">
          <p class="mb-0" :class="String(item.position)[0] === '-' ? 'red--text': 'teal--text' ">
            {{ item.sumPlannedPosition }}
          </p>
        </template>
        <template v-slot:item.percent="{ item }">
          <p class="mb-0" :class="String(item.position)[0] === '-' ? 'red--text': 'teal--text' ">
            {{ item.percent }}
          </p>
        </template>
        <template v-slot:item.cost="{ item }">
          <p class="mb-0" :class="String(item.position)[0] === '-' ? 'red--text': 'teal--text' ">
            {{ item.cost }}
          </p>
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
            align: 'end',
            width: 100,
            sortable: false,
            filterable: false,
            value: 'position',
          },
          {
            text: 'Price',
            align: 'end',
            width: 100,
            sortable: false,
            filterable: false,
            value: 'price',
          },
          {
            text: 'Position, $',
            align: 'end',
            width: 100,
            sortable: false,
            filterable: false,
            value: 'sumPosition',
          },

          {
            text: 'Planned Position',
            align: 'end',
            width: 100,
            sortable: false,
            filterable: false,
            value: 'plannedPosition',
          },
          {
            text: 'Volume',
            align: 'end',
            width: 100,
            sortable: false,
            filterable: false,
            value: 'sumPlannedPosition',
          },
          {
            text: 'OR, %',
            align: 'center',
            width: 100,
            sortable: false,
            filterable: false,
            value: 'percent',
          },
          {
            text: 'Est. overnight cost, $	',
            align: 'center',
            width: 100,
            sortable: false,
            filterable: false,
            value: 'cost',
          },
        ],
        data: [
          {
            asset: 'AUD',
            position: -29402.36000000,
            price: 0.63,
            sumPosition: -18523.49,
            plannedPosition: -29402.36000000,
            sumPlannedPosition: -18523.49,
            percent: '-',
            cost: '-'
          },
          {
            asset: 'AUD',
            position: 29402.36000000,
            price: 0.63,
            sumPosition: -18523.49,
            plannedPosition: -29402.36000000,
            sumPlannedPosition: -18523.49,
            percent: '-',
            cost: '-'
          },
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>