<template>
  <section class="pa-0 main-role">

    <v-row class="ma-1" no-gutters>

      <!-- Start: assets list component -->
      <v-col class="pa-1" cols="12" md="3" sm="6">
        <v-card class="fill-height" elevation="0">
          <v-list dense>
            <v-list-item-group color="primary">
              <v-list-item v-for="(item, i) in navs" :class="item.to === $route.params.settings ? 'v-list-item--active' : ''"  :key="i" :to="`/account/${item.to}`" exact link>
                <v-list-item-icon class="mr-3">
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  {{ item.title }}
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      <!-- End: assets list component -->

      <!-- Start: child container -->
      <v-col class="pa-1" cols="12" md="9" sm="6">
        <v-card class="fill-height" elevation="0">
          <nuxt-child />
        </v-card>
      </v-col>
      <!-- End: child container -->

    </v-row>

  </section>
</template>

<script>

  export default {
    auth: true,
    computed: {

      /**
       * @returns {[{title: string, to: string},{title: string, to: string},{title: string, to: string}]}
       */
      navs() {
        return [
          {
            title: this.$vuetify.lang.t('$vuetify.lang_143'),
            icon: "mdi-account-circle-outline",
            to: 'profile'
          }, {
            title: this.$vuetify.lang.t('$vuetify.lang_144'),
            icon: "mdi-shield-lock-outline",
            to: 'security'
          }, {
            title: this.$vuetify.lang.t('$vuetify.lang_145'),
            icon: "mdi-bell-cog-outline",
            to: 'notification'
          }, {
            title: this.$vuetify.lang.t('$vuetify.lang_161'),
            icon: "mdi-account-convert-outline",
            to: 'activities'
          }
        ]
      }
    }
  }
</script>
