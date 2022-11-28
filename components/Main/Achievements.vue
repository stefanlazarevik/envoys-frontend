<template>
  <div style="background-color: #252525; position: relative; z-index: 2;" class="py-16 mt-lg-n16">
    <v-container style="max-width: 900px;">
      <div class="d-flex align-start justify-center justify-sm-space-between flex-wrap">
        <div v-for="achievement in achievements" :key="achievement.id" class="d-flex flex-column align-start white--text mb-15 mb-md-0" style="max-width: 213px;">
          <img :src="require(`../../static/asset/main/achievements/${achievement.id}.svg`)" alt="icon" class="mb-2">
          <div class="text-body-1 font-weight-bold mb-2">{{ achievement.title }}</div>
          <div class="font-weight-regular text-body-1">{{ achievement.text }}</div>
        </div>

      </div>
    </v-container>
  </div>
</template>

<script>
  export default {
    name: 'v-achievements',
    computed: {
      achievements(){
        return [
          {
            id: 1,
            title: this.$vuetify.lang.t('$vuetify.lang_achievements_1'),
            text: this.$vuetify.lang.t('$vuetify.lang_achievements_2')
          },
          {
            id: 2,
            title: this.$vuetify.lang.t('$vuetify.lang_achievements_3'),
            text: this.$vuetify.lang.t('$vuetify.lang_achievements_4')
          },
          {
            id: 3,
            title: this.$vuetify.lang.t('$vuetify.lang_achievements_5'),
            text: this.$vuetify.lang.t('$vuetify.lang_achievements_6')
          },
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
