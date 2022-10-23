<template>
  <v-menu v-show="$auth.loggedIn" max-width="300" offset-x offset-y bottom center content-class="mt-5 elevation-1" transition="slide-y-transition">
    <template v-slot:activator="{ on, attrs }">
      <v-btn :color="$vuetify.theme.dark ? '' : 'blue lighten-4'" elevation="0" icon v-bind="attrs" v-on="on">
        <v-icon :color="$vuetify.theme.dark ? '' : 'grey darken-1'">
          mdi-account-circle-outline
        </v-icon>
      </v-btn>
    </template>
    <v-card>
      <template v-if="$auth.loggedIn">
        <v-list :color="$vuetify.theme.dark ? 'grey darken-4' : 'deep-purple lighten-5'">
          <v-list-item :color="$vuetify.theme.dark ? '' : 'deep-purple lighten-4'">
            <v-list-item-content>
              <v-list-item-title :class="$vuetify.theme.dark ? 'ml-2' : 'ml-2 brown--text'">{{ $auth.$state.user.name }}</v-list-item-title>
              <v-list-item-subtitle :class="$vuetify.theme.dark ? 'ml-2' : 'ml-2 grey--text'">{{ $auth.$state.user.email }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
      <v-list :color="$vuetify.theme.dark ? 'grey darken-3' : ''">
        <v-list-item :color="$vuetify.theme.dark ? '' : 'deep-purple lighten-4'" v-for="(item, index) in items" :key="index" :to="item.to" nuxt>
          <v-icon :color="$vuetify.theme.dark ? '' : 'grey darken-2'" size="30">
            {{ item.icon }}
          </v-icon>
          <v-list-item-title :class="$vuetify.theme.dark ? 'ml-2' : 'ml-2 brown--text'">{{ $vuetify.lang.t(`$vuetify.${item.title}`) }}</v-list-item-title>
        </v-list-item>
        <v-list-item :color="$vuetify.theme.dark ? '' : 'deep-purple lighten-4'" @click="this.setLogout" link>
          <v-icon :color="$vuetify.theme.dark ? '' : 'grey darken-2'" size="30">
            mdi-alpha-l-circle-outline
          </v-icon>
          <v-list-item-title :class="$vuetify.theme.dark ? 'ml-2' : 'ml-2 brown--text'">{{ $vuetify.lang.t('$vuetify.lang_8') }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
  export default {
    name: "v-component-menu-private",
    data() {
      return {
        items: [
          {icon: 'mdi-alpha-a-circle-outline', title: 'lang_79', to: '/assets'},
          {icon: 'mdi-alpha-o-circle-outline', title: 'lang_126', to: '/orders/all'},
          {icon: 'mdi-alpha-c-circle-outline', title: 'lang_146', to: '/account/profile'}
        ],
      }
    },
    methods: {
      setLogout() {
        this.$auth.logout({ data: {refresh: this.$auth.$storage['_state']['_refresh_token.local'], email: this.$auth.$state.user.email}}).then(() => {
          this.$router.push('/');
        });
      }
    }
  }
</script>

<style scoped>

</style>
