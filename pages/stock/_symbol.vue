<template>
  <div>
    <v-card-text>
      <v-row v-if="items.length" align="center">
        <v-col cols="12" md="3">
          <v-card height="80" outlined rounded="lg">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="text-h5">
                  {{ items[0].symbol.toUpperCase() }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ items[0].name }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card height="80" outlined rounded="lg">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="text-h5">
                  {{ $vuetify.lang.t('$vuetify.lang_56') }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ $decimal.format(items[0].balance, 8) }} {{ items[0].symbol.toUpperCase() }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon class="mt-2" v-if="items[0].type === 'BROKER' && !items[0].tag" @click="dialog = true;">mdi-cog</v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card height="80" outlined rounded="lg">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="text-h5">
                  {{ $vuetify.lang.t('$vuetify.lang_94') }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{  $decimal.format(items[0].volume, 8) }} {{ items[0].symbol.toUpperCase() }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card height="80" outlined rounded="lg">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="text-h5">
                  {{ $vuetify.lang.t('$vuetify.lang_81') }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  <template v-if="items[0].status">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon v-bind="attrs" v-on="on">
                          mdi-checkbox-marked-circle-outline
                        </v-icon>
                      </template>
                      <span>{{ $vuetify.lang.t('$vuetify.lang_95') }}</span>
                    </v-tooltip>
                  </template>
                  <template v-else>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon v-bind="attrs" v-on="on">
                          mdi-alert-circle-outline
                        </v-icon>
                      </template>
                      <span>{{ $vuetify.lang.t('$vuetify.lang_96') }}</span>
                    </v-tooltip>
                  </template>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>

      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title>
            Прописать количество ценных бумаг
          </v-card-title>
          <v-divider class="mb-5" />
          <v-card-text>
            <v-text-field color="primary" label="Количество активов" outlined hide-details />
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">
              I accept
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-text>

    <v-divider />

    <template v-if="items[0]?.agent_status === 'ACCESS'">

      <!-- [ { "id": "2", "name": "Tesla Inc", "symbol": "tsla", "status": true, "type": "BROKER", "agent_status": "ACCESS" } ] -->

      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-card class="mb-4" elevation="0" outlined>
              <v-card-title class="text-uppercase">
                Вывод активов
              </v-card-title>
              <v-divider />
              <v-card-subtitle>
                <template v-if="items[0]?.type === 'BROKER'">
                  Введите количество активов, которые вы хотите вывести. Ваш вывод не требует подтверждения в разделе "Запросы на вывод". Статус будет автоматически изменен с "PENDING" на "FILLED".
                </template>
                <template v-else>
                  Введите количество активов, которые вы хотите вывести. После того, как ваша заявка будет рассмотрена брокером, актив будет выведен.
                </template>
              </v-card-subtitle>
              <v-card-text>
                <v-text-field color="primary" label="Количество активов" outlined hide-details />
              </v-card-text>
              <v-divider />
              <v-card-actions>
                <v-btn color="black--text yellow darken-1 text-capitalize" large block elevation="0">Вывести</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>

    </template>
    <template v-else-if="items[0]?.agent_status === 'BLOCKED'">
      <v-card-text>
        <v-layout fill-height wrap>
          <v-flex/>
          <v-flex align-self-center class="text-center my-16" md4 mx5 sm6 xl3>
            <v-img class="ma-auto" width="250" src="/asset/6.png" />
            <div class="mt-4">Ваш торговый счет был заблокирован вашим брокером. Пожалуйста, свяжитесь со своим брокером, чтобы получить информацию о причинах блокировки вашего торгового счета.</div>
          </v-flex>
          <v-flex/>
        </v-layout>
      </v-card-text>
    </template>
    <template v-else>
      <v-layout fill-height wrap>
        <v-flex/>
        <v-flex align-self-center class="text-center my-16" md4 mx5 sm6 xl3>
          <v-img class="ma-auto" width="250" src="/asset/6.png" />
          <div class="mt-4">Вам пока что недоступно вводить или выводить акции, а бо национальную валюту.</div>
        </v-flex>
        <v-flex/>
      </v-layout>
    </template>

    <v-overlay absolute :color="$vuetify.theme.dark ? 'grey darken-4' : 'white'" opacity="0.8" :value="overlay">
      <v-progress-circular color="yellow darken-3" indeterminate size="50" />
    </v-overlay>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        overlay: true,
        dialog: false,
        items: []
      }
    },
    watch: {
      $route() {
        this.getAsset();
      }
    },
    mounted() {
      this.getAsset();
    },
    methods: {
      getAsset() {
        this.overlay = true;
        this.$axios.$post(this.$api.stock.getAsset, {
          symbol: this.$route.params.symbol,
        }).then((response) => {
          this.items = response.fields ?? [];
          this.overlay = false;
        });
      }
    }
  }
</script>

<style scoped>

</style>