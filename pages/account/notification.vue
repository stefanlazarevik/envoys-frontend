<template>
  <v-layout class="bg-image" fill-height wrap>
    <v-flex/>
    <v-flex align-self-center class="text-center relative mx-4 my-16" md4 mx5 sm6>
      <v-switch
          v-model="sample"
          color="primary"
          :label="$vuetify.lang.t('$vuetify.lang_167')"
          :messages="$vuetify.lang.t('$vuetify.lang_168')"
          value="order_filled"
          @click="setSample"
      ></v-switch>
      <v-switch
          v-model="sample"
          color="primary"
          :label="$vuetify.lang.t('$vuetify.lang_165')"
          :messages="$vuetify.lang.t('$vuetify.lang_166')"
          value="withdrawal"
          @click="setSample"
      ></v-switch>
      <v-switch
          v-model="sample"
          color="primary"
          :label="$vuetify.lang.t('$vuetify.lang_169')"
          :messages="$vuetify.lang.t('$vuetify.lang_170')"
          value="login"
          @click="setSample"
      ></v-switch>
      <v-switch
          v-model="sample"
          color="primary"
          :label="$vuetify.lang.t('$vuetify.lang_163')"
          :messages="$vuetify.lang.t('$vuetify.lang_164')"
          value="news"
          @click="setSample"
      ></v-switch>
    </v-flex>
    <v-flex/>
  </v-layout>
</template>

<script>

  export default {
    data() {
      return {
        sample: []
      }
    },
    watch: {
      $route() {
        this.getUser();
      }
    },
    mounted() {
      this.getUser();
    },
    methods: {

      /**
       *
       */
      getUser() {
        this.$axios.$post(this.$api.account.getUser).then((response) => {
          this.sample = response.sample ?? [];
        });
      },

      /**
       * @param e
       */
      setSample(e) {
        this.$axios.$post(this.$api.account.setUser, {
          sample: e.path[1].firstChild.value
        });
      }
    }
  }
</script>

<style scoped>

  .bg-image::after {
    content: "";
    width: 100%;
    height: 100%;
    /*background-image: url(/asset/5.png);*/
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    position: absolute;
    display: block;
    opacity: 0.1;
  }

  .relative {
    position: relative;
    z-index: 6;
  }

</style>