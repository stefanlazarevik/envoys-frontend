<template>
  <v-row class="ma-1" no-gutters>
    <v-col cols="12" md="4">
      <transactions-form @addRequestData="addRequestData"/>
    </v-col>
    <v-col cols="12" md="8">
      <your-transactions :transactions="transactions"/>
      <transactions-to-you/>
    </v-col>
  </v-row>
</template>

<script>

  import TransactionsForm from "@/components/Market/Transactions/TransactionsForm";
  import YourTransactions from "@/components/Market/Transactions/YourTransactions";
  import TransactionsToYou from "@/components/Market/Transactions/TransactionsToYou";

  export default {
    components: {TransactionsToYou, YourTransactions, TransactionsForm},
    data(){
      return{
        assetOptions: ['ADA', 'AUD', 'AVAXS', 'BCH','BNB','BNB.BSC','Buzz','Buzz',],
        counterpartyOptions: ['FM-Test-MM (87)'],
        counterpartyValue: '',
        assetValue: '',
        amountValue: '',
        areaValue: '',
        freeValue: false,
        transactions: [],
      }
    },
    methods:{
      addRequestData(data){
        this.transactions.push(data)
      }
    }
  }

</script>

<style lang="scss" scoped>

</style>