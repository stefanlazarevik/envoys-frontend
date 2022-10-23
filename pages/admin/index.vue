<template>

  <!-- Start: dashboard component -->
  <v-component-dashboard />
  <!-- End: dashboard component -->

</template>

<script>
  import Dashboard from "../../components/Admin/Dashboard";

  export default {
    name: "index",
    components: {
      'v-component-dashboard': Dashboard
    },
  }
</script>

<style scoped>

</style>