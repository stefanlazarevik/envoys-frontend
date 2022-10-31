<template>
  <v-row class="ma-1" no-gutters>
    <v-col cols="12" md="4">
      <requests-form @addRequestData="addRequestData"/>
    </v-col>
    <v-col cols="12" md="8">
      <your-requests :requests="requests"/>
      <requests-to-you/>
    </v-col>
  </v-row>
</template>

<script>

  import RequestsForm from "@/components/Market/Requests/RequestsForm";
  import YourRequests from "@/components/Market/Requests/YourRequests";
  import RequestsToYou from "@/components/Market/Requests/RequestsToYou";

  export default {
    components: {RequestsToYou, YourRequests, RequestsForm},
    data(){
      return{
        assetOptions: ['ADA', 'AUD', 'AVAXS', 'BCH','BNB','BNB.BSC','Buzz','Buzz',],
        counterpartyOptions: ['FM-Test-MM (87)'],
        counterpartyValue: '',
        assetValue: '',
        amountValue: '',
        areaValue: '',
        freeValue: false,
        requests: [],
      }
    },
    methods:{
      addRequestData(data){
        this.requests.push(data)
      }
    }
  }

</script>

<style lang="scss" scoped>

</style>