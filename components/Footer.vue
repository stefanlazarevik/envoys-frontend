<template>
  <v-footer :color="$vuetify.theme.dark ? 'rgb(37, 37, 37)' : '#F9F9F9'" class="py-15">
    <v-container style="max-width: 1140px;">
      <v-row>
        <v-col class="col-12 col-md-4">
          <v-card class="elevation-0" :color="$vuetify.theme.dark ? 'rgb(37, 37, 37)' : '#F9F9F9'" max-width="300">
            <v-img height="30" width="60" class="mb-5" :src="require('../static/asset/footer-logo.svg')"></v-img>
            <v-card-text class="pa-0 mb-4 text-caption">Risk warning: Trading in financial instruments is a risky
              activity, but also losses.Please note that Markets does not
              provide services in the following countries.</v-card-text>
            <v-card-text class="pa-0 text-caption">Markets Ltd. has no representative offices of the company on the
              territory of the Kyrgyz Republic.</v-card-text>
          </v-card>
        </v-col>
        <v-col class="col-6 col-sm-3 col-md-2">
          <v-card class="elevation-0" :color="$vuetify.theme.dark ? 'rgb(37, 37, 37)' : '#F9F9F9'">
            <v-list-item class="px-0 px-md-4" dense>
              <v-list-item-title class="font-weight-bold text-body-2">Our Products</v-list-item-title>
            </v-list-item>
            <v-list-item href="#" class="px-0 px-md-4" dense>
              <v-list-item-title class="font-weight-regular text-body-2">Stock Exchange</v-list-item-title>
            </v-list-item>
            <v-list-item href="#" class="px-0 px-md-4" dense>
              <v-list-item-title class="font-weight-regular text-body-2">DEX</v-list-item-title>
            </v-list-item>
            <v-list-item href="#" class="px-0 px-md-4" dense>
              <v-list-item-title class="font-weight-regular text-body-2">Documents</v-list-item-title>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col class="col-6 col-sm-3 col-md-2">
          <v-card class="elevation-0" :color="$vuetify.theme.dark ? 'rgb(37, 37, 37)' : '#F9F9F9'">
            <v-list-item class="px-0 px-md-4" dense>
              <v-list-item-title class="font-weight-bold text-body-2">Links</v-list-item-title>
            </v-list-item>
            <v-list-item href="#" class="px-0 px-md-4" dense>
              <v-list-item-title class="font-weight-regular text-body-2">Main</v-list-item-title>
            </v-list-item>
            <v-list-item href="#" class="px-0 px-md-4" dense>
              <v-list-item-title class="font-weight-regular text-body-2">Market</v-list-item-title>
            </v-list-item>
            <v-list-item href="#" class="px-0 px-md-4" dense>
              <v-list-item-title class="font-weight-regular text-body-2">Buy a crypto</v-list-item-title>
            </v-list-item>
            <v-list-item href="#" class="px-0 px-md-4" dense>
              <v-list-item-title class="font-weight-regular text-body-2">FR participants</v-list-item-title>
            </v-list-item>
            <v-list-item href="#" class="px-0 px-md-4" dense>
              <v-list-item-title class="font-weight-regular text-body-2">References</v-list-item-title>
            </v-list-item>
            <v-list-item href="#" class="px-0 px-md-4" dense>
              <v-list-item-title class="font-weight-regular text-body-2">Depository</v-list-item-title>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col class="col-12 col-sm-3 col-md-2">
          <v-card class="elevation-0" :color="$vuetify.theme.dark ? 'rgb(37, 37, 37)' : '#F9F9F9'">
            <v-list-item class="px-0 px-md-4" dense>
              <v-list-item-title class="font-weight-bold text-body-2">Politic & Privacy</v-list-item-title>
            </v-list-item>
            <v-list-item href="#" class="px-0 px-md-4" dense>
              <v-list-item-title class="font-weight-regular text-body-2">Privacy policy</v-list-item-title>
            </v-list-item>
            <v-list-item href="#" class="px-0 px-md-4" dense>
              <v-list-item-title class="font-weight-regular text-body-2">AML Policy</v-list-item-title>
            </v-list-item>
            <v-list-item href="#" class="px-0 px-md-4" dense>
              <v-list-item-title class="font-weight-regular text-body-2 text-wrap">Personal data processing conditions
              </v-list-item-title>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col class="col-12 col-sm-3 col-md-2">
          <v-card class="elevation-0" :color="$vuetify.theme.dark ? 'rgb(37, 37, 37)' : '#F9F9F9'" max-width="150">
            <v-list-item class="px-0 px-md-4" dense>
              <v-list-item-title class="font-weight-bold text-body-2">Social Media</v-list-item-title>
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
