<template>
  <section class="pa-0 main-role">

    <v-row class="ma-1">

      <!-- Start: assets list component -->
      <v-col class="pa-1" cols="12" md="3" sm="6">
        <v-card class="fill-height" elevation="0">
          <v-list dense>
            <v-list-item-group color="primary">
              <v-list-item v-for="(item, i) in navs" :class="item.status === $route.params.status ? 'v-list-item--active' : ''"  :key="i" :to="`/orders/${item.status}`" exact link>
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
       * @returns {[{title: string, status: string},{title: string, status: string},{title: string, status: string}]}
       */
      navs() {
        return [
          {
            title: this.$vuetify.lang.t('$vuetify.lang_138'),
            icon: "mdi-archive-search-outline",
            status: 'all'
          }, {
            title: this.$vuetify.lang.t('$vuetify.lang_136'),
            icon: "mdi-archive-clock-outline",
            status: 'pending'
          }, {
            title: this.$vuetify.lang.t('$vuetify.lang_137'),
            icon: "mdi-archive-star-outline",
            status: 'filled'
          }
        ]
      }
    }
  }
</script>
