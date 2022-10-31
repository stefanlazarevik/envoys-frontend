<template>
  <v-sheet v-if="pairs.length" class="mt-3 mx-3" rounded>
    <v-slide-group class="pa-0" center-active :show-arrows="true">
      <v-slide-item v-for="(item, index) in pairs" :key="index">
        <v-card :to="`/market/${$route.params.name}/${item.symbol.toLowerCase()}`" width="350" class="card-outline my-3 mx-2" outlined :elevation="0" height="238" rounded>
          <v-card-actions class="mx-2">
            <v-avatar size="25">
              <v-img lazy-src="https://picsum.photos/id/11/10/6" :src="`https://test.finerymarkets.com/icons/${$route.params.name}.svg`" :alt="$route.params.name" />
            </v-avatar>
            <h3 class="ml-3 font-weight-medium">{{ item.base_name }}/{{ item.quote_name }}</h3>
            <v-icon class="mx-3" v-show="$route.params.symbol ? item.symbol === $route.params.symbol.toUpperCase() : false" style="width: 100%;justify-content: right;">
              mdi-check-all
            </v-icon>
          </v-card-actions>
          <v-divider />
          <v-card-text>
            <v-select v-model="market_type" class="input-reset" :items="options" item-text="name" item-value="name" label="Market" flat filled outlined dense hide-details />
            <v-text-field v-model="market_value" class="mt-3 input-reset" placeholder="0.00000000" outlined flat filled dense :label="item.active ? 'Volume' : 'Size'" hide-details>
              <template v-slot:append>
                <div @click="setModel(item.id, item.active)" class="input-model">
                  <span class="my-1 ml-3 mr-1 float-left" style="display: block;">{{ item.active ? item.quote_name : item.base_name }}</span>
                  <v-icon>
                    mdi-reload
                  </v-icon>
                </div>
              </template>
            </v-text-field>
          </v-card-text>
          <v-divider />
          <v-card-actions class="ma-2">
            <v-row>
              <v-col cols="12" sm="6">
                <v-btn block color="green darken-1 white--text" elevation="0">BUY</v-btn>
              </v-col>
              <v-col cols="12" sm="6">
                <v-btn block color="red darken-1 white--text" elevation="0">SELL</v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>

<script>

  export default {
    watch: {
      $route() {
        this.getInstruments();
      }
    },
    data() {
      return {
        pairs: [],
        options: [
          { value: "marketIOC", name: "Market IOC"},
          { value: "marketFOK", name: "Market FOK"},
          { value: "limitIOC", name: "Limit IOC"},
          { value: "limitFOK", name: "Limit FOK"},
        ],
        market_type: 0,
        market_value: ""
      }
    },
    mounted() {
      this.getInstruments();
    },
    methods: {
      async getInstruments() {
        await this.$axios.$post(this.$api.market.getInstruments).then((response) => {
          if (response.fields !== undefined) {
            this.pairs = this.$route.params.name ? response.fields.pairs.filter((item) => (item.base_name === this.$route.params.name.toUpperCase() || item.quote_name === this.$route.params.name.toUpperCase())) : [];
            this.pairs.map((item) => {
              item.active = false;
            });
          }
        });
      },
      setModel(id, active) {
        this.pairs.filter((item) => {
          if (item.id === id) {
            item.active = !active
          }
        });
        this.$forceUpdate();
      }
    }
  }
</script>

<style lang="scss">

  .input-model {
    display: flex;
    cursor: pointer;
    border-left: 1px solid #a5a5a5;
  }

  .card-outline {
    border-bottom: 0 !important;
    border-top: 0 !important;
  }

</style>