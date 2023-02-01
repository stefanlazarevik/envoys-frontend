<template>

  <!-- Start: depositaries component -->
  <v-component-depositaries />
  <!-- End: depositaries component -->

</template>

<script>
import Depositaries from "@/components/Admin/Stock/Depositaries";

export default {
  components: {
    'v-component-depositaries': Depositaries
  }
}
</script>

<style scoped>

</style>