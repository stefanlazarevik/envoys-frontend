<template>
  <section class="pa-0">

    <v-first-screen />
    <v-achievements />
    <v-currency-table />
    <v-exchange-features />
    <v-about-us />
    <v-contacts />
    <v-partners />

    <v-overlay absolute :color="$vuetify.theme.dark ? 'grey darken-4' : 'white'" opacity="1" :value="!loader">
      <v-progress-circular color="yellow darken-3" indeterminate size="100" />
    </v-overlay>
  </section>
</template>

<script>

  import {Hooper, Navigation as HooperNavigation, Slide} from 'hooper';
  import 'hooper/dist/hooper.css';

  import Achievements from '../components/Main/Achievements.vue';
  import Contacts from '../components/Main/Contacts.vue';
  import CurrencyTable from '../components/Main/CurrencyTable.vue';
  import ExchangeFeatures from '../components/Main/ExchangeFeatures.vue';
  import FirstScreen from '../components/Main/FirstScreen.vue';
  import Partners from '../components/Main/Partners.vue';
  import VAboutUs from "../components/Main/AboutUs.vue";

  export default {
    auth: 'guest',
    components: {
      // Hooper,
      // Slide,
      // HooperNavigation
      VAboutUs,
      'v-first-screen': FirstScreen,
      'v-achievements': Achievements,
      'v-currency-table': CurrencyTable,
      'v-exchange-features': ExchangeFeatures,
      'v-contacts': Contacts,
      'v-partners': Partners,
    },
  dropdowns: [
    {
      name: 'Рынки',
      value: 'markets',
      items: [
        { text: 'Test' },
        { text: 'Test 1' },
        { text: 'Test 2' },
      ]
    },
    {
      name: 'Купить крипту',
      value: 'buyCrypto',
      items: [
        { text: 'Test' },
        { text: 'Test 1' },
        { text: 'Test 2' },
      ]
    },
    {
      name: 'Торговля',
      value: 'trading',
      items: [
        { text: 'Test' },
        { text: 'Test 1' },
        { text: 'Test 2' },
      ]
    },
    {
      name: 'Участники ФР',
      value: 'stockExchangeParticipants',
      items: [
        { text: 'Test' },
        { text: 'Test 1' },
        { text: 'Test 2' },
      ]
    },
    {
      name: 'Справочники',
      value: 'references',
      items: [
        { text: 'Test' },
        { text: 'Test 1' },
        { text: 'Test 2' },
      ]
    },
    {
      name: 'Депозитарий',
      value: 'depository',
      items: [
        { text: 'Test' },
        { text: 'Test 1' },
        { text: 'Test 2' },
      ]
    },
  ],
    data() {
      return {
        navIsOpen: false,
        loader: false,
        settings: {
          itemsToShow: 6,
          centerMode: false,
          infiniteScroll: false,
          breakpoints: {
            1500: {
              itemsToShow: 6
            },
            1100: {
              itemsToShow: 3
            },
            0: {
              itemsToShow: 1
            }
          }
        },
        currencies: {
          count: 0,
          items: [],
          more: false
        },
        pairs: []
      }
    },
    mounted() {
      setTimeout(() => {
        if (this.$auth.loggedIn) {
          return this.$router.push('/assets');
        } else {
          this.loader = true;
        }
      }, 1000);
      this.getCurrencies(0);
      this.getPairs();
    },
    methods: {
      openNav(status) {
        this.navIsOpen = status;
      },
      getMore() {
        this.getCurrencies(this.currencies.items[this.currencies.items.length - 1].id)
      },
      getCurrencies(id) {
        this.$axios.$post(this.$api.index.getCurrencies, {id: id}).then((response) => {

          if (!id) {
            this.currencies.items = [];
          }

          if (response.fields !== undefined) {

            this.currencies.count = response.count;
            for (let i = 0; i < response.fields.length; i++) {
              this.currencies.items.push(response.fields[i])
            }

            this.currencies.more = this.currencies.count > this.currencies.items.length;
          }

        });
      },
      getPairs() {
        this.$axios.$post(this.$api.index.getPairs).then((response) => {
          this.pairs = response.fields;
        });
      }
    }
  }

</script>

<style>

  ul.hooper-track {
    padding: 0 !important;
  }

  .hooper-next, .hooper-prev {
    line-height: 50%;
  }

  .timeline-more .v-timeline-item__inner-dot {
    height: 48px;
    width: 48px;
    margin: 2px;
    cursor: pointer;
  }

</style>
