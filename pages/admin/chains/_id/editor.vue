<template>
  <div class="px-3 mt-3">

    <!-- Start: chain info form -->
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field v-model="chain.name" color="primary" :label="$vuetify.lang.t('$vuetify.lang_188')" outlined></v-text-field>
        <v-select v-model="chain.platform" :items="$platform.list" item-text="name" item-value="name" :label="$vuetify.lang.t('$vuetify.lang_113')" outlined></v-select>
        <v-select v-model="chain.status" :items="status" item-text="name" item-value="value" :label="$vuetify.lang.t('$vuetify.lang_191')" outlined></v-select>
        <v-text-field v-model="chain.rpc" color="primary" :label="$vuetify.lang.t('$vuetify.lang_219')" outlined></v-text-field>
        <v-select v-model="chain.tag" :items="$tag.list" item-text="name" item-value="name" :label="$vuetify.lang.t('$vuetify.lang_283')" outlined />
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field v-model="chain.explorer_link" color="primary" :label="$vuetify.lang.t('$vuetify.lang_224')" outlined></v-text-field>
        <v-text-field v-model="chain.confirmation" color="primary" :label="$vuetify.lang.t('$vuetify.lang_153')" outlined></v-text-field>
        <v-text-field v-model="chain.time_withdraw" color="primary" :label="$vuetify.lang.t('$vuetify.lang_225')" outlined></v-text-field>
        <v-text-field v-model="chain.rpc_user" color="orange" :label="$vuetify.lang.t('$vuetify.lang_227')" outlined></v-text-field>
        <v-text-field v-if="$platform.get(chain.platform).type === 'CRYPTO'" v-model="chain.address" :label="$vuetify.lang.t('$vuetify.lang_230')" outlined></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field v-model="chain.fees_withdraw" color="primary" :label="$vuetify.lang.t('$vuetify.lang_221')" outlined></v-text-field>
        <v-text-field v-model="chain.network" color="primary" :label="$vuetify.lang.t('$vuetify.lang_112')" outlined></v-text-field>
        <v-text-field v-model="chain.rpc_key" color="orange" :label="$vuetify.lang.t('$vuetify.lang_214')" outlined></v-text-field>
        <v-text-field v-model="chain.rpc_password" color="orange" :label="$vuetify.lang.t('$vuetify.lang_228')" outlined></v-text-field>
        <v-select v-if="$platform.get(chain.platform).type === 'CRYPTO'" v-model="chain.parent_symbol" :items="currencies" item-text="symbol" item-value="symbol" :label="$vuetify.lang.t('$vuetify.lang_286')" outlined>
          <template v-slot:item="{ item, attrs, on }">
            <v-list-item v-bind="attrs" v-on="on">
              <v-list-item-avatar>
                <v-avatar size="30">
                  <v-img :src="$storages(['icon'], item.symbol)" />
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-title>
                <div>{{ (item.symbol).toUpperCase() }}</div>
                <div><small>{{ item.name }}</small></div>
              </v-list-item-title>
            </v-list-item>
          </template>
        </v-select>
      </v-col>
    </v-row>
    <!-- End: chain info form -->

    <v-card class="mb-4" outlined>
      <v-simple-table light>
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left">
              {{ $vuetify.lang.t('$vuetify.lang_242') }}
            </th>
            <th class="text-left">
              {{ $vuetify.lang.t('$vuetify.lang_243') }}
            </th>
            <th class="text-left">
              {{ $vuetify.lang.t('$vuetify.lang_244') }}
            </th>
          </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ $vuetify.lang.t('$vuetify.lang_188') }}</td>
              <td>{{ $vuetify.lang.t('$vuetify.lang_231') }}</td>
              <td>*</td>
            </tr>
            <tr>
              <td>{{ $vuetify.lang.t('$vuetify.lang_221') }}</td>
              <td>{{ $vuetify.lang.t('$vuetify.lang_232') }}</td>
              <td>*</td>
            </tr>
            <tr>
              <td>{{ $vuetify.lang.t('$vuetify.lang_113') }}</td>
              <td>{{ $vuetify.lang.t('$vuetify.lang_233') }}</td>
              <td>*</td>
            </tr>
            <tr>
              <td>{{ $vuetify.lang.t('$vuetify.lang_153') }}</td>
              <td>{{ $vuetify.lang.t('$vuetify.lang_234') }}</td>
              <td>*</td>
            </tr>
            <tr>
              <td>{{ $vuetify.lang.t('$vuetify.lang_112') }}</td>
              <td>{{ $vuetify.lang.t('$vuetify.lang_235') }}</td>
              <td>*</td>
            </tr>
            <tr>
              <td>{{ $vuetify.lang.t('$vuetify.lang_191') }}</td>
              <td>{{ $vuetify.lang.t('$vuetify.lang_236') }}</td>
              <td>*</td>
            </tr>
            <tr>
              <td>{{ $vuetify.lang.t('$vuetify.lang_219') }}</td>
              <td>{{ $vuetify.lang.t('$vuetify.lang_237') }}</td>
              <td>*</td>
            </tr>
            <tr>
              <td>{{ $vuetify.lang.t('$vuetify.lang_224') }}</td>
              <td>{{ $vuetify.lang.t('$vuetify.lang_238') }}</td>
              <td>-</td>
            </tr>
            <tr>
              <td>{{ $vuetify.lang.t('$vuetify.lang_225') }}</td>
              <td>{{ $vuetify.lang.t('$vuetify.lang_239') }}</td>
              <td>-</td>
            </tr>
            <tr>
              <td>{{ $vuetify.lang.t('$vuetify.lang_227') }}, {{ $vuetify.lang.t('$vuetify.lang_214') }}, {{ $vuetify.lang.t('$vuetify.lang_228') }}</td>
              <td>{{ $vuetify.lang.t('$vuetify.lang_240') }}</td>
              <td>-</td>
            </tr>
            <tr v-if="$platform.get(chain.platform).type === 'CRYPTO'">
              <td>{{ $vuetify.lang.t('$vuetify.lang_230') }}</td>
              <td>{{ $vuetify.lang.t('$vuetify.lang_241') }}</td>
              <td>-</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>

    <template v-if="$route.params.id === 'create'">
      <v-btn block color="black--text yellow darken-1 text-capitalize mb-3" elevation="0" large @click="setChain">{{ $vuetify.lang.t('$vuetify.lang_218') }}</v-btn>
    </template>
    <template v-else>
      <v-btn block color="white--text red darken-1 text-capitalize mb-3" elevation="0" large @click="setChain">{{ $vuetify.lang.t('$vuetify.lang_226') }}</v-btn>
    </template>

  </div>
