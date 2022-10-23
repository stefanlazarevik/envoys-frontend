<template>
  <section class="pa-0 main-role">

    <template v-if="loader">

      <v-row class="ma-1" no-gutters>

        <!-- Start: order book component -->
        <v-col cols="12" md="3" sm="6">
          <v-component-order-book :unit="unit" />
        </v-col>
        <!-- End: order book component -->

        <!-- Start: pair trade chart component -->
        <v-col cols="12" md="6" sm="6">
          <nuxt-child />
        </v-col>
        <!-- End: pair trade chart component -->

        <!-- Start: list of trading pairs market component -->
        <v-col cols="12" md="3" sm="6">
          <v-component-market :unit="unit" />
        </v-col>
        <!-- End: list of trading pairs market component -->

        <!-- Start: trade book component -->
        <v-col cols="12" md="3" sm="6">
          <v-component-trade-book :unit="unit" />
        </v-col>
        <!-- End: trade book component -->

        <!-- Start: buy order form component -->
        <v-col cols="12" md="3" sm="6">
          <v-component-order-form :unit="unit" assigning="buy" />
        </v-col>
        <!-- End: order form component -->

        <!-- Start: sell order form component -->
        <v-col cols="12" md="3" sm="6">
          <v-component-order-form :unit="unit" assigning="sell" />
        </v-col>
        <!-- End: order form component -->

        <!-- Start: common component -->
        <v-col cols="12" md="3" sm="6">
          <v-component-common />
        </v-col>
        <!-- End: common component -->

      </v-row>

    </template>

    <v-overlay absolute :color="$vuetify.theme.dark ? 'grey darken-4' : 'white'" opacity="1" :value="!loader">
      <v-progress-circular color="yellow darken-3" indeterminate size="100" />
    </v-overlay>

  </section>
</template>

<script>

  import Market from '@/components/Trade/Market';
  import OrderForm from '@/components/Trade/OrderForm';
  import OrderBook from "@/components/Trade/OrderBook";
  import TradeBook from "@/components/Trade/TradeBook";
  import Common from "@/components/Trade/Common";

  export default {
    auth: false,
    components: {
      'v-component-market': Market,
      'v-component-order-form': OrderForm,
      'v-component-order-book': OrderBook,
      'v-component-trade-book': TradeBook,
      'v-component-common': Common
    },
    data() {
      return {
        loader: false,
        unit: undefined
      }
    },

    /**
     *
     */
    mounted() {
      this.loader = false;
      this.$axios.$post(this.$api.exchange.getSymbol, {base_unit: this.$route.params.unit.split('-')[0], quote_unit: this.$route.params.unit.split('-')[1]}).then(() => {
        this.unit = this.$route.params.unit
        setTimeout(() => {
          this.loader = true;
        }, 1000);
      }).catch(e => {
        this.$error.set(e)
      });
    },

    /**
     *
     */
    beforeDestroy() {
      this.$publish.unbind(['trade/graph:0', 'order/status', 'order/create', 'order/cancel']);

      // Internal event off.
      this.$nuxt.$off('deposit/open/status');
    }
  }
</script>

<style scoped>

</style>
