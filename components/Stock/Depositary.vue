<template>
  <v-card class="ma-1" height="500" elevation="0">

    <!-- Start: app bar element -->
    <v-app-bar color="transparent" height="50" flat>
      <v-tabs fixed-tabs>
        <v-tab>
          Депозитарий ЦБ
        </v-tab>
        <v-tab>
          Депозитарий ДС
        </v-tab>
      </v-tabs>
    </v-app-bar>
    <!-- End: app bar element -->

    <v-divider />

    <v-layout style="height: 450px" wrap>
      <v-flex/>
      <v-flex class="text-center mx-5" align-self-center>
        <div>
          <v-icon size="50">
            mdi-database-remove-outline
          </v-icon>
        </div>
        <h4 class="text-overline">There is nothing here yet.</h4>
      </v-flex>
      <v-flex/>
    </v-layout>

  </v-card>
</template>

<script>
  export default {
    name: "v-component-stock-depositary",
  }
</script>

<style scoped>

</style>