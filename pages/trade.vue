<template>
  <section :class="(this.$store.state.localStorage.screen ? '' : 'main-role') + ' pa-0'">

    <template v-if="loader">

      <v-row v-if="$route.query.type === 'spot'" class="ma-1" no-gutters>

        <!-- Start: order book component -->
        <v-col cols="12" md="3" sm="6">
          <v-component-spot-book :unit="unit" />
        </v-col>
        <!-- End: order book component -->

        <!-- Start: pair trade chart component -->
        <v-col cols="12" md="6" sm="6">
          <nuxt-child />
        </v-col>
        <!-- End: pair trade chart component -->

        <!-- Start: list of trading pairs market component -->
        <v-col cols="12" md="3" sm="6">
          <v-component-spot-market :unit="unit" />
        </v-col>
        <!-- End: list of trading pairs market component -->

        <!-- Start: trade book component -->
        <v-col cols="12" md="3" sm="6">
          <v-component-spot-trade :unit="unit" />
        </v-col>
        <!-- End: trade book component -->

        <!-- Start: buy order form component -->
        <v-col cols="12" md="3" sm="6">
          <v-component-spot-form :unit="unit" assigning="buy" />
        </v-col>
        <!-- End: order form component -->

        <!-- Start: sell order form component -->
        <v-col cols="12" md="3" sm="6">
          <v-component-spot-form :unit="unit" assigning="sell" />
        </v-col>
        <!-- End: order form component -->

        <!-- Start: common component -->
        <v-col cols="12" md="3" sm="6">
          <v-component-spot-common />
        </v-col>
        <!-- End: common component -->

        <!-- Start: history component -->
        <v-col cols="12" lg="12">
          <v-component-spot-history :unit="unit" />
        </v-col>
        <!-- End: history component -->

      </v-row>

      <v-row v-if="$route.query.type === 'stock'" class="ma-1" no-gutters>

        stock trade

      </v-row>

    </template>

    <v-overlay absolute :color="$vuetify.theme.dark ? 'grey darken-4' : 'white'" opacity="1" :value="!loader">
      <v-progress-circular color="yellow darken-3" indeterminate size="100" />
    </v-overlay>

  </section>
</template>

<script>

  import Market from '@/components/Spot/Market';
  import Form from '@/components/Spot/Form';
  import Book from "@/components/Spot/Book";
  import Trade from "@/components/Spot/Trade";
  import Common from "@/components/Spot/Common";
  import History from "@/components/Spot/History";

  export default {
    auth: false,
    components: {
      'v-component-spot-market': Market,
      'v-component-spot-form': Form,
      'v-component-spot-book': Book,
      'v-component-spot-trade': Trade,
      'v-component-spot-common': Common,
      'v-component-spot-history': History
    },
    data() {
      return {
        loader: false,
        unit: undefined
      }
    },

    watch: {
      $route() {
        this.getSymbol(false);
      }
    },

    /**
     *
     */
    mounted() {
      this.getSymbol(true);
    },

    methods: {
      getSymbol(loader) {

        if (this.$route.query.type !== 'spot' && this.$route.query.type !== 'stock') {
          this.$error.set('Type trade not found!.');
          return false
        }

        this.loader = !loader;

        this.$axios.$post(this.$api[this.$route.query.type].getSymbol, {base_unit: this.$route.params.unit.split('-')[0], quote_unit: this.$route.params.unit.split('-')[1]}).then(() => {
          this.unit = this.$route.params.unit;

          if (loader) {
            setTimeout(() => {
              this.loader = true;
            }, 1000);
          }
        }).catch(e => {
          this.$error.set(e)
        });
      }
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
