<template>
  <v-layout fill-height wrap>
    <v-flex/>
    <v-flex align-self-center class="text-center relative my-16" md5 mx5 sm6 xl4>

      <template v-if="type === 'completed' || status">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" fill="none" style="width: 100px;"><path d="M18 8l4 4 4-4-4-4-4 4z" fill="url(#general-success_svg__paint0_linear)"></path><path d="M85 76l3 3 3-3-3-3-3 3z" fill="url(#general-success_svg__paint1_linear)"></path><path d="M86 20l2 2 2-2-2-2-2 2z" fill="url(#general-success_svg__paint2_linear)"></path><path d="M0 47l3 3 3-3-3-3-3 3z" fill="url(#general-success_svg__paint3_linear)"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M48 88c22.091 0 40-17.909 40-40S70.091 8 48 8 8 25.909 8 48s17.909 40 40 40zM31 48.335L43.475 61 64 40.241 59.812 36 43.475 52.547l-8.317-8.423L31 48.335z" fill="url(#general-success_svg__paint4_linear)"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M48 19c16.016 0 29 12.984 29 29S64.016 77 48 77 19 64.016 19 48s12.984-29 29-29zM31 48.335L43.475 61 64 40.241 59.812 36 43.475 52.547l-8.317-8.423L31 48.335z" fill="url(#general-success_svg__paint5_linear)"></path><defs><linearGradient id="general-success_svg__paint0_linear" x1="22" y1="12" x2="22" y2="4" gradientUnits="userSpaceOnUse"><stop stop-color="#02C076"></stop><stop offset="1" stop-color="#28D294"></stop></linearGradient><linearGradient id="general-success_svg__paint1_linear" x1="88" y1="79" x2="88" y2="73" gradientUnits="userSpaceOnUse"><stop stop-color="#02C076"></stop><stop offset="1" stop-color="#28D294"></stop></linearGradient><linearGradient id="general-success_svg__paint2_linear" x1="88" y1="22" x2="88" y2="18" gradientUnits="userSpaceOnUse"><stop stop-color="#02C076"></stop><stop offset="1" stop-color="#28D294"></stop></linearGradient><linearGradient id="general-success_svg__paint3_linear" x1="3" y1="50" x2="3" y2="44" gradientUnits="userSpaceOnUse"><stop stop-color="#02C076"></stop><stop offset="1" stop-color="#28D294"></stop></linearGradient><linearGradient id="general-success_svg__paint4_linear" x1="8" y1="48" x2="88" y2="48" gradientUnits="userSpaceOnUse"><stop stop-color="#28D294" stop-opacity="0"></stop><stop offset="1" stop-color="#28D294"></stop></linearGradient><linearGradient id="general-success_svg__paint5_linear" x1="48" y1="77" x2="48" y2="19" gradientUnits="userSpaceOnUse"><stop stop-color="#02C076"></stop><stop offset="1" stop-color="#28D294"></stop></linearGradient></defs></svg>
        <h2>{{ $vuetify.lang.t('$vuetify.lang_350') }}</h2>
        <div class="mt-2">{{ $vuetify.lang.t('$vuetify.lang_349') }}.</div>
      </template>
      <template v-else-if="type === 'error'">
        <v-icon size="50" color="red">
          mdi-alert-circle-outline
        </v-icon>
        <ul v-if="messages.length" class="mt-3">
          <li class="text-left" v-for="(message, i) in messages" :key="i">
            {{ message }}
          </li>
        </ul>
      </template>
      <template v-else-if="type === 'start' || type === 'pending'">
        <template v-if="process">
          <div>
            <v-progress-circular :size="100" color="amber" indeterminate></v-progress-circular>
          </div>
          <div class="mt-3">
            <a :href="$store.state.localStorage.url" target="_blank">{{ $vuetify.lang.t('$vuetify.lang_348') }}...</a>
          </div>
        </template>
        <template v-else>

          <div class="text-h6 font-weight-black">{{ $vuetify.lang.t('$vuetify.lang_345') }}</div>
          <div>{{ $vuetify.lang.t('$vuetify.lang_351') }}</div>

          <v-card class="mt-4" outlined>
            <v-list>
              <v-list-item>
                <v-list-item-avatar rounded="0">
                  <v-img src="/svg/kyc.svg" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ $vuetify.lang.t('$vuetify.lang_345') }}</v-list-item-title>
                  <v-list-item-action-text>{{ $vuetify.lang.t('$vuetify.lang_347') }}</v-list-item-action-text>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-divider />
            <v-card-actions>
              <v-btn color="black--text yellow darken-1 text-capitalize" large block elevation="0" @click="setKyc">{{ $vuetify.lang.t('$vuetify.lang_346') }}</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </template>
    </v-flex>
    <v-flex/>
  </v-layout>
</template>

<script>
  export default {
    data() {
      return {
        process: false,
        status: false,
        type: "start",
        messages: []
      }
    },
    mounted() {

      this.$publish.bind('account/kyc-verify', (data) => {
        if (data.id === Number(this.$auth.$state.user.fields[0].id)) {
          this.type = data.type;
          this.status = false;
          switch (this.type) {
            case "error":
              this.messages = data.messages ?? [];
              this.process = false;
              break
            case "pending":
              this.process = true;
              break
            case "completed":
              this.status = true;
              this.process = false;
              this.$store.commit('localStorage/setUrl', null);
              break
          }
        }
      });

      this.getUser();
    },
    methods: {

      /**
       *
       */
      getUser() {
        this.$axios.$post(this.$api.account.getUser).then((response) => {
          this.status = response.fields[0].kyc_secure ?? false;
          this.process = response.fields[0].kyc_process ?? false;
        });
      },

      /**
       *
       */
      setKyc() {
        this.$axios.$post(this.$api.account.setKyc).then((response) => {
          this.process = true;
          this.$store.commit('localStorage/setUrl', response.form_url + "/?lang=en");
          window.open(response.form_url + "/?lang=en", "_blank");
        });
      }
    }
  }
</script>

<style scoped>

</style>