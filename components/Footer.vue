<template>
  <v-footer :color="$vuetify.theme.dark ? 'rgb(37, 37, 37)' : '#F9F9F9'" class="py-15">
    <v-container style="max-width: 1140px;">
      <v-row>
        <v-col class="col-12 col-md-4">
          <v-card class="elevation-0" :color="$vuetify.theme.dark ? 'rgb(37, 37, 37)' : '#F9F9F9'" max-width="300">
            <v-img height="30" width="60" class="mb-5" :src="require('../static/asset/footer-logo.svg')"></v-img>
            <v-card-text class="pa-0 mb-4 text-caption">{{$vuetify.lang.t('$vuetify.lang_footer_1')}}</v-card-text>
            <v-card-text class="pa-0 text-caption">{{$vuetify.lang.t('$vuetify.lang_footer_2')}}</v-card-text>
          </v-card>
        </v-col>
        <v-col class="col-6 col-sm-3 col-md-2">
          <v-card class="elevation-0" :color="$vuetify.theme.dark ? 'rgb(37, 37, 37)' : '#F9F9F9'">
            <v-list-item class="px-0 px-md-4" dense>
              <v-list-item-title class="font-weight-bold text-body-2">{{$vuetify.lang.t('$vuetify.lang_footer_3')}}</v-list-item-title>
            </v-list-item>
            <v-list-item href="#" class="px-0 px-md-4" dense>
              <v-list-item-title class="font-weight-regular text-body-2">{{$vuetify.lang.t('$vuetify.lang_footer_4')}}</v-list-item-title>
            </v-list-item>
            <v-list-item href="#" class="px-0 px-md-4" dense>
              <v-list-item-title class="font-weight-regular text-body-2">{{$vuetify.lang.t('$vuetify.lang_footer_5')}}</v-list-item-title>
            </v-list-item>
            <v-list-item href="#" class="px-0 px-md-4" dense>
              <v-list-item-title class="font-weight-regular text-body-2">{{$vuetify.lang.t('$vuetify.lang_footer_6')}}</v-list-item-title>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col class="col-6 col-sm-3 col-md-2">
          <v-card class="elevation-0" :color="$vuetify.theme.dark ? 'rgb(37, 37, 37)' : '#F9F9F9'">
            <v-list-item class="px-0 px-md-4" dense>
              <v-list-item-title class="font-weight-bold text-body-2">{{$vuetify.lang.t('$vuetify.lang_footer_7')}}</v-list-item-title>
            </v-list-item>
            <v-list-item href="#" class="px-0 px-md-4" dense>
              <v-list-item-title class="font-weight-regular text-body-2">{{$vuetify.lang.t('$vuetify.lang_footer_8')}}</v-list-item-title>
            </v-list-item>
            <v-list-item href="#" class="px-0 px-md-4" dense>
              <v-list-item-title class="font-weight-regular text-body-2">{{$vuetify.lang.t('$vuetify.lang_footer_9')}}</v-list-item-title>
            </v-list-item>
            <v-list-item href="#" class="px-0 px-md-4" dense>
              <v-list-item-title class="font-weight-regular text-body-2">{{$vuetify.lang.t('$vuetify.lang_footer_10')}}</v-list-item-title>
            </v-list-item>
            <v-list-item href="#" class="px-0 px-md-4" dense>
              <v-list-item-title class="font-weight-regular text-body-2">{{$vuetify.lang.t('$vuetify.lang_footer_11')}}{{$vuetify.lang.t('$vuetify.lang_footer_2')}}</v-list-item-title>
            </v-list-item>
            <v-list-item href="#" class="px-0 px-md-4" dense>
              <v-list-item-title class="font-weight-regular text-body-2">{{$vuetify.lang.t('$vuetify.lang_footer_12')}}</v-list-item-title>
            </v-list-item>
            <v-list-item href="#" class="px-0 px-md-4" dense>
              <v-list-item-title class="font-weight-regular text-body-2">{{$vuetify.lang.t('$vuetify.lang_footer_13')}}</v-list-item-title>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col class="col-12 col-sm-3 col-md-2">
          <v-card class="elevation-0" :color="$vuetify.theme.dark ? 'rgb(37, 37, 37)' : '#F9F9F9'">
            <v-list-item class="px-0 px-md-4" dense>
              <v-list-item-title class="font-weight-bold text-body-2">{{$vuetify.lang.t('$vuetify.lang_footer_14')}}</v-list-item-title>
            </v-list-item>
            <v-list-item href="#" class="px-0 px-md-4" dense>
              <v-list-item-title class="font-weight-regular text-body-2">{{$vuetify.lang.t('$vuetify.lang_footer_15')}}</v-list-item-title>
            </v-list-item>
            <v-list-item href="#" class="px-0 px-md-4" dense>
              <v-list-item-title class="font-weight-regular text-body-2">{{$vuetify.lang.t('$vuetify.lang_footer_16')}}</v-list-item-title>
            </v-list-item>
            <v-list-item href="#" class="px-0 px-md-4" dense>
              <v-list-item-title class="font-weight-regular text-body-2 text-wrap">{{$vuetify.lang.t('$vuetify.lang_footer_17')}}
              </v-list-item-title>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col class="col-12 col-sm-3 col-md-2">
          <v-card class="elevation-0" :color="$vuetify.theme.dark ? 'rgb(37, 37, 37)' : '#F9F9F9'" max-width="150">
            <v-list-item class="px-0 px-md-4" dense>
              <v-list-item-title class="font-weight-bold text-body-2">{{$vuetify.lang.t('$vuetify.lang_footer_18')}}</v-list-item-title>
            </v-list-item>
            <div class="px-md-4 d-flex align-center justify-space-between">
              <a href="#" class="rounded-circle d-flex align-center justify-center text-decoration-none"
                style="width: 24px; height: 24px; background-color: #e4e4e4;">
                <v-icon size="12" color="#252525">mdi-instagram</v-icon>
              </a>
              <a href="#" class="rounded-circle d-flex align-center justify-center text-decoration-none"
                style="width: 24px; height: 24px; background-color: #e4e4e4;">
                <v-icon size="12" color="#252525">mdi-facebook</v-icon>
              </a>
              <a href="#" class="rounded-circle d-flex align-center justify-center text-decoration-none"
                style="width: 24px; height: 24px; background-color: #e4e4e4;">
                <v-icon size="12" color="#252525">mdi-twitter</v-icon>
              </a>
              <a href="#" class="rounded-circle d-flex align-center justify-center text-decoration-none"
                style="width: 24px; height: 24px; background-color: #e4e4e4;">
                <v-icon size="12" color="#252525">mdi-linkedin</v-icon>
              </a>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<!--   <v-footer v-if="$route.name !== 'trade-exchange'" color="transparent" padless>
    <v-col class="text-center" cols="12">
      Exchange &copy; {{ new Date().getFullYear() }}
    </v-col>
  </v-footer> -->

<script>
export default {
  name: "v-component-footer"
}
</script>

<style scoped>

</style>
