<template>
  <v-card class="ma-2 mt-3 pa-0" elevation="0" rounded="lg">
    <v-card-title>
      <v-row no-gutters>
        <v-col cols="12" md="6">
          <div>FM-Test-MM (87) <small class="grey--text darken-1--text">Limits set</small></div>
        </v-col>
        <v-col cols="12" md="6">
          <div class="float-right">
            <v-btn icon small>
              <v-icon>
                mdi-circle-edit-outline
              </v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card-title>
    <v-divider />
    <v-card-text>
      <div class="scroll">
        <div class="limit__content">
          <div class="limit__cp limit__item">
            <h4 class="limit__item-title">CP Limits</h4>
            <div class="limit__between" v-for="(item, index) in cpLimits" :key="index">
              <h5 class="limit__text">{{ item.text }}</h5>
              <p class="limit__text limit__text_black">
                {{ item.num }}<span class="limit__text">{{ item.zero }}</span>
              </p>
            </div>
          </div>
          <div class="limit__your limit__item">
            <h4 class="limit__item-title">Your Limits</h4>
            <div class="limit__between" v-for="(item, index) in yourLimits" :key="index">
              <h5 class="limit__text">{{ item.text }}</h5>
              <p class="limit__text limit__text_blue">
                {{ item.num }}<span class="limit__text">{{ item.zero }}</span>
              </p>
            </div>
          </div>
          <div class="limit__applied limit__item">
            <h4 class="limit__item-title">Applied</h4>
            <div class="limit__between" v-for="(item, index) in appliedLimits" :key="index">
              <h5 class="limit__text">{{ item.text }}</h5>
              <p class="limit__text" :class="{limit__text_green: item.green,limit__text_blue: item.blue}">
                {{ item.num }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      cpLimits: [
        {text: 'Gross Limit', num: '100', zero: '.00000000 BTC'},
        {text: 'Gross Exposhure', num: '', zero: '- BTC'},
        {text: 'Gross Free', num: '100', zero: '.00000000 BTC'},
        {text: 'Net Limit', num: '100', zero: '.00000000 BTC'},
        {text: 'Net Exposhure', num: '', zero: '- BTC'},
        {text: 'Net Free', num: '100', zero: '.00000000 BTC'},
      ],
      yourLimits: [
        {num: '100', zero: '.00000000 BTC'},
        {num: '', zero: '– BTC'},
        {num: '100', zero: '.00000000 BTC'},
        {num: '100', zero: '.00000000 BTC'},
        {num: '', zero: '– BTC'},
        {num: '100', zero: '.00000000 BTC'},
      ],
      appliedLimits: [
        {num: '2,012,893.00 USD', green: false, blue: true},
        {num: '—', green: false, blue: false},
        {num: '2,012,893.00 USD', green: true, blue: false},
      ],
    }
  }
}
</script>

<style lang="scss" scoped>
  .limit {
    &__content {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 20px;
      width: 990px;
    }

    &__item {
      width: 100%;

      &-title {
        margin-bottom: 20px;
        font-family: 'Helvetica';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        color: #171717;
        display: flex;
        justify-content: flex-end;
      }
    }

    &__between {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;

      &:last-child {
        margin: 0;
      }
    }

    &__text {
      font-family: 'Helvetica';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      color: #868686;
      margin: 0;

      &_black {
        color: #171717;
      }

      &_green {
        color: #4AD2AA;
      }

      &_blue {
        color: #4478BB;
      }

      &_small {
        font-size: 12px;
      }
    }
  }
  .scroll{
    overflow-x: auto;
    &::-webkit-scrollbar {
      height: 8px;
    }
    &::-webkit-scrollbar-thumb{
      background: #9C9C9C;
      border-radius: 10px;
      border: 2px solid #F2F2F2;
    }
    &::-webkit-scrollbar-track{
      background: #F2F2F2;
      border-radius: 10px;
    }
  }
</style>