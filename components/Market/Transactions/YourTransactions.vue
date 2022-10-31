<template>
  <v-card class="ma-2 pa-0" elevation="0" rounded="lg">
    <v-card-title>
      Your Transactions
    </v-card-title>
    <v-divider />
    <v-card-text class="text-center">
      <template v-if="transactions.length">

        <v-data-table :headers="headlines" :items="transactions" item-key="id" hide-default-footer>
          <template v-slot:item.counterParty="{ item }">
            <v-chip class="float-left ml-0 mr-2 black--text" label small>
              {{ item.counterParty }}
            </v-chip>
          </template>
          <template v-slot:item.asset="{ item }">
            <div class="float-left">{{ item.asset }}</div>
          </template>
          <template v-slot:item.amount="{ item }">
            <div class="float-left">{{ item.amount }}</div>
          </template>
          <template v-slot:item.freePaid="{ item }">
            <div class="float-left">
              <template v-if="item.freePaid">
                Sender
              </template>
              <template v-else>
                Not the sender
              </template>
            </div>
          </template>
          <template v-slot:item.area="{ item }">
            <div class="float-left">
              {{ item.area }}
            </div>
          </template>
          <template v-slot:item.date="{ item }">
            <div class="float-left">
              {{ item.date }}
            </div>
          </template>
          <template v-slot:item.remove>
            <v-icon>
              mdi-close-circle-outline
            </v-icon>
          </template>
        </v-data-table>

      </template>
      <template v-else>
        No data yet
      </template>
    </v-card-text>
  </v-card>
</template>

<script>

  export default {
    data() {
      return {
        headlines: [
          {
            text: 'CP ID',
            align: 'start',
            sortable: false,
            value: 'counterParty'
          },
          {
            text: 'Asset',
            align: 'start',
            sortable: false,
            value: 'asset'
          },
          {
            text: 'Amount',
            align: 'start',
            sortable: false,
            value: 'amount'
          },
          {
            text: 'Fee payer',
            align: 'start',
            sortable: false,
            value: 'freePaid'
          },
          {
            text: 'Comment',
            align: 'start',
            sortable: false,
            value: 'area'
          },
          {
            text: 'Time',
            align: 'start',
            sortable: false,
            value: 'date'
          },
          {
            text: 'Remove',
            align: 'end',
            sortable: false,
            value: 'remove'
          }
        ]
      }
    },
    props: {
      transactions: {
        type: Array
      }
    }
  }

</script>

<style lang="scss" scoped>

</style>