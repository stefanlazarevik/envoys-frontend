<template>
  <div class="px-3 mt-3">

    <v-row align="center">
      <v-col cols="12" md="12">

        <v-card height="80" outlined rounded="lg">

          <!-- Start: icon crypto -->
          <v-list>
              <v-list-item>
                <v-list-item-avatar>
                  <v-avatar color="indigo">
                    <template v-if="market.icon">
                      <v-img :src="image" />
                    </template>
                    <template v-else>
                      <span class="white--text text-h5">{{ market.symbol }}</span>
                    </template>
                  </v-avatar>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ market.symbol ? market.symbol.toUpperCase() : "Market symbol" }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ market.name ? market.name : "Market name" }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
          </v-list>
          <!-- End: icon crypto -->

        </v-card>

      </v-col>
    </v-row>

    <v-divider class="my-4" />

    <!-- Start: market info form -->
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field v-model="market.name" color="primary" :label="$vuetify.lang.t('$vuetify.lang_188')" outlined></v-text-field>
        <v-text-field v-model="market.code" color="primary" label="Code" outlined></v-text-field>
        <v-text-field v-model="market.price_buy" color="primary" label="Price buy" outlined></v-text-field>
        <v-select v-model="market.exchange" :items="$stock.exchange" item-text="name" item-value="type" label="Exchange" outlined></v-select>
        <v-select v-model="market.method" :items="$stock.method" item-text="name" item-value="type" label="Method" outlined></v-select>
        <v-card outlined>
          <v-card-title>
            Start trade
          </v-card-title>
          <v-divider />
          <v-card-text>
            <v-time-picker
                v-model="market.start_at"
                format="24hr"
                header-color="green"
                scrollable
                full-width
                use-seconds
            ></v-time-picker>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field v-model="market.symbol" color="primary" :label="$vuetify.lang.t('$vuetify.lang_187')" outlined></v-text-field>
        <v-text-field v-model="market.address" color="primary" label="Address" outlined></v-text-field>
        <v-text-field v-model="market.price_sell" color="primary" label="Price sell" outlined></v-text-field>
        <v-select v-model="market.status" :items="status" item-text="name" item-value="value" label="Status" outlined></v-select>
        <v-select v-model="market.kind" :items="$stock.kind" item-text="name" item-value="type" label="Kind" outlined></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <v-select v-model="market.sector" @change="getChange" :items="sectors" item-text="name" item-value="name" label="Sector" outlined></v-select>
        <v-text-field v-model="market.unit" label="Unit symbol - (currency)" outlined></v-text-field>
        <v-text-field v-model="market.price_market" color="primary" label="Price market" outlined></v-text-field>
        <v-text-field v-model="market.qty_shares" color="primary" label="Qty. shares" outlined></v-text-field>
        <v-select v-model="market.type" :items="$stock.type" item-text="name" item-value="type" label="Type" outlined></v-select>
        <v-card outlined>
          <v-card-title>
            End trade
          </v-card-title>
          <v-divider />
          <v-card-text>
            <v-time-picker
                v-model="market.stop_at"
                format="24hr"
                header-color="red"
                scrollable
                full-width
                use-seconds
            ></v-time-picker>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- End: market info form -->

    <v-divider class="my-4" />

    <v-file-input counter chips show-size truncate-length="34" outlined @change="onChange" />

    <template v-if="$route.params.symbol === 'create'">
      <v-btn v-if="image" block color="black--text yellow darken-1 text-capitalize mb-3" elevation="0" large @click="setMarket">{{ $vuetify.lang.t('$vuetify.lang_299') }}</v-btn>
    </template>
    <template v-else>
      <v-btn block color="white--text red darken-1 text-capitalize mb-3" elevation="0" large @click="setMarket">Update information market</v-btn>
    </template>

  </div>
</template>

<script>

  export default {
    data() {
      return {
        status: [
          { value: false, name: "OFF" },
          { value: true, name: "ON" },
        ],
        sectors: [],
        market: {
          name: "",
          symbol: "",
          unit: "",
          code: "",
          address: "",
          start_at: "00:00:00",
          stop_at: "00:00:00",
          qty_shares: 0,
          price_buy: 0,
          price_sell: 0,
          price_market: 0,
          sector: "",
          exchange: "E_DIGITAL",
          method: "M_COUNTER_BIDDING",
          kind: "K_SECURITIES",
          type: "T_ORDINARY_SHARES",
          status: false,
          icon: false
        },
        image: "",
      }
    },
    mounted() {
      this.getMarket();
      this.getSectors();
    },
    methods: {

      /**
       *
       */
      getChange() {
        this.market.unit = this.sectors.find((item) => item.name === this.market.sector).symbol
      },

      /**
       *
       */
      getSectors() {
        this.$axios.$post(this.$api.admin.stock.getSectors, {
          limit: 50
        }).then((response) => {
          this.sectors = response.fields ?? [];
        });
      },

      /**
       *
       */
      getMarket() {
        this.$axios.$post(this.$api.admin.stock.getMarket, {
          symbol: (this.$route.params.symbol !== "create" ? this.$route.params.symbol : "")
        }).then((response) => {
          if (response.fields) {
            this.market = Object.assign(this.market, response.fields[0]);
            this.image = this.$storages(['icon'], 'stock-' + this.market.symbol);
          }
        });
      },

      /**
       *
       */
      setMarket() {
        this.$axios.$post(this.$api.admin.stock.setMarket, {
          symbol: (this.$route.params.symbol !== "create" ? this.$route.params.symbol : ""),
          image: this.image.split(',')[1],
          market: this.market
        }).then(() => {
          return this.$router.push('/admin/stock/markets');
        }).catch((error) => {
          this.$snackbar.open({
            content: `${error.response.data.code}: ${error.response.data.message}`,
            color: 'red darken-2'
          });
        });
      },

      /**
       * @param file
       */
      setImage(file) {
        const reader = new FileReader();
        reader.onload = e => {
          this.image = e.target.result;
          this.market.icon = true;
        };
        reader.readAsDataURL(file);
      },

      /**
       * @param file
       */
      onChange(file) {
        if (!file) {
          this.image = "";
          return;
        }
        this.setImage(file);
      }
    }
  }
</script>

<style scoped>

</style>