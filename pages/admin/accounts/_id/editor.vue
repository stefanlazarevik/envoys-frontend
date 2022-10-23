<template>
  <div class="px-3 mt-3">

    <!-- Start: user info form -->
    <v-row>
      <v-col cols="12" md="4"></v-col>
      <v-col cols="12" md="4">
        <v-text-field v-model="account.name" color="primary" :label="$vuetify.lang.t('$vuetify.lang_188')" outlined></v-text-field>
        <v-text-field v-model="account.email" color="primary" :label="$vuetify.lang.t('$vuetify.lang_280')" outlined></v-text-field>
        <v-select v-model="account.rules" :items="rules" chips :label="$vuetify.lang.t('$vuetify.lang_281')" multiple outlined></v-select>
        <v-select v-model="account.status" :items="status" item-text="name" item-value="value" :label="$vuetify.lang.t('$vuetify.lang_191')" outlined></v-select>
        <v-btn block color="white--text red darken-1 text-capitalize mb-3" depressed large @click="setAccount">{{ $vuetify.lang.t('$vuetify.lang_282') }}</v-btn>
      </v-col>
      <v-col cols="12" md="4"></v-col>
    </v-row>
    <!-- End: user info form -->

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
        rules: ["currencies", "chains", "pairs", "accounts", "contracts", "listing", "news", "support", "advertising", "deny-record"],
        account: {
          name: "",
          email: "",
          rules: [],
          status: false
        }
      }
    },
    mounted() {
      this.getAccount();
    },
    methods: {

      /**
       *
       */
      getAccount() {
        this.$axios.$post(this.$api.admin.account.getAccount, {id: this.$route.params.id}).then((response) => {
          this.account = Object.assign(this.account, response);
        })
      },

      /**
       *
       */
      setAccount() {
        this.$axios.$post(this.$api.admin.account.setAccount, {
          id: this.account.id,
          user: this.account
        }).then(() => {
          return this.$router.push('/admin/accounts');
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