</template>

<script>

  export default {
    data() {
      return {
        status: [
          { value: false, name: "OFF"},
          { value: true, name: "ON"},
        ],
        currencies: [],
        chain: {
          name: "",
          rpc: "",
          rpc_key: "",
          rpc_user: "",
          rpc_password: "",
          explorer_link: "",
          address: "",
          network: 0,
          confirmation: 0,
          time_withdraw: 10,
          status: false,
          fees_withdraw: 0,
          parent_symbol: "",
          tag: "C_NONE",
          platform: "ETHEREUM"
        }
      }
    },
    mounted() {
      this.getChain();
      this.getCurrencies();
    },
    methods: {

      /**
       *
       */
      getChain() {
        this.$axios.$post(this.$api.admin.exchange.getChain, {
          id: (this.$route.params.id !== "create" ? this.$route.params.id : 0)
        }).then((response) => {
          if (response.fields) {
            if (!response.fields[0].platform) {
              response.fields[0].platform = 'BITCOIN'
            }
            if (!response.fields[0].tag) {
              response.fields[0].tag = 'C_NONE'
            }
            this.chain = Object.assign(this.chain, response.fields[0]);
          }
        });
      },

      /**
       *
       */
      setChain() {
        this.$axios.$post(this.$api.admin.exchange.setChain, {
          id: (this.$route.params.id !== "create" ? this.$route.params.id : 0),
          chain: this.chain
        }).then(() => {
          return this.$router.push('/admin/chains');
        }).catch((error) => {
          this.$snackbar.open({
            content: `${error.response.data.code}: ${error.response.data.message}`,
            color: 'red darken-2'
          });
        });
      },

      /**
       *
       */
      getCurrencies() {
        this.$axios.$post(this.$api.admin.exchange.getCurrencies).then((response) => {
          this.currencies = response.fields ?? [];
        })
      }
    }
  }
</script>

<style scoped>

</style>