<template>
  <v-list dense>
    <v-list-group v-if="hasOwnProperty(item[0])" v-for="(item, i) in Object.entries(navs)" :key="i" :value="i === 0">
      <template v-slot:activator>
        <v-list-item-icon class="mr-3">
          <v-icon>mdi-contain</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="text-uppercase mr-2">{{ item[0] }}</v-list-item-title>
      </template>
      <v-list-item v-show="nav.display" v-for="(nav, i) in item[1]" :key="i" :to="`/admin/${item[0]}/${nav.to}`" exact link>
        <v-list-item-title>{{ $vuetify.lang.t(nav.title) }}</v-list-item-title>
        <v-list-item-icon>
          <v-icon v-text="nav.icon"></v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list-group>
  </v-list>
</template>

<script>
  export default {
    name: "v-component-menu-admin",
    data() {
      return {
        navs: {
          default: [
            {
              title: '$vuetify.lang_181',
              icon: "mdi-account-circle-outline",
              display: false,
              to: 'accounts'
            }/**, {
              title: '$vuetify.lang_185',
              icon: "mdi-page-next-outline",
              display: false,
              to: 'news'
            }, {
              title: '$vuetify.lang_266',
              icon: "mdi-presentation-play",
              display: false,
              to: 'advertising'
            }, {
              title: '$vuetify.lang_186',
              icon: "mdi-robot-excited-outline",
              display: false,
              to: 'support'
            }**/
          ],
          spot: [
            {
              title: '$vuetify.lang_178',
              icon: "mdi-priority-high",
              display: false,
              to: 'currencies'
            }, {
              title: '$vuetify.lang_179',
              icon: "mdi-upload-network-outline",
              display: false,
              to: 'chains'
            }, {
              title: '$vuetify.lang_180',
              icon: "mdi-arrange-send-to-back",
              display: false,
              to: 'pairs'
            }, {
              title: '$vuetify.lang_182',
              icon: "mdi-ballot-recount-outline",
              display: false,
              to: 'contracts'
            }/**, {
              title: '$vuetify.lang_83',
              icon: "mdi-package-variant-closed-plus",
              display: false,
              to: 'listing'
            }**/],
          stock: [
            {
              title: '$vuetify.lang_300',
              icon: "mdi-map-outline",
              display: false,
              to: 'sectors'
            },
            {
              title: '$vuetify.lang_298',
              icon: "mdi-briefcase-variant-outline",
              display: false,
              to: 'markets'
            },
            {
              title: '$vuetify.lang_302',
              icon: "mdi-account-tie-outline",
              display: false,
              to: 'depositaries'
            },
            {
              title: '$vuetify.lang_306',
              icon: "mdi-account-edit-outline",
              display: false,
              to: 'registrars'
            }
          ]
        }
      }
    },
    mounted() {
      this.rules();
    },
    methods: {
      rules() {
        Object.entries(this.$auth.user.rules).map((item) => {
          for (let i = 0; i < this.navs[item[0]].length; i++) {
            if (item[1].indexOf(this.navs[item[0]][i].to) > -1) {
              this.navs[item[0]][i].display = true;
            }
          }
        });
      },
      hasOwnProperty(name) {
        return this.$auth.user.rules.hasOwnProperty(name)
      }
    }
  }
</script>

<style scoped>

</style>