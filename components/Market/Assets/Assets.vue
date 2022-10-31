<template>
  <v-card class="ma-2 mt-3 pa-0" elevation="0" rounded="lg">
    <v-card-title>
      <v-row no-gutters>
        <v-col cols="12" md="4">
          <div class="mt-1">Assets</div>
        </v-col>
        <v-col cols="12" md="8">
          <div class="float-right">
            <v-layout fill-height wrap>
              <v-flex mx-1>
                <v-btn @click="all" class="text-capitalize" height="40" color="grey darken-1" outlined elevation="0">Expand All</v-btn>
              </v-flex>
              <v-flex mx-1>
                <v-btn @click="none" class="text-capitalize" height="40" color="grey darken-1" outlined elevation="0">Collapse All</v-btn>
              </v-flex>
            </v-layout>
          </div>
        </v-col>
      </v-row>
    </v-card-title>
    <v-divider />
    <v-card-text>
      <v-row no-gutters>
        <v-col cols="12" md="6">
          <v-expansion-panels v-model="panel" :multiple="multiple" flat accordion>
            <v-expansion-panel v-for="(item,i) in assets" :key="i" class="panel-content-bottom" @click="getInformation(item)">
              <v-expansion-panel-header hide-actions class="px-0">
                <template v-slot:default="{ open }">
                  <div>
                    <v-icon><template v-if="open">mdi-chevron-up</template><template v-else>mdi-chevron-down</template></v-icon>
                    <v-avatar size="25">
                      <v-img lazy-src="https://picsum.photos/id/11/10/6" :src="`https://test.finerymarkets.com/icons/${item.name.toLowerCase()}.svg`" :alt="item.name" />
                    </v-avatar>
                    <span>
                      {{ item.name }}
                    </span>
                  </div>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content class="panel-content-top">
                <div class="mt-3">
                  FM-Test-MM(87)
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
        <v-col cols="12" md="6" :class="($vuetify.theme.dark ? 'grey darken-4' : 'grey lighten-4') + ' rounded-lg'">
          <div class="mt-1 pa-3">
            <template v-if="Object.keys(information).length">
              <div class="mb-3">
                <v-avatar size="25">
                  <v-img lazy-src="https://picsum.photos/id/11/10/6" :src="`https://test.finerymarkets.com/icons/${information.name.toLowerCase()}.svg`" :alt="information.name" />
                </v-avatar>
                <span>
                  {{ information.name }}
                </span>
              </div>
              <v-divider />
              <v-simple-table :class="($vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-5') + ' mt-3'">
                <tbody>
                  <tr v-if="information.price">
                    <td>Current price, $</td>
                    <td>{{ information.price }}</td>
                  </tr>
                  <tr v-if="information.size">
                    <td>Balance step</td>
                    <td>{{ information.size }}</td>
                  </tr>
                </tbody>
              </v-simple-table>
            </template>
            <template v-else>
              <div class="text-center">
                <div class="display-1">Asset details</div>
                <div>To view detailed information, select an asset from the list on the left</div>
              </div>
            </template>
          </div>
        </v-col>
      </v-row>
    </v-card-text>

  </v-card>
</template>

<script>

  export default  {
    data() {
      return {
        multiple: false,
        panel: [],
        assets: [],
        information: {}
      }
    },
    mounted() {
      this.getInstruments();
    },
    methods: {
      // Create an array the length of our items.
      // with all values as true.
      all () {
        this.multiple = true;
        this.panel = this.assets.map((k, i) => i);
      },
      // Reset the panel.
      none () {
        this.multiple = false;
        this.panel = [];
      },
      getInformation(data) {
        this.information.price = data.price ?? 0;
        this.information.size = data.size ?? 0;
        this.information.name = data.name ?? "unknown";
      },
      async getInstruments() {
        await this.$axios.$post(this.$api.market.getInstruments).then((response) => {
          if (response.fields !== undefined) {
            this.assets = response.fields.currencies ?? [];
          }
        });
      }
    }
  }

</script>

<style lang="scss" scoped>

  .theme--light .panel-content-bottom {
    border-bottom: 1px solid #faf7f7;
  }
  .theme--dark .panel-content-bottom {
    border-bottom: 1px solid #2a2a2a;
  }
  .panel-content-bottom:last-child { border-bottom: none;  }
  .theme--light .panel-content-top {
    border-top: 1px solid #faf7f7;
  }
  .theme--dark .panel-content-top {
    border-top: 1px solid #2a2a2a;
  }

</style>