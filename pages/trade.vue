<template>
  <section :class="(this.$store.state.localStorage.screen ? '' : 'main-role') + ' pa-0'">

    <template v-if="loader">

      <v-row class="ma-1" no-gutters>

        <v-col :order-xl="$store.state.localStorage.screen ? 2 : 0" cols="12" :xl="$store.state.localStorage.screen ? 2 : 3" lg="3" md="12" sm="12" class="hidden-md-and-down hidden-sm-and-down">
          <!-- Start: order book component -->
          <v-component-spot-book />
          <!-- End: order book component -->
        </v-col>

        <v-col :order-xl="$store.state.localStorage.screen ? 0 : 1" cols="12" :xl="$store.state.localStorage.screen ? 8 : 6" lg="6" md="12" sm="12">
          <!-- Start: pair trade chart component -->
          <nuxt-child />
          <!-- End: pair trade chart component -->

          <!-- Start: my trade history component -->
          <v-component-spot-history class="mt-2" />
          <!-- End:  my trade history component -->
        </v-col>

        <v-col :order-xl="$store.state.localStorage.screen ? 2 : 2" cols="12" :xl="$store.state.localStorage.screen ? 2 : 3" lg="3" md="12" sm="12">
          <!-- Start: trade form component -->
          <v-component-spot-form />
          <!-- End: trade form component -->

          <!-- Start: list of trading pairs market component -->
          <v-component-spot-market class="mt-2" />
          <!-- End: list of trading pairs market component -->
        </v-col>

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
  import Book from "~/components/Spot/Book";
  import History from "~/components/Spot/History";

  export default {
    auth: false,
    components: {
      'v-component-spot-market': Market,
      'v-component-spot-form': Form,
      'v-component-spot-book': Book,
      'v-component-spot-history': History
    },
    data() {
      return {
        loader: false,
      }
    },

    /**
     *
     */
    mounted() {
      this.getSymbol();
    },

    methods: {
      getSymbol() {

        this.loader = false;

        this.$axios.$post(this.$api.spot.getSymbol, {base_unit: this.parse.base(), quote_unit: this.parse.quote()}).then(() => {
          setTimeout(() => {
            this.loader = true;
          }, 1000);
        }).catch((error) => {
          this.$nuxt.error({ statusCode: 404, message: error.response.data.message });
        });
      }
    },

    computed: {

      /**
       * @returns {{quote: (function(): string), base: (function(): string)}}
       */
      parse() {
        return {
          base: () => {
            return this.$route.params.unit.split('-')[0]
          },
          quote: () => {
            return this.$route.params.unit.split('-')[1]
          }
        }
      }
    },

    /**
     *
     */
    beforeDestroy() {
      this.$publish.unbind(['trade/candles:0', 'order/status', 'order/create', 'order/cancel']);

      // Internal event off.
      this.$nuxt.$off('deposit/open/status');
    }
  }
</script>

<style scoped>

</style>
