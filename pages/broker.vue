<template>
  <section class="pa-0 main-role">

    <template v-if="$route.name === 'broker-unit'">
      <v-row class="ma-1" no-gutters>

        <v-col cols="12" md="3" sm="6">
          <v-component-broker-market :unit="unit" />
        </v-col>

        <v-col cols="12" md="6" sm="6">
          <nuxt-child />
        </v-col>

        <v-col cols="12" md="3" sm="6">
          <v-component-broker-order-form :unit="unit" />
        </v-col>

      </v-row>
    </template>
    <template v-else>

      <!-- Start: child container -->
      <nuxt-child />
      <!-- End: child container -->

    </template>

    <v-overlay absolute :color="$vuetify.theme.dark ? 'grey darken-4' : 'white'" opacity="1" :value="!loader">
      <v-progress-circular color="yellow darken-3" indeterminate size="100" />
    </v-overlay>

  </section>
</template>

<script>

  import Market from "@/components/Broker/Market";
  import OrderForm from "@/components/Broker/OrderForm";

  export default {
    auth: false,
    components: {
      'v-component-broker-market': Market,
      'v-component-broker-order-form': OrderForm
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
      this.unit = this.$route.params.unit
      this.$axios.$get(this.$api.market.getInstruments).then((response) => {
        if (response.fields !== undefined) {
          let item = response.fields.pairs.find((item) => item.symbol === this.unit.toUpperCase());
          if (item) {
            this.loader = true;
          } else {
            this.$error.set("Pairs not found.");
          }
        }
      }).catch(e => {
        this.$error.set(e)
      });
    }
  }
</script>

<style scoped>

</style>