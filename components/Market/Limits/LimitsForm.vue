<template>
  <v-card class="ma-2 pa-0" elevation="0" rounded="lg">
    <v-card-title>
      Set Counterparty Limits
    </v-card-title>
    <v-divider />
    <v-card-text>
      <v-text-field
          type="number"
          label="Counterparty ID"
          outlined
          placeholder="0"
          flat
          filled
          dense
          hide-details
          class="mb-5 input-reset"
      ></v-text-field>
      <v-select
          :items="currencyOptions"
          label="Currency USD"
          outlined
          flat
          filled
          dense
          hide-details
          class="mb-5 input-reset"
      ></v-select>
      <v-text-field
          type="number"
          label="Gross Limit"
          outlined
          placeholder="0.00000000"
          flat
          filled
          dense
          hide-details
          class="mb-5 input-reset"
      ></v-text-field>
      <v-text-field
          type="number"
          label="Net Limit"
          outlined
          placeholder="0.00000000"
          flat
          filled
          dense
          hide-details
          class="mb-5 input-reset"
      ></v-text-field>
      <v-btn block color="green darken-1 white--text" elevation="0">Set Limits</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data(){
    return{
      currencyOptions: ['ADA', 'AUD', 'AVAXS', 'BCH','BNB','BNB.BSC','Buzz','Buzz',],
    }
  }
}
</script>

<style lang="scss" scoped>

</style>