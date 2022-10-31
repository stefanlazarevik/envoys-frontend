<template>
  <v-card class="ma-2 pa-0" elevation="0" rounded="lg">
    <v-card-title>
      <v-row no-gutters>
        <v-col cols="12" md="6">
          <div>Global Limits <small class="grey--text darken-1--text">Limits set</small></div>
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
        <div class="global__content">
          <div class="global__content-left">
            <div class="global__between" v-for="(item, index) in leftItems" :key="index">
              <h5 class="global__text">{{ item.text }}</h5>
              <p class="global__text" :class="{global__text_green: item.green,global__text_blue: item.blue}">
                {{ item.num }}
              </p>
            </div>
          </div>
          <div class="global__content-right">
            <div class="global__between" v-for="(item, index) in rightItems" :key="index">
              <h5 class="global__text">{{ item.text }}</h5>
              <p class="global__text" :class="{global__text_green: item.green,global__text_blue: item.blue}">
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
    data(){
      return{
        leftItems:[
          {text: 'Net Limit', num: '100.00000000 BTC', green: false, blue: true},
          {text: 'Net Exposhure', num: '— BTC', green: false, blue: false},
          {text: 'Net Free', num: '100.00000000 BTC', green: true, blue: false},
        ],
        rightItems:[
          {text: 'Net Limit', num: '100.00000000 BTC', green: false, blue: true},
          {text: 'Net Exposhure', num: '— BTC', green: false, blue: false},
          {text: 'Net Free', num: '100.00000000 BTC', green: true, blue: false},
        ],
      }
    }
  }
</script>

<style lang="scss" scoped>
  .global{
    &__content{
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 20px;
      width: 990px;
      &-left{
        width: 100%;
      }
      &-right{
        width: 100%;
      }
    }
    &__between{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
      &:last-child{
        margin: 0;
      }
    }
    &__text{
      font-family: 'Helvetica';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      color: #868686;
      margin: 0;
      &_green{
        color: #4AD2AA;
      }
      &_blue{
        color: #4478BB;
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