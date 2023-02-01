<template>
  <v-navigation-drawer v-model="drawer" class="d-lg-none elevation-0" width="100%" app>
    <div class="icon d-flex align-center px-5 py-3">
      <img src="../../static/asset/main/logo.svg" alt="logo">
      <v-spacer></v-spacer>
      <v-icon  @click="$emit('openNav', !drawer)" large>mdi-close</v-icon>
    </div>
    <v-divider></v-divider>
    <v-list v-for="dropdown in dropdowns" :key="dropdown.value">
      <v-list-item @click="subMenus = dropdown" class="px-5">
        <v-list-item-content>
          <v-list-item-title class="text-h6">{{dropdown.name}} <v-icon>mdi-chevron-right</v-icon></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
    </v-list>
    <template>
      <v-navigation-drawer :value="subMenus" absolute width="100%">
        <v-subheader class="pl-5" @click="subMenus = null"><v-icon>mdi-chevron-left</v-icon> {{subMenus?.name}}</v-subheader>
        <v-list class="px-9">
          <v-list-item-content>
            <v-list-item-title v-for="item in subMenus?.items" :key="item?.text">{{item?.text}}</v-list-item-title>
          </v-list-item-content>
        </v-list>
      </v-navigation-drawer>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'v-mobile-navigation',
  props: {
    navOpen: {
      type: Boolean,
      required: true
    },
    dropdowns: {
      type: Array,
      required: true
    }
  },
  data() {
   return {
    drawer: this.navOpen,
    subMenus: null
   } 
  },
  watch: {
    navOpen() {
      this.drawer = this.navOpen
    }
  }
}
</script>

<style>

</style>