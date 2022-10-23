<template>

  <!-- Start: transactions component -->
  <v-component-transactions />
  <!-- End: transactions component -->

</template>

<script>
  import Transactions from "@/components/Admin/Transactions";

  export default {
    components: {
      'v-component-transactions': Transactions
    }
  }
</script>

<style scoped>

</style>