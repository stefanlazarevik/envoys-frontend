<template>

  <!-- Start: currencies component -->
  <v-component-currencies />
  <!-- End: currencies component -->

</template>

<script>
  import Currencies from "@/components/Admin/Currencies";

  export default {
    components: {
      'v-component-currencies': Currencies
    }
  }
</script>

<style scoped>

</style>