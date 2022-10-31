<template>
  <div>

    <!-- Start: child container -->
    <nuxt-child />
    <!-- End: child container -->

  </div>
</template>

<script>
  export default {
    mounted() {
      this.getRoute();
    },
    watch: {
      $route() {
        setTimeout(() => {
          this.getRoute();
        }, 1000);
      }
    },
    methods: {
      async getRoute() {
        if (!this.$route.params.symbol) {
          await this.$axios.$post(this.$api.market.getInstruments).then((response) => {
            if (response.fields !== undefined) {
              let pairs = this.$route.params.name ? response.fields.pairs.filter((item) => item.base_name === this.$route.params.name.toUpperCase() || item.quote_name === this.$route.params.name.toUpperCase()) : [];
              return this.$router.push('/market/'+ this.$route.params.name +'/' + pairs[0].symbol.toLowerCase());
            }
          });
        }
      }
    }
  }
</script>

<style scoped>

</style>