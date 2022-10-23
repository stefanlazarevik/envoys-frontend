<template>
  <div class="px-3 mt-3">

    <!-- Start: contract info form -->
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field v-model="contract.address" color="primary" :label="$vuetify.lang.t('$vuetify.lang_269')" outlined></v-text-field>
        <v-select v-model="contract.protocol" :items="protocols" item-text="name" item-value="name" :label="$vuetify.lang.t('$vuetify.lang_270')" outlined>
          <template v-slot:item="{ item, attrs, on }">
            <v-list-item v-bind="attrs" v-on="on">
              <v-list-item-title>
                {{ item.name }} <v-badge class="ml-2" :color="item.color" />
              </v-list-item-title>
            </v-list-item>
          </template>
        </v-select>
      </v-col>
      <v-col cols="12" md="4">
        <v-select v-model="contract.symbol" :items="currencies" item-text="symbol" item-value="symbol" :label="$vuetify.lang.t('$vuetify.lang_187')" outlined>
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
        <v-select v-model="contract.chain_id" :items="chains" item-text="name" item-value="id" @change="getTag" :label="$vuetify.lang.t('$vuetify.lang_268')" outlined></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <v-select v-model="contract.platform" :items="$platform.getType('CRYPTO')" item-text="name" item-value="name" :label="$vuetify.lang.t('$vuetify.lang_113')" outlined></v-select>
        <v-text-field v-model="contract.fees_withdraw" color="primary" :label="$vuetify.lang.t('$vuetify.lang_221')" outlined></v-text-field>
      </v-col>
    </v-row>
    <!-- End: contract info form -->

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
            <td>{{ $vuetify.lang.t('$vuetify.lang_269') }}, {{ $vuetify.lang.t('$vuetify.lang_113') }}, {{ $vuetify.lang.t('$vuetify.lang_270') }}</td>
            <td>{{ $vuetify.lang.t('$vuetify.lang_275') }}</td>
            <td>*</td>
          </tr>
          <tr>
            <td>{{ $vuetify.lang.t('$vuetify.lang_187') }}</td>
            <td>{{ $vuetify.lang.t('$vuetify.lang_276') }}</td>
            <td>*</td>
          </tr>
          <tr>
            <td>{{ $vuetify.lang.t('$vuetify.lang_268') }}</td>
            <td>{{ $vuetify.lang.t('$vuetify.lang_277') }}</td>
            <td>*</td>
          </tr>
          <tr>
            <td>{{ $vuetify.lang.t('$vuetify.lang_221') }}</td>
            <td>{{ $vuetify.lang.t('$vuetify.lang_278') }}</td>
            <td>*</td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>

    <template v-if="$route.params.id === 'create'">
      <v-btn block color="black--text yellow darken-1 text-capitalize mb-3" elevation="0" large @click="setContract">{{ $vuetify.lang.t('$vuetify.lang_267') }}</v-btn>
    </template>
    <template v-else>
      <v-btn block color="white--text red darken-1 text-capitalize mb-3" elevation="0" large @click="setContract">{{ $vuetify.lang.t('$vuetify.lang_274') }}</v-btn>
    </template>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        currencies: [],
        chains: [],
        protocols: this.$protocol.list || [],
        contract: {
          symbol: "",
          chain_id: 0,
          address: "",
          fees_withdraw: 0.01,
          protocol: "ERC20",
          platform: "ETHEREUM"
        }
      }
    },
    mounted() {
      this.getContract();
      this.getChains();
      this.getCurrencies();

      setTimeout(() => {
        this.getTag();
      }, 1000);
    },
    methods: {

      /**
       *
       */
      getTag() {
        this.protocols = this.$protocol.getTag(this.chains.find((item) => item.id === this.contract.chain_id).tag)
        if (this.protocols.length) {
          this.contract.protocol = this.protocols[0].name;
        }
      },

      /**
       *
       */
      getContract() {
        this.$axios.$post(this.$api.admin.exchange.getContract, {
          id: (this.$route.params.id !== "create" ? this.$route.params.id : 0)
        }).then((response) => {
          if (response.fields) {
            this.contract = Object.assign(this.contract, response.fields[0]);
          }
        });
      },

      /**
       *
       */
      setContract() {
        this.$axios.$post(this.$api.admin.exchange.setContract, {
          id: (this.$route.params.id !== "create" ? this.$route.params.id : 0),
          contract: this.contract
        }).then(() => {
          return this.$router.push('/admin/contracts');
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
      getChains() {
        this.$axios.$post(this.$api.admin.exchange.getChains).then((response) => {
          this.chains = response.fields ?? [];
          this.chains = this.chains.filter((item) => item.platform !== 'VISA' && item.platform !== 'MASTERCARD');
        })
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