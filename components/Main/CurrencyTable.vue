<template>
  <div class="py-15">
    <v-container style="max-width: 1262px;">
      <div class="d-flex flex-column">
        <div class="text-h6 text-sm-h4 font-weight-bold mb-10 text-uppercase">{{ $vuetify.lang.t("$vuetify.lang_currency_table_1.title_1")}} <span style="color: #F48020;">{{ $vuetify.lang.t("$vuetify.lang_currency_table_1.title_2")}}</span> {{ $vuetify.lang.t("$vuetify.lang_currency_table_1.title_3")}}</div>
        <v-data-table
          :headers="headers"
          :items="items"
          hide-default-footer
          :mobile-breakpoint="0"
        >
          <template v-slot:[`item.name`]="{item}">
            <div class="d-flex">
              <img class="mr-3" :src="item.name.icon" :alt="item.name.code">
              <div class="mr-3 d-none d-sm-block" style="color: #252525;">{{item.name.name}}</div>
              <div class="d-none d-sm-block" style="color: #9C9C9C; text-transform: uppercase;">{{item.name.code}}</div>
            </div>
          </template>
        </v-data-table>
      </div>
    </v-container>
  </div>
</template>

<script>
  export default {
    name: 'v-currency-table',
    data() {
      return {
        items: [
          {
            name: {
              icon: "icon",
              name: 'Bitcoin',
              code: 'BTC'
            },
            price: 1,
            change: 1,
            market: 1,
          },
          {
            name: {
              icon: "icon",
              name: 'Bitcoin',
              code: 'BTC'
            },
            price: 1,
            change: 1,
            market: 1,
          },
          {
            name: {
              icon: "icon",
              name: 'Bitcoin',
              code: 'BTC'
            },
            price: 1,
            change: 1,
            market: 1,
          },
        ]
      }
    },
    computed: {
      headers() {
        return [
          {
            text: this.$vuetify.lang.t('$vuetify.lang_currency_table_2'),
            value: 'name',
            sortable: false,
          },
          {
            text: this.$vuetify.lang.t('$vuetify.lang_currency_table_3'),
            value: 'price',
            sortable: false
          },
          {
            text: this.$vuetify.lang.t('$vuetify.lang_currency_table_4'),
            value: 'change',
            sortable: false
          },
          {
            text: this.$vuetify.lang.t('$vuetify.lang_currency_table_5'),
            value: 'market',
            sortable: false
          }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>

<!-- 89ECEA16-7152-42AA-82BC-2130619BD95C - API-KEY -->
<!-- https://rest.coinapi.io/v1/exchangerate/BTC?apikey=89ECEA16-7152-42AA-82BC-2130619BD95C - request -->