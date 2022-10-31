<template>
  <v-row class="ma-1" no-gutters>
    <v-col cols="12" md="6">
      <market-depth />
    </v-col>
    <v-col cols="12" md="6">
      <market-trades />
      <market-positions />
    </v-col>
  </v-row>
</template>

<script>

  import MarketDepth from "@/components/Market/MarketMain/MarketDepth";
  import MarketPositions from "@/components/Market/MarketMain/MarketPositions";
  import MarketTrades from "@/components/Market/MarketMain/MarketTrades";

  export default {
    components: { MarketTrades, MarketPositions, MarketDepth }
  }
</script>

<style lang="scss" scoped>

</style>