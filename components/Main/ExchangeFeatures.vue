<template>
  <div class="py-10" style="background-color: #252525;">
    <v-container style="max-width: 1262px">
      <div class="d-flex flex-column px-3 px-sm-15 px-md-0">
        <div class="d-flex justify-space-between align-start flex-column flex-md-row white--text mb-15">
          <div class="text-h4 mb-10 mb-md-0 text-uppercase">{{$vuetify.lang.t('$vuetify.lang_ex_features_1.title_1')}} <span style="color: #F48020;">{{$vuetify.lang.t('$vuetify.lang_ex_features_1.title_2')}}</span></div>
          <div class="text-body-1" style="max-width: 450px;">{{$vuetify.lang.t('$vuetify.lang_ex_features_2')}}</div>
        </div>

        <div class="d-flex justify-lg-space-between flex-wrap align-start flex-md-row flex-column">
          <div class="d-flex flex-column align-start mb-0 mb-md-15 mb-lg-0" style="max-width: 360px;">
            <div class="white text-h4 rounded-circle px-4 py-1 mb-5" style="color: #F48020;">1</div>
            <div class="text-body-1 white--text mb-5">{{$vuetify.lang.t('$vuetify.lang_ex_features_3')}}</div>
            <div class="text-body-1 font-weight-light" style="color: #CBCBCB;">{{$vuetify.lang.t('$vuetify.lang_ex_features_4')}}</div>
            <div class="text-body-1 font-weight-light" style="color: #CBCBCB;">{{$vuetify.lang.t('$vuetify.lang_ex_features_5')}}</div>
            <div class="text-body-1 font-weight-light" style="color: #CBCBCB;">{{$vuetify.lang.t('$vuetify.lang_ex_features_6')}}</div>
          </div>
          <v-divider vertical style="border-color: #E8E8E8;" class="mx-4 mx-md-7 d-none d-sm-block"></v-divider>
          <v-divider class="d-block d-md-none my-7" style="border-color: #E8E8E8; width: 100%;"></v-divider>
          <div class="d-flex flex-column align-start" style="max-width: 360px;">
            <div class="white text-h4 rounded-circle px-4 py-1 mb-5" style="color: #F48020;">2</div>
            <div class="text-body-1 white--text mb-5">{{$vuetify.lang.t('$vuetify.lang_ex_features_7')}}</div>
            <div class="text-body-1 font-weight-light" style="color: #CBCBCB;">{{$vuetify.lang.t('$vuetify.lang_ex_features_8')}}</div>
            <div class="text-body-1 font-weight-light" style="color: #CBCBCB;">{{$vuetify.lang.t('$vuetify.lang_ex_features_9')}}</div>
            <div class="text-body-1 font-weight-light" style="color: #CBCBCB;">{{$vuetify.lang.t('$vuetify.lang_ex_features_10')}}</div>
          </div>
          <v-divider vertical style="border-color: #E8E8E8;" class="d-none d-lg-block mx-md-7"></v-divider>
          <v-divider class="d-block d-md-none my-7" style="border-color: #E8E8E8; width: 100%;"></v-divider>
          <div class="d-flex flex-column align-start" style="max-width: 360px;">
            <div class="white text-h4 rounded-circle px-4 py-1 mb-5" style="color: #F48020;">3</div>
            <div class="text-body-1 white--text mb-5">{{$vuetify.lang.t('$vuetify.lang_ex_features_11')}}</div>
            <div class="text-body-1 font-weight-light" style="color: #CBCBCB;">{{$vuetify.lang.t('$vuetify.lang_ex_features_12')}}</div>
            <div class="text-body-1 font-weight-light" style="color: #CBCBCB;">{{$vuetify.lang.t('$vuetify.lang_ex_features_13')}}</div>
            <div class="text-body-1 font-weight-light" style="color: #CBCBCB;">{{$vuetify.lang.t('$vuetify.lang_ex_features_14')}}</div>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
  export default {
    name: 'v-exchange-features'
  }
</script>

<style lang="scss" scoped>

</style>