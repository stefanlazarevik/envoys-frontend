<template>
  <div class="py-15">
    <div class="py-10" style="background-color: #252525;">
      <v-container style="max-width: 1262px">
        <div class="d-flex flex-column px-3 px-sm-15 px-md-0">
          <div class="d-flex white--text mb-15">
            <div class="text-h4 mb-10 mb-md-0 text-uppercase font-weight-bold"><span
                style="color: #F48020;">{{$vuetify.lang.t('$vuetify.lang_contacts_1.title_1')}}</span> {{$vuetify.lang.t('$vuetify.lang_contacts_1.title_2')}}</div>
          </div>
    
          <div class="d-flex justify-lg-space-between flex-wrap align-start flex-md-row flex-column h-100">
            <div class="d-flex flex-column align-start justify-space-between px-5 py-5 mb-md-15 mb-lg-0" style="min-height: 210px;">
              <div>
                <div class="text-subtitle-1 white--text mb-3">{{$vuetify.lang.t('$vuetify.lang_contacts_2')}}</div>
                <div class="text-caption font-weight-light" style="color: #CBCBCB;">{{$vuetify.lang.t('$vuetify.lang_contacts_3')}}</div>
              </div>
              <div class="d-flex align-start align-sm-center flex-column flex-sm-row w-100">
                <div class="text-caption font-weight-light mr-sm-15 mb-4 mb-sm-0" style="color: #CBCBCB;">+996 (312) 884 448</div>
                <a href="mailto:office@envoys.vision" class="text-caption" style="color: #4478BB;">office@envoys.vision</a>
              </div>
            </div>
            <v-divider vertical style="border-color: #E8E8E8;" class="mx-4 mx-md-7 d-none d-sm-block"></v-divider>
            <v-divider class="d-block d-md-none my-7" style="border-color: #E8E8E8; width: 100%;"></v-divider>
            <div class="d-flex flex-column align-start justify-space-between px-5 py-5" style="min-height: 210px;">
              <div>
                <div class="text-subtitle-1 white--text mb-3">{{$vuetify.lang.t('$vuetify.lang_contacts_4')}}</div>
                <div class="text-caption font-weight-light" style="color: #CBCBCB;">{{$vuetify.lang.t('$vuetify.lang_contacts_5')}}</div>
              </div>
              <div class="d-flex align-start align-sm-center flex-column flex-sm-row w-100">
                <div class="text-caption font-weight-light mr-sm-15 mb-4 mb-sm-0" style="color: #CBCBCB;">+996 (312) 884 448</div>
                <a href="mailto:office@envoys.vision" class="text-caption" style="color: #4478BB;">depository@envoys.vision</a>
              </div>
            </div>
            <v-divider vertical style="border-color: #E8E8E8;" class="d-none d-sm-block mx-md-7"></v-divider>
            <v-divider class="d-block d-md-none my-7" style="border-color: #E8E8E8; width: 100%;"></v-divider>
            <div class="d-flex flex-column align-start justify-space-between px-5 py-5" style="min-height: 210px;">
              <div>
                <div class="text-subtitle-1 white--text mb-3">{{$vuetify.lang.t('$vuetify.lang_contacts_6')}}</div>
                <div class="text-caption font-weight-light" style="color: #CBCBCB;">{{$vuetify.lang.t('$vuetify.lang_contacts_7')}}</div>
              </div>
              <div class="d-flex align-start align-sm-center flex-column flex-sm-row w-100">
                <div class="text-caption font-weight-light mr-sm-15 mb-4 mb-sm-0" style="color: #CBCBCB;">+996 (312) 884 448</div>
                <a href="mailto:office@envoys.vision" class="text-caption" style="color: #4478BB;">exchange@envoys.vision</a>
              </div>
            </div>
          </div>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'v-contacts'
  }
</script>

<style lang="scss" scoped>

</style>