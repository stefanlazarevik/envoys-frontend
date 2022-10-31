<template>
  <v-row class="ma-1" no-gutters>
    <v-col cols="12" md="4">
      <limits-form/>
    </v-col>
    <v-col cols="12" md="8">
      <limits-global/>
      <limits-limit/>
    </v-col>
  </v-row>
</template>

<script>
  import LimitsGlobal from "@/components/Market/Limits/LimitsGlobal";
  import LimitsLimit from "@/components/Market/Limits/LimitsLimit";
  import LimitsForm from "@/components/Market/Limits/LimitsForm";

  export default {
    name: "Limits",
    components: {LimitsForm, LimitsLimit, LimitsGlobal},
  }
</script>

<style lang="scss" scoped>

</style>