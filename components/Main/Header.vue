<template>
  <v-app-bar elevation="0" app color="white">
    <v-container class="px-0 d-flex align-center" style="max-width: 1634px">
      <div class="icon d-flex align-center mr-lg-16 mr-sm-10 mr-5">
        <img src="../../static/asset/main/logo.svg" alt="logo">
      </div>
      <div class="d-none d-lg-flex align-items">
        <div class="mr-8">Главная</div>
        <div class="mr-8" v-for="dropdown in dropdowns" :key="dropdown.value">
          <v-menu content-class="elevation-1" open-on-hover offset-y>
            <template v-slot:activator="{ on, attrs }">
              <div v-on="on" v-bind="attrs" class="d-flex"><span>{{dropdown.name}}</span> <v-icon>mdi-chevron-down</v-icon>
              </div>
            </template>
            <v-list>
              <v-list-item v-for="item in dropdown.items" :key="item.text">
                <v-list-item-title>{{item.text}}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
      <v-spacer></v-spacer>
      <v-btn elevation="0" color="#F48020" class="white--text d-none d-sm-block">Register now</v-btn>
      <v-app-bar-nav-icon class="d-sm-block d-lg-none ml-sm-10 ml-2" @click="$emit('openNav', !navIsOpen)"></v-app-bar-nav-icon>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: 'v-header',
  props: {
    navIsOpen: {
      type: Boolean,
      required: true
    },
    dropdowns: {
      type: Array,
      required: true
    }
  },
}
</script>

<style scoped>
</style>