<template>
  <v-app>

    <!-- Start: app bar -->
    <v-app-bar fixed elevate-on-scroll scroll-target="#scrolling-techniques" style="z-index: 6;" app>
      <v-toolbar-title>
        <b class="mx-2">
          <nuxt-link :class="($vuetify.theme.dark ? 'white' : 'black') + '--text text-decoration-none'" to="/">
            <svg class="mt-2" width="60" height="40" viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M29.9983 0C28.7156 0 27.471 0.173205 26.2899 0.515174C21.3749 1.89193 17.5056 5.95115 16.1932 11.1073C15.8673 12.3464 15.7021 13.6521 15.7021 14.9978C15.7021 20.5448 18.5766 25.3945 22.8439 27.9837C21.6162 25.7765 20.9177 23.2095 20.9177 20.4737C20.9177 19.9319 20.9431 19.3945 21.0024 18.8705C21.7051 11.8712 27.0096 6.30644 33.6814 5.56921C34.1809 5.50703 34.6932 5.48038 35.2097 5.48038C37.8174 5.48038 40.2643 6.21317 42.3683 7.50111C39.9087 3.01554 35.2859 0 29.9983 0Z" fill="#045599"/>
              <path d="M43.8076 11.1073C42.6773 15.5485 39.6462 19.1769 35.688 20.9756C33.9438 21.775 32.0219 22.2147 29.9983 22.2147C26.5904 22.2147 23.4577 20.9623 21.0065 18.866C20.9473 19.3901 20.9219 19.9275 20.9219 20.4693C20.9219 23.205 21.6204 25.772 22.8481 27.9793C23.9191 28.6366 25.0706 29.1429 26.2941 29.4848C27.4752 29.8268 28.7198 30 30.0025 30C37.9021 30 44.303 23.2805 44.303 14.9978C44.2987 13.6521 44.1336 12.3464 43.8076 11.1073Z" fill="#4478BB"/>
              <path d="M43.8076 11.1073C42.6773 15.5485 39.6462 19.1769 35.6879 20.9756C36.4542 19.1458 36.8733 17.1207 36.8733 14.9978C36.8733 11.4227 35.6795 8.14064 33.6855 5.56478C34.1851 5.5026 34.6973 5.47595 35.2138 5.47595C37.8216 5.47595 40.2685 6.20874 42.3725 7.49668C43.0033 8.61585 43.4859 9.82828 43.8076 11.1073Z" fill="#F48020"/>
              <path d="M11.8493 15.0022C11.8493 11.3072 12.8568 7.85641 14.5925 4.93857C7.45925 8.77573 2.70091 13.9586 0 17.4449C1.70183 19.9141 4.66944 23.547 9.30502 26.3716C12.4462 28.2857 15.6763 29.4049 18.8217 29.9956C14.5798 26.5093 11.8493 21.091 11.8493 15.0022Z" fill="#02519E"/>
              <path d="M60.0004 12.5551C58.2986 10.0859 55.331 6.453 50.6954 3.63286C47.5542 1.71873 44.3241 0.599554 41.1787 0.00888062C45.4206 3.49519 48.1511 8.91339 48.1511 15.0022C48.1511 18.6973 47.1436 22.148 45.4079 25.0659C52.5412 21.2287 57.2995 16.0414 60.0004 12.5551Z" fill="#F48020"/>
            </svg>
          </nuxt-link>
        </b>
      </v-toolbar-title>
      <v-divider class="mx-4" inset vertical />
      <template v-if="$route.name === 'market-name-symbol'">
        <v-text-field style="max-width: 250px;" label="Search asset..." placeholder="Select pairs" outlined hide-details dense></v-text-field>
        <v-divider class="mx-4" inset vertical />
        <v-btn :to="`/market/${item.text.toLowerCase()}`" v-for="(item, index) in currencies" :key="index" large elevation="0" :color="($route.params.name ? $route.params.name.toUpperCase() === item.text ? 'amber darken-1 white--text' : 'dark--text' : '') + ' text-capitalize mr-1'">
          {{ item.text }}
          <svg class="arrows" :class="{arrows_active: $route.params.name ? $route.params.name.toUpperCase() === item.text : false}" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.7 7.03333L12 10.3333L8.7 13.6333L7.75733 12.6907L9.448 10.9993L0.666667 11V9.66667H9.448L7.75733 7.976L8.7 7.03333ZM3.3 0.366669L4.24267 1.30934L2.552 3H11.3333V4.33333H2.552L4.24267 6.024L3.3 6.96667L0 3.66667L3.3 0.366669Z" fill="#fff"/>
          </svg>
        </v-btn>
      </template>
      <v-spacer />
      <v-btn @click.stop="drawer = !drawer" :color="$vuetify.theme.dark ? '' : 'blue lighten-4'" elevation="0" icon>
        <v-icon :color="$vuetify.theme.dark ? '' : 'grey darken-1'">
          mdi-menu
        </v-icon>
      </v-btn>
      <v-divider class="mx-4" inset vertical />
      <v-component-language />
      <v-divider class="mx-4" inset vertical />
      <v-component-theme />
    </v-app-bar>
    <!-- End: app bar -->

    <!-- Start: container -->
    <v-main id="scrolling-techniques" style="height: 100px;padding: 65px 0 0;" class="overflow-y-auto">
      <Nuxt />
      <v-component-footer />
    </v-main>
    <v-component-snackbar />
    <!-- Start: container -->

    <!-- Start: menu drawer -->
    <v-navigation-drawer v-model="drawer" absolute temporary width="300">
      <v-list dense>
        <v-list-item v-for="item in menu" :key="item.title" link :to="item.href">
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- End: menu drawer -->

  </v-app>
</template>

<script>

  import Theme from '@/components/Theme';
  import Language from '@/components/Language';
  import Snackbar from '@/components/Snackbar';
  import Footer from '@/components/Footer';

  export default {
    components: {
      'v-component-theme': Theme,
      'v-component-language': Language,
      'v-component-snackbar': Snackbar,
      'v-component-footer': Footer
    },
    data() {
      return {
        drawer: null,
        currencies: [
          {text: 'BTC'},
          {text: 'ETH'},
          {text: 'USDC'},
          {text: 'USDT'},
          {text: 'USD'},
          {text: 'EUR'},
        ],
        menu: [
          {title: 'Trading', href: '/market/btc'},
          {title: 'Positions', href: '/market/positions'},
          {title: 'Limits', href: '/market/limits'},
          {title: 'Assets', href: '/market/market-assets'},
          {title: 'Requests', href: '/market/requests'},
          {title: 'Transactions', href: '/market/transactions'},
          {title: 'Trades History', href: '/market/trades'},
        ]
      }
    }
  }

</script>

<style scoped>
</style>