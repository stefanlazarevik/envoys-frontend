<template>
  <div class="mt-16">
    <v-container style="max-width: 1262px;">
      <div>
        <div class="text-h5 mb-5 font-weight-bold">{{ $vuetify.lang.t('$vuetify.lang_aboutus_1')}}</div>
        <div
            class="text-md-h3 text-sm-h4 text-h5 mb-15 font-weight-bold blue--text text--darken-2 text-uppercase"
            style="max-width: 1140px"
        >
          {{ $vuetify.lang.t('$vuetify.lang_aboutus_2')}}
        </div>
      </div>
      <div class="d-flex justify-space-between align-start flex-column flex-md-row white--text mb-15">
        <v-row no-gutters class="mb-10 mb-md-0">
          <v-col
              cols="12"
              style="max-width: 260px"
              sm="6"
              v-for="(card, index) in cards"
              :key="index"
          >
            <v-card
                min-height="130px"
                :color="!($vuetify.theme.dark) && 'grey lighten-4'"
                class="py-3 px-5 rounded mr-2 mb-2 width-100"
                elevation="0"
            >
              <div class="text-h4 mb-1 font-weight-bold">{{ card.year }}</div>
              <v-card-text class="pa-0" style="max-width: 180px">{{ card.text }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <div>
          <div
              :class="'text-body-1 mb-5 ' + ($vuetify.theme.dark ? 'white--text' : 'black--text')"
              style="max-width: 700px;"
          >
            {{ $vuetify.lang.t('$vuetify.lang_aboutus_3')}}
          </div>
          <div class="d-flex align-center">
            <a
                href="#"
                style="text-transform: uppercase; text-decoration: none;"
                class="font-weight-bold orange--text text--darken-1"
            >
              {{ $vuetify.lang.t('$vuetify.lang_aboutus_8')}}
            </a>
            <v-icon color="orange">mdi-arrow-top-right</v-icon>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'v-about-us',
  computed: {
    cards() {
      return [
        { year: 2019, text: this.$vuetify.lang.t('$vuetify.lang_aboutus_4') },
        { year: 2020, text: this.$vuetify.lang.t('$vuetify.lang_aboutus_5') },
        { year: 2021, text: this.$vuetify.lang.t('$vuetify.lang_aboutus_6') },
        { year: 2022, text: this.$vuetify.lang.t('$vuetify.lang_aboutus_7') },
      ]
    }
  }
}
</script>

<style scoped>

</style>