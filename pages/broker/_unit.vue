<template>
  <v-card class="ma-1" height="500" elevation="0">
    <v-app-bar class="toolbar-px-zero" color="transparent" flat height="50">
      <div class="ml-4">
        {{ unit.toUpperCase() }}
      </div>
      <v-divider class="mx-3" vertical />
      <small v-if="orders.ask.length && orders.bid.length">
        {{ $decimal.format(orders.bid[0].price - orders.ask[0].price) }}
      </small>
      <v-spacer />

      <template v-if="orders.ask.length && orders.bid.length">

        <v-sheet min-width="100" class="py-1 px-2 mx-1" color="teal lighten-5" rounded elevation="0">
          <ul class="header-line">
            <li><small class="teal--text">BUY</small></li>
            <li>
              <small>{{ $decimal.format(orders.bid[0].price) }}</small>
            </li>
          </ul>
        </v-sheet>

        <v-sheet min-width="100" class="py-1 px-2 mx-1" color="red lighten-5" rounded elevation="0">
          <ul class="header-line">
            <li><small class="red--text">SELL</small></li>
            <li>
              <small>{{ $decimal.format(orders.ask[0].price) }}</small>
            </li>
          </ul>
        </v-sheet>

      </template>

    </v-app-bar>
    <v-divider />
    <v-card-text style="height: 90%">
      <template v-if="orders.ask.length || orders.bid.length">
        <div class="depth__content">
          <div class="depth__table left__table">
            <div class="depth__table-item">
              <span class="depth__table-top-text">Size</span>
              <span class="depth__table-top-text">Price</span>
            </div>
            <ul class="depth__table-list right-line">
              <li v-for="(item, index) in orders.ask" @click="addPriceToForm(item.price ? item.price : 0)" :key="index" class="depth__table-item graphic__bg--green">
                <span class="depth__table-text depth__table-num">{{item.size}}</span>
                <span class="depth__table-text depth__table-green-num">{{item.price ? item.price : 0}}</span>
              </li>
            </ul>
          </div>
          <div class="depth__table right__table">
            <div class="depth__table-item">
              <span class="depth__table-top-text">Price</span>
              <span class="depth__table-top-text">Size</span>
            </div>
            <ul class="depth__table-list">
              <li v-for="(item, index) in orders.bid" @click="addPriceToForm(item.price ? item.price : 0)" :key="index" class="depth__table-item graphic__bg--red">
                <span class="depth__table-text depth__table-red-num">{{item.price ? item.price : 0}}</span>
                <span class="depth__table-text depth__table-num">{{item.size}}</span>
              </li>
            </ul>
          </div>
        </div>
      </template>
      <template v-else>
        <v-layout fill-height wrap>
          <v-flex/>
          <v-flex align-self-center class="text-center grey--text" md4 mx5 sm6 xl3>
            <div>
              <v-icon color="grey">
                mdi-alert-circle-outline
              </v-icon>
            </div>
            <div>
              It seems no one is quoting right now.
            </div>
          </v-flex>
          <v-flex/>
        </v-layout>
      </template>
    </v-card-text>

    <v-overlay :color="$vuetify.theme.dark ? 'grey darken-4' : 'white'" opacity="0.8" absolute :value="overlay">
      <v-progress-circular color="yellow darken-3" indeterminate size="50" />
    </v-overlay>

  </v-card>
</template>

<script>
  export default {
    data(){
      return{
        overlay: true,
        unit: undefined,
        orders: {
          ask: [],
          bid: []
        }
      }
    },
    async asyncData({params}) {
      const unit = params.unit
      return { unit }
    },
    watch: {
      $route(e) {
        if (e.params.unit) {
          this.getBook(e.params.unit, true);
        }
      }
    },
    mounted() {
      this.unit = this.unit ?? this.$route.params.unit;

      this.$publish.bind('broker/depth', (data) => {
        if (data.symbol === this.unit.toUpperCase()) {

          if (data.fields && data.fields.length) {

            for (let i = 0; i < data.fields.length; i++) {

              switch (data.fields[i].assigning) {

                case "BID":

                  switch (data.fields[i].action) {
                    case "-":

                      this.orders.bid.map((item, index) => {
                        if (item.price === data.fields[i].price) {
                          this.orders.bid.splice(index, 1);
                        }
                      });

                      break
                    case "+":

                      let item = this.orders.bid.find((item) => item.price === data.fields[i].price)
                      if (item) {
                        this.orders.bid.map((item, index) => {
                          if (item.price === data.fields[i].price) {
                            this.orders.bid[index].size += data.fields[i].size;
                          }
                        });
                      } else {
                        this.orders.bid.unshift(data.fields[i])
                      }

                      break
                    case "~":
                      this.orders.bid.unshift(data.fields[i])
                      break
                    default:
                      this.orders.bid.unshift(data.fields[i])
                  }

                  if (this.orders.bid.length >= 10) {
                    this.orders.bid.shift();
                  }

                  break
                case "ASK":

                  switch (data.fields[i].action) {
                    case "-":

                      this.orders.ask.map((item, index) => {
                        if (item.price === data.fields[i].price) {
                          this.orders.ask.splice(index, 1);
                        }
                      });

                      break
                    case "+":

                      let item = this.orders.ask.find((item) => item.price === data.fields[i].price)
                      if (item) {
                        this.orders.ask.map((item, index) => {
                          if (item.price === data.fields[i].price) {
                            this.orders.ask[index].size += data.fields[i].size;
                          }
                        });
                      } else {
                        this.orders.ask.unshift(data.fields[i])
                      }

                      break
                    case "~":
                      this.orders.bid.unshift(data.fields[i])
                      break
                    default:
                      this.orders.ask.unshift(data.fields[i])
                  }

                  if (this.orders.ask.length >= 10) {
                    this.orders.ask.shift();
                  }

                  break
              }

            }

          }
        }
      });

      this.overlay = false;
      this.getBook(this.unit, true);
    },
    methods: {
      getBook(unit, loading) {
        this.unit = unit;

        if (loading) {
          this.overlay = true;
        }

        this.$axios.$post(this.$api.market.getBook, {instrument: unit.toUpperCase(), tradable: true}).then(() => {
          this.orders.ask = [];
          this.orders.bid = [];

          if (loading) {
            this.overlay = false;
          }
        });
      },
      /**
       * @param price
       */
      addPriceToForm(price) {
        this.$nuxt.$emit("price:update", price)
      }
    }
  }
</script>

<style lang="scss" scoped>
.depth{
  &__content{
    display: flex;
    align-items: flex-start;
    gap: 3px;
    height: 425px;
    overflow: hidden;
  }
  &__table{
    width: 50%;
    @media (max-width: 360px) {
      width: 260px;
    }
    &-list{
      margin-top: 20px;
      padding: 0;
      cursor: pointer;
    }
    &-item{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 5px;
    }
    &-top-text{
      font-family: 'Helvetica';
      font-style: normal;
      font-weight: 400;
      font-size: 10px;
      color: #252525;
      display: block;
    }
    &-text{
      display: block;
      font-family: 'Helvetica';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      z-index: 2;
    }
    &-green-num{
      color: #4AD2AA;
    }
    &-red-num{
      color: #FF5656;
    }

    &-num{
      font-family: 'Helvetica';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      color: #252525;
    }
  }
}
.right-line{
  border-right: 1px solid #f7f7f7;
  padding-right: 3px;
  @media (max-width: 600px) {
    border: none;
    padding: 0;
  }
}
.graphic{
  &__bg{
    &--green{
      padding: 2px 0;
      position: relative;
      &:nth-child(1){
        &::after{
          content: '';
          position: absolute;
          height: 100%;
          width: 26px;
          top: 0;
          right: 0;
          background: #D0FFF1;
          z-index: 1;
        }
      }
      &:nth-child(2){
        &::after{
          content: '';
          position: absolute;
          height: 100%;
          width: 32px;
          top: 0;
          right: 0;
          background: #D0FFF1;
          z-index: 1;
        }
      }
      &:nth-child(3){
        &::after{
          content: '';
          position: absolute;
          height: 100%;
          width: 40px;
          top: 0;
          right: 0;
          background: #D0FFF1;
          z-index: 1;
        }
      }
      &:nth-child(4){
        &::after{
          content: '';
          position: absolute;
          height: 100%;
          width: 46px;
          top: 0;
          right: 0;
          background: #D0FFF1;
          z-index: 1;
        }
      }
      &:nth-child(5){
        &::after{
          content: '';
          position: absolute;
          height: 100%;
          width: 46px;
          top: 0;
          right: 0;
          background: #D0FFF1;
          z-index: 1;
        }
      }
      &:nth-child(6){
        &::after{
          content: '';
          position: absolute;
          height: 100%;
          width: 52px;
          top: 0;
          right: 0;
          background: #D0FFF1;
          z-index: 1;
        }
      }
      &:nth-child(7){
        &::after{
          content: '';
          position: absolute;
          height: 100%;
          width: 52px;
          top: 0;
          right: 0;
          background: #D0FFF1;
          z-index: 1;
        }
      }
      &:nth-child(8){
        &::after{
          content: '';
          position: absolute;
          height: 100%;
          width: 56px;
          top: 0;
          right: 0;
          background: #D0FFF1;
          z-index: 1;
        }
      }
      &:nth-child(9){
        &::after{
          content: '';
          position: absolute;
          height: 100%;
          width: 62px;
          top: 0;
          right: 0;
          background: #D0FFF1;
          z-index: 1;
        }
      }
      &:nth-child(10){
        &::after{
          content: '';
          position: absolute;
          height: 100%;
          width: 69px;
          top: 0;
          right: 0;
          background: #D0FFF1;
          z-index: 1;
        }
      }
      &:nth-child(11){
        &::after{
          content: '';
          position: absolute;
          height: 100%;
          width: 77px;
          top: 0;
          right: 0;
          background: #D0FFF1;
          z-index: 1;
        }
      }
      &:nth-child(12){
        &::after{
          content: '';
          position: absolute;
          height: 100%;
          width: 83px;
          top: 0;
          right: 0;
          background: #D0FFF1;
          z-index: 1;
        }
      }
      &:nth-child(13){
        &::after{
          content: '';
          position: absolute;
          height: 100%;
          width: 87px;
          top: 0;
          right: 0;
          background: #D0FFF1;
          z-index: 1;
        }
      }
      &:nth-child(14){
        &::after{
          content: '';
          position: absolute;
          height: 100%;
          width: 98px;
          top: 0;
          right: 0;
          background: #D0FFF1;
          z-index: 1;
        }
      }
      &:nth-child(15){
        &::after{
          content: '';
          position: absolute;
          height: 100%;
          width: 107px;
          top: 0;
          right: 0;
          background: #D0FFF1;
          z-index: 1;
        }
      }
      &:nth-child(16){
        &::after{
          content: '';
          position: absolute;
          height: 100%;
          width: 124px;
          top: 0;
          right: 0;
          background: #D0FFF1;
          z-index: 1;
        }
      }
      &:nth-child(17){
        &::after{
          content: '';
          position: absolute;
          height: 100%;
          width: 142px;
          top: 0;
          right: 0;
          background: #D0FFF1;
          z-index: 1;
        }
      }
      &:nth-child(18){
        &::after{
          content: '';
          position: absolute;
          height: 100%;
          width: 160px;
          top: 0;
          right: 0;
          background: #D0FFF1;
          z-index: 1;
        }
      }
      &:nth-child(19){
        &::after{
          content: '';
          position: absolute;
          height: 100%;
          width: 173px;
          top: 0;
          right: 0;
          background: #D0FFF1;
          z-index: 1;
        }
      }
      &:nth-child(20){
        &::after{
          content: '';
          position: absolute;
          height: 100%;
          width: 185px;
          top: 0;
          right: 0;
          background: #D0FFF1;
          z-index: 1;
        }
      }
    }
    &--red{
      padding: 2px 0;
      position: relative;
      &:nth-child(1){
        &::after{
          content: '';
          position: absolute;
          height: 100%;
          width: 26px;
          top: 0;
          left: 0;
          background: #FFDFDF;
          z-index: 1;
        }
      }
      &:nth-child(2){
        &::after{
          content: '';
          position: absolute;
          height: 100%;
          width: 32px;
          top: 0;
          left: 0;
          background: #FFDFDF;
          z-index: 1;
        }
      }
      &:nth-child(3){
        &::after{
          content: '';
          position: absolute;
          height: 100%;
          width: 40px;
          top: 0;
          left: 0;
          background: #FFDFDF;
          z-index: 1;
        }
      }
      &:nth-child(4){
        &::after{
          content: '';
          position: absolute;
          height: 100%;
          width: 46px;
          top: 0;
          left: 0;
          background: #FFDFDF;
          z-index: 1;
        }
      }
      &:nth-child(5){
        &::after{
          content: '';
          position: absolute;
          height: 100%;
          width: 46px;
          top: 0;
          left: 0;
          background: #FFDFDF;
          z-index: 1;
        }
      }
      &:nth-child(6){
        &::after{
          content: '';
          position: absolute;
          height: 100%;
          width: 52px;
          top: 0;
          left: 0;
          background: #FFDFDF;
          z-index: 1;
        }
      }
      &:nth-child(7){
        &::after{
          content: '';
          position: absolute;
          height: 100%;
          width: 52px;
          top: 0;
          left: 0;
          background: #FFDFDF;
          z-index: 1;
        }
      }
      &:nth-child(8){
        &::after{
          content: '';
          position: absolute;
          height: 100%;
          width: 56px;
          top: 0;
          left: 0;
          background: #FFDFDF;
          z-index: 1;
        }
      }
      &:nth-child(9){
        &::after{
          content: '';
          position: absolute;
          height: 100%;
          width: 62px;
          top: 0;
          left: 0;
          background: #FFDFDF;
          z-index: 1;
        }
      }
      &:nth-child(10){
        &::after{
          content: '';
          position: absolute;
          height: 100%;
          width: 69px;
          top: 0;
          left: 0;
          background: #FFDFDF;
          z-index: 1;
        }
      }
      &:nth-child(11){
        &::after{
          content: '';
          position: absolute;
          height: 100%;
          width: 77px;
          top: 0;
          left: 0;
          background: #FFDFDF;
          z-index: 1;
        }
      }
      &:nth-child(12){
        &::after{
          content: '';
          position: absolute;
          height: 100%;
          width: 83px;
          top: 0;
          left: 0;
          background: #FFDFDF;
          z-index: 1;
        }
      }
      &:nth-child(13){
        &::after{
          content: '';
          position: absolute;
          height: 100%;
          width: 87px;
          top: 0;
          left: 0;
          background: #FFDFDF;
          z-index: 1;
        }
      }
      &:nth-child(14){
        &::after{
          content: '';
          position: absolute;
          height: 100%;
          width: 98px;
          top: 0;
          left: 0;
          background: #FFDFDF;
          z-index: 1;
        }
      }
      &:nth-child(15){
        &::after{
          content: '';
          position: absolute;
          height: 100%;
          width: 107px;
          top: 0;
          left: 0;
          background: #FFDFDF;
          z-index: 1;
        }
      }
      &:nth-child(16){
        &::after{
          content: '';
          position: absolute;
          height: 100%;
          width: 124px;
          top: 0;
          left: 0;
          background: #FFDFDF;
          z-index: 1;
        }
      }
      &:nth-child(17){
        &::after{
          content: '';
          position: absolute;
          height: 100%;
          width: 142px;
          top: 0;
          left: 0;
          background: #FFDFDF;
          z-index: 1;
        }
      }
      &:nth-child(18){
        &::after{
          content: '';
          position: absolute;
          height: 100%;
          width: 160px;
          top: 0;
          left: 0;
          background: #FFDFDF;
          z-index: 1;
        }
      }
      &:nth-child(19){
        &::after{
          content: '';
          position: absolute;
          height: 100%;
          width: 173px;
          top: 0;
          left: 0;
          background: #FFDFDF;
          z-index: 1;
        }
      }
      &:nth-child(20){
        &::after{
          content: '';
          position: absolute;
          height: 100%;
          width: 185px;
          top: 0;
          left: 0;
          background: #FFDFDF;
          z-index: 1;
        }
      }
    }
  }
}
.right__table{
  @media (max-width: 600px) {
    display: none;
    width: 100%;
  }
  &_visible{
    display: block;
  }
}
.left__table{
  @media (max-width: 600px) {
    width: 100%;
    &_none{
      display: none;
    }
  }
}
</style>