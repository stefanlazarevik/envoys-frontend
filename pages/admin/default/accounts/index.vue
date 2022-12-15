<template>

  <!-- Start: accounts component -->
  <v-component-accounts />
  <!-- End: accounts component -->

</template>

<script>
  import Accounts from "@/components/Admin/Accounts.vue";

  export default {
    components: {
      'v-component-accounts': Accounts
    }
  }
</script>

<style scoped>

</style>