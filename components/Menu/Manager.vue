<template>
  <v-menu v-if="success" offset-y min-width="auto" nudge-left="50" origin="top center" content-class="mt-5 elevation-1" transition="slide-y-transition">
    <template v-slot:activator="{ on, attrs }">
      <v-btn :color="$vuetify.theme.dark ? '' : 'deep-purple lighten-4'" elevation="0" icon v-bind="attrs" v-on="on">
        <v-icon :color="$vuetify.theme.dark ? '' : 'grey darken-1'">
          mdi-lock-plus-outline
        </v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-list :color="$vuetify.theme.dark ? 'grey darken-3' : ''">
        <v-list-item :color="$vuetify.theme.dark ? '' : 'deep-purple lighten-4'" v-for="(item, index) in items" :key="index" :to="item.to" nuxt>
          <v-icon :color="$vuetify.theme.dark ? '' : 'grey darken-2'" size="30">
            {{ item.icon }}
          </v-icon>
          <v-list-item-title :class="$vuetify.theme.dark ? 'ml-2' : 'ml-2 brown--text'">{{ $vuetify.lang.t(`$vuetify.${item.title}`) }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
  export default {
    name: "v-component-menu-manager",
    data() {
      return {
        success: false,
        items: [
          {icon: 'mdi-alpha-e-circle-outline', title: 'lang_31', to: '/trade/eth-usd'}
        ],
      }
    },
    mounted() {
      this.rules();
    },
    methods: {
      rules() {
        let rules = this.$auth.user.rules;
        rules.map((item) => {
          if (item === "manager") {
            this.success = true;
          }
        });
      }
    },
  }
</script>

<style scoped>

</style>