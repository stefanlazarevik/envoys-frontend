<template>
  <v-card class="ma-1" height="500" elevation="0">

    <!-- Start: app bar element -->
    <v-app-bar color="transparent" height="50" flat>
      <v-tabs v-model="eyelet">
        <v-tab @click="market.sector = item.name" v-for="item in sector.items" :key="item.id">
          {{ item.name }}
        </v-tab>
      </v-tabs>

      <v-spacer />

      <v-text-field v-model="market.search" dense hide-details outlined label="Search">
        <template v-slot:append>
          <v-icon>mdi mdi-magnify</v-icon>
        </template>
      </v-text-field>

    </v-app-bar>
    <!-- End: app bar element -->

    <v-divider />

    <v-card-actions v-if="!header">
      <v-item-group class="my-1" v-model="market.kind">
        <v-item v-slot="{ active, toggle }">
          <v-chip filter outlined label :input-value="active" @click="toggle">
            Ценные бумаги
          </v-chip>
        </v-item>
        <v-item v-slot="{ active, toggle }">
          <v-chip filter outlined label :input-value="active" @click="toggle">
            Фонды
          </v-chip>
        </v-item>
        <v-item v-slot="{ active, toggle }">
          <v-chip filter outlined label :input-value="active" @click="toggle">
            Облигации
          </v-chip>
        </v-item>
      </v-item-group>
    </v-card-actions>

    <v-divider v-if="!header" />

    <template v-if="markets.sectors().length">

      <!-- Start: data table -->
      <v-simple-table>
        <template v-slot:default>
          <thead v-if="header" style="height: 57px">
          <tr>
            <th class="text-left">
              Логотип
            </th>
            <th class="text-left">
              Наименование
            </th>
            <th class="text-left">
              Тикет
            </th>
            <th class="text-left">
              Покупка
            </th>
            <th class="text-left">
              Продажа
            </th>
            <th class="text-left">
              Рыночная цена
            </th>
            <th class="text-left">
              Время сделки
            </th>
          </tr>
          </thead>
          <tbody @mouseover="header = true" @mouseleave="header = false">
          <tr v-for="item in markets.sectors()" :key="item.id">
            <td>
              <v-avatar size="30">
                <v-img src="https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/UHUMMCFSMZBD5KAPI3RBH2SIPQ.png" />
              </v-avatar>
            </td>
            <td>
              {{ item.name }}
            </td>
            <td>
              {{ item.symbol }}
            </td>
            <td>
              <span class="teal--text">{{ item.brice_buy }}</span>
            </td>
            <td>
              <span class="red--text">{{ item.brice_sell }}</span>
            </td>
            <td>
              {{ item.price_market }}
            </td>
            <td>
              {{ item.transaction_time }}
            </td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
      <!-- End: data table -->

    </template>
    <template v-else-if="!overlay">
      <v-layout style="height: 392px" wrap>
        <v-flex/>
        <v-flex class="text-center mx-5" align-self-center>
          <div>
            <v-icon size="50">
              mdi-database-remove-outline
            </v-icon>
          </div>
          <h4 class="text-overline">There is nothing here yet.</h4>
        </v-flex>
        <v-flex/>
      </v-layout>
    </template>

  </v-card>
</template>

<script>
export default {
  name: "v-component-stock-market",
  data() {
    return {
      header: false,
      overlay: false,
      eyelet: 0,
      market: {
        search: '',
        sector: 'Kyrgyzstan',
        kind: 0,
        items: [],
      },
      sector: {
        items: [],
      },
    }
  },
  watch: {
    kind(e) {
      console.log(e);
    },
    eyelet(e) {
      console.log(e);
    }
  },
  mounted() {
    this.getSectors();
  },
  methods: {
    getSectors() {

      this.sector.items = [
        {id: 1, name: "Kyrgyzstan"},
        {id: 2, name: "America"},
      ];

      this.getMarkets();
    },
    getMarkets() {

      this.market.items = [
        {id: '1', sector: 'Kyrgyzstan', name: 'ОАО Авторемонтный завод', symbol: 'AVTZ', unit: "KGS", brice_buy: 12.655, brice_sell: 13.222, price_market: 13.1, transaction_time: '12.02.2022 14:25:00', kind: 0},
        {id: '2', sector: 'Kyrgyzstan', name: 'ОАО Коммерческий банк Кыргызстан', symbol: 'CBK.02', unit: "KGS", brice_buy: 12.655, brice_sell: 13.222, price_market: 13.1, transaction_time: '12.02.2022 14:25:00', kind: 0},
        {id: '3', sector: 'Kyrgyzstan', name: 'ОАО Электромонтаж', symbol: 'ELMJ', unit: "KGS", brice_buy: 12.655, brice_sell: 13.222, price_market: 13.1, transaction_time: '12.02.2022 14:25:00', kind: 1},
        {id: '4', sector: 'America', name: 'Advanced Micro Devices, Inc.', symbol: 'AMD.US', unit: "USD", brice_buy: 76.84, brice_sell: 75.66, price_market: 76.12, transaction_time: '12.02.2022 14:25:00', kind: 0}
      ];

    }
  },
  computed: {
    markets() {
      return {
        sectors: () => {
          return this.market.items.filter((item) => item.sector === this.market.sector && (this.market.kind === undefined ? true : item.kind === this.market.kind) && (this.market.search ? item.name.toUpperCase().includes(this.market.search.toUpperCase()) || item.symbol.toUpperCase().includes(this.market.search.toUpperCase()) : true));
        }
      }
    },
  }
}
</script>

<style scoped>

</style>