<template>

  <!-- Start: currencies component -->
  <v-component-currencies />
  <!-- End: currencies component -->

</template>

<script>
  import Currencies from "@/components/Admin/Currencies.vue";

  export default {
    components: {
      'v-component-currencies': Currencies
    }
  }
</script>

<style scoped>

</style>