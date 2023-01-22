<template>
  <div class="px-3 mt-3">

    <!-- Start: sector info form -->
    <v-row>
      <v-col cols="12" md="4"></v-col>
      <v-col cols="12" md="4">
        <v-text-field v-model="sector.name" color="primary" :label="$vuetify.lang.t('$vuetify.lang_188')" outlined></v-text-field>
        <v-text-field v-model="sector.symbol" color="primary" :label="$vuetify.lang.t('$vuetify.lang_187')" outlined></v-text-field>
        <v-select v-model="sector.status" :items="status" item-text="name" item-value="value" :label="$vuetify.lang.t('$vuetify.lang_191')" outlined></v-select>
      </v-col>
      <v-col cols="12" md="4"></v-col>
    </v-row>
    <!-- End: sector info form -->

    <template v-if="$route.params.id === 'create'">
      <v-btn block color="black--text yellow darken-1 text-capitalize mb-3" elevation="0" large @click="setSector">{{ $vuetify.lang.t('$vuetify.lang_301') }}</v-btn>
    </template>
    <template v-else>
      <v-btn block color="white--text red darken-1 text-capitalize mb-3" elevation="0" large @click="setSector">Update sector information's</v-btn>
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
        sector: {
          name: "",
          symbol: "",
          status: false,
        }
      }
    },
    mounted() {
      this.getSector();
    },
    methods: {

      /**
       *
       */
      getSector() {
        this.$axios.$post(this.$api.admin.stock.getSector, {
          id: (this.$route.params.id !== "create" ? this.$route.params.id : 0)
        }).then((response) => {
          if (response.fields) {
            this.sector = Object.assign(this.sector, response.fields[0]);
          }
        });
      },

      /**
       *
       */
      setSector() {
        this.$axios.$post(this.$api.admin.stock.setSector, {
          id: (this.$route.params.id !== "create" ? this.$route.params.id : 0),
          sector: this.sector
        }).then(() => {
          return this.$router.push('/admin/stock/sectors');
        }).catch((error) => {
          this.$snackbar.open({
            content: `${error.response.data.code}: ${error.response.data.message}`,
            color: 'red darken-2'
          });
        });
      }
    }
  }
</script>

<style scoped>

</style>