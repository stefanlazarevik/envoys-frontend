<template>
  <v-card class="ma-2 pa-0" elevation="0" rounded="lg">
    <v-card-title>
      Create Request
    </v-card-title>
    <v-divider />
    <v-card-text>
      <v-select
          v-model="counterpartyValue"
          :items="counterpartyOptions"
          label="Counterparty ID"
          dense
          flat
          filled
          hide-details
          class="mb-5 input-reset"
          outlined
      ></v-select>
      <v-select
          v-model="assetValue"
          :items="assetOptions"
          label="Asset USD"
          outlined
          flat
          filled
          dense
          hide-details
          class="mb-5 input-reset"
      ></v-select>
      <v-text-field
          v-model="amountValue"
          type="number"
          label="Amount (opt.)"
          outlined
          flat
          filled
          dense
          hide-details
          class="mb-5"
          placeholder="0.00000000"
      ></v-text-field>
      <v-checkbox
          label="Free Paid by me"
          id="checkbox"
          color="success"
          :value="false"
          dense
          v-model="checkboxValue"
      ></v-checkbox>
      <v-textarea
          v-model="areaValue"
          outlined
          flat
          filled
          dense
          hide-details
          class="mb-5 input-reset"
          name="input-7-4"
          label="Protocol, memo or Tag (opt.)"
      ></v-textarea>
      <v-btn @click="setRequest" block color="green darken-1 white--text" elevation="0">Set Limits</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data(){
      return{
        assetOptions: ['ADA', 'AUD', 'AVAXS', 'BCH','BNB','BNB.BSC','Buzz','Buzz',],
        counterpartyOptions: ['FM-Test-MM (87)'],
        counterpartyValue: '',
        assetValue: '',
        amountValue: '',
        areaValue: '',
        checkboxValue: false,
      }
    },
    methods: {
      setRequest() {
        const request = {
          counterParty: this.counterpartyValue,
          asset: this.assetValue,
          amount: this.amountValue,
          freePaid: this.checkboxValue,
          area: this.areaValue,
        }

        if (!request.counterParty || !request.asset || !request.amount || !request.area) {
          return this.$snackbar.open({content: `All fields are required`, color: 'red darken-2'});
        }

        this.counterpartyValue = '';
        this.assetValue = '';
        this.amountValue = '';
        this.areaValue = '';
        this.checkboxValue = false;

        this.$emit('addRequestData', request)
      }
    },
    props: {
      requests: {
        type: Array
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>