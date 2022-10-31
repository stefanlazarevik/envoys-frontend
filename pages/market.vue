<template>
  <div>

    <template v-if="$route.name === 'market-name-symbol'">
      <BuySellScroll />
    </template>

    <template v-if="loader">

      <!-- Start: child container -->
      <nuxt-child />
      <!-- End: child container -->

    </template>

    <v-overlay absolute :color="$vuetify.theme.dark ? 'grey darken-4' : 'white'" opacity="1" :value="!loader">
      <v-progress-circular color="yellow darken-3" indeterminate size="100" />
    </v-overlay>

  </div>
</template>

<script>

  import BuySellScroll from "@/components/Market/BuySellScroll";

  export default {
    auth: false,
    layout: 'market',
    components:{
      BuySellScroll
    },
    data() {
      return {
        loader: false,
      }
    },
    async asyncData({ $axios, $api, route, redirect, params, error }) {
      let name = params.name;
      if (!name && route.name === 'market-name-symbol') {
        return $axios.$post($api.market.getInstruments).then((response) => {
          if (response.fields !== undefined) {
            let pairs = response.fields.pairs.filter((item) => item.base_name === 'BTC' || item.quote_name === 'BTC');
            return redirect('/market/btc/' + pairs[0].symbol.toLowerCase());
          }
        }).catch(e => {
          error(e)
        });
      }
    },

    /**
     *
     */
    mounted() {
      this.loader = false;
      setTimeout(() => {
        this.loader = true;
      }, 2000);
    }
  }
</script>

<style scoped>

</style>