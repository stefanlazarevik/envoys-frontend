<template>
  <div>

    <!-- Start: app bar element -->
    <v-app-bar color="transparent" height="50" flat>
      <v-tabs fixed-tabs v-model="eyelet">
        <v-tab>
          Ценные бумаги
        </v-tab>
        <v-tab>
          Нац. Валюта
        </v-tab>
      </v-tabs>
    </v-app-bar>
    <!-- End: app bar element -->

    <v-divider />

    <v-hover v-slot="{ hover }">
      <v-virtual-scroll :class="hover ? '' : 'overflow-y-hidden'" :items="items" bench="0" height="300" item-height="50">
        <template v-slot:default="{ item }">
        <v-list-item :color="$vuetify.theme.dark ? 'grey darken-3' : 'deep-purple lighten-5'" :to="`/stock/${item.symbol}`" exact link>
          <v-list-item-action>
            <template v-if="item.zone">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-chip v-bind="attrs" v-on="on" class="ml-0 mr-2 black--text text-uppercase d-block text-center chip-w" label small>
                    {{ item.symbol }}
                  </v-chip>
                </template>
                <span>{{ item.name }} - {{ item.price }} <b>{{ (item.zone).toUpperCase() }}</b></span>
              </v-tooltip>
            </template>
            <template v-else>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-chip v-bind="attrs" v-on="on" class="ml-0 mr-2 black--text text-uppercase" label small>
                    {{ item.symbol }}
                  </v-chip>
                </template>
                <span>{{ item.name }}</span>
              </v-tooltip>
            </template>
          </v-list-item-action>
          <v-list-item-content />
          <v-list-item-action class="d-block text-right teal--text text--darken-3">
            {{ item.balance ?? 0 }}
          </v-list-item-action>
        </v-list-item>
        </template>
      </v-virtual-scroll>
    </v-hover>
  </div>
</template>

<script>
  export default {
    name: "v-component-stock-assets",
    data() {
      return {
        items: [],
        eyelet: 0,
        type: false,
      }
    },
    watch: {
      eyelet(e) {
        this.type = e === 1;

        this.getAssets(false);
      }
    },
    mounted() {
      this.getAssets(false);
    },
    methods: {
      getAssets(go) {
        this.$axios.$post(this.$api.stock.getAssets, {fiat: this.type}).then((response) => {
          this.items = response.fields ?? [];

          if (go) {
            this.$router.push('/stock/' + this.items[0].symbol + '?type=trade');
          }
        });
      },
    }
  }
</script>

<style scoped>

  .chip-w {
    width: 80px !important;
  }

</style>