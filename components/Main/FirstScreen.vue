<template>
  <div>
    <v-container style="max-width: 1262px" class="d-flex flex-column flex-lg-row align-lg-start pt-lg-15 pt-10">
      <div class="d-flex flex-column mb-16 mb-lg-0 mr-lg-15 mt-lg-12">
        <div class="text-md-h2 text-sm-h4 text-h5 font-weight-bold mb-5 text-uppercase" style="max-width: 635px;">{{ $vuetify.lang.t("$vuetify.lang_firstsrc_1.title_1") }} <span
            class="blue--text text--darken-2">{{ $vuetify.lang.t("$vuetify.lang_firstsrc_1.title_2") }}</span></div>
        <div class="d-flex align-center">
          <a href="#" style="text-transform: uppercase; text-decoration: none;"
             class="font-weight-bold orange--text text--darken-1">{{ $vuetify.lang.t("$vuetify.lang_firstsrc_2") }}</a>
          <v-icon color="orange">mdi-arrow-top-right</v-icon>
        </div>
      </div>
      <img src="../../static/asset/main/first_screen/frst_scr.svg" alt="first screen" style="max-width: 411px;"/>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'v-first-screen'
}
</script>

<style lang="scss" scoped>

</style>