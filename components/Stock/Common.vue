<template>
  <v-card class="ma-1" height="500" elevation="0">

    <!-- Start: app bar element -->
    <v-app-bar color="transparent" height="50" flat>
      <v-tabs>
        <v-tab>
          Приказы (0)
        </v-tab>
        <v-tab>
          Сделки (0)
        </v-tab>
        <v-tab>
          Депонирование ЦБ (0)
        </v-tab>
        <v-tab>
          Депонирование ДС (0)
        </v-tab>
        <v-tab>
          Депо-операции (0)
        </v-tab>
        <v-tab>
          Эмиссия (IPO) (0)
        </v-tab>
        <v-tab>
          Списание ЦБ (0)
        </v-tab>
        <v-tab>
          Списание ДС (0)
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
  name: "v-component-stock-common"
}
</script>

<style scoped>

</style>