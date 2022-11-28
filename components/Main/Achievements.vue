<template>
  <div style="background-color: #252525; position: relative; z-index: 2;" class="py-16 mt-lg-n16">
    <v-container style="max-width: 900px;">
      <div class="d-flex align-start justify-center justify-sm-space-between flex-wrap">

        <div v-for="achievement in $options.achievements" :key="achievement.id" class="d-flex flex-column align-start white--text mb-15 mb-md-0" style="max-width: 213px;">
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
    achievements: [
      {
        id: 1,
        title: 'Safe & Secure Platform',
        text: 'Our industry-leading security and financial stability keep your identity and funds safe and secure.'
      },
      {
        id: 2,
        title: 'Fast Crypto Listing',
        text: 'We launch new and high-quality crypto projects efficiently with good liquidity.'
      },
      {
        id: 3,
        title: 'Wide Crypto Variety',
        text: 'We rank top among first-tier exchanges with the highest number of listed crypto.'
      },
    ]
  }
</script>

<style lang="scss" scoped>
</style>
