<template>
  <div class="mt-16">
    <v-container style="max-width: 1262px;">
      <div>
        <div class="text-h5 mb-5 font-weight-bold">About Us</div>
        <div
            class="text-md-h3 text-sm-h4 text-h5 mb-15 font-weight-bold blue--text text--darken-2 text-uppercase"
            style="max-width: 1140px"
        >
          Our team has been working on the universal exchange project for more than 3 years
        </div>
      </div>
      <div class="d-flex justify-space-between align-start flex-column flex-md-row white--text mb-15">
        <v-row no-gutters class="mb-10 mb-md-0">
          <v-col
              cols="12"
              style="max-width: 260px"
              sm="6"
              v-for="(card, index) in cards"
              :key="index"
          >
            <v-card
                min-height="130px"
                :color="!($vuetify.theme.dark) && 'grey lighten-4'"
                class="py-3 px-5 rounded mr-2 mb-2 width-100"
                elevation="0"
            >
              <div class="text-h4 mb-1 font-weight-bold">{{ card.year }}</div>
              <v-card-text class="pa-0" style="max-width: 180px">{{ card.text }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <div>
          <div
              :class="'text-body-1 mb-5 ' + ($vuetify.theme.dark ? 'white--text' : 'black--text')"
              style="max-width: 700px;"
          >
            Our team has been working on the universal
            exchange project for more than 3 years and consists of specialists who have worked both with blockchain
            projects and worked in senior positions
            in the stock exchange, legal regulators and provided consulting services to companies from various industries,
            in particular in the mining sector. Our experience has given us an understanding of,
            what problems are faced by business, investors and traders
            and we know what is required for each of the parties and how to solve these issues. Our project intends to
            change the world of finance by making all processes more efficient and transparent by working
            in the legal field of the countries in which we operate.
            At the same time, we strive to create a unique platform that transforms the implementation of the activities
            of the main
            financial markets in the blockchain.
          </div>
          <div class="d-flex align-center">
            <a
                href="#"
                style="text-transform: uppercase; text-decoration: none;"
                class="font-weight-bold orange--text text--darken-1"
            >
              read documents
            </a>
            <v-icon color="orange">mdi-arrow-top-right</v-icon>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'v-about-us',
  data() {
    return {
      cards: [
        {year: 2019, text: 'Obtaining licenses for depository activities'},
        {year: 2020, text: 'September 2021 - launch and testing platform'},
        {year: 2021, text: 'State registration'},
        {year: 2022, text: 'Launched all services'},
      ]
    }
  }
}
</script>

<style scoped>

</style>