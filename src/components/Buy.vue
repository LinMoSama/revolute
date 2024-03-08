<template>
  <div class="buy_wrap">
    <div class="top">
      <div class="top_left">
        <div class="top_left_top">{{ day }}天</div>
        <div class="top_left_bottom">助您轻松实现财务目标！</div>
      </div>
      <div class="top_right">
        <img src="../assets/images/buy_icon1.png" alt="" v-if="type===1">
        <img src="../assets/images/buy_icon2.png" alt="" v-if="type===2">
        <img src="../assets/images/buy_icon3.png" alt="" v-if="type===3">
      </div>
    </div>
    <div class="bottom">
      <div class="bottom_left">
        <div class="left_top">
          <div class="onsale">在售</div>
          <div class="product" v-if="type === 1">产品一</div>
          <div class="product" v-if="type === 2">产品二</div>
          <div class="product" v-if="type === 3">产品三</div>
        </div>
        <div class="left_bottom">
          <p class="left_bottom_text" v-if="type === 1">投资精明选择！</p>
          <p class="left_bottom_text" v-if="type === 2">实现财富增长！</p>
          <p class="left_bottom_text" v-if="type === 3">财富稳步积累！</p>
        </div>
      </div>
      <div class="bottom_right">
        <div class="bottom_right_top">{{ percentage }}%</div>
        <div class="bottom_right_bottom">每日{{ percentage }}%回报</div>
      </div>
      <button class="buy" @click="buy">Buy</button>
    </div>
  </div>
</template>

<script lang="ts" name='Buy' setup>
defineProps<{
  day: number
  type: number
  percentage: string
}>()
// const iconList = [
//   '@//assets/images/buy_icon1.png',
//   '@//assets/images/buy_icon2.png',
//   '@//assets/images/buy_icon3.png'
// ]
const emit = defineEmits(['buy'])

function buy() {
  emit('buy')
 
}
</script>

<style scoped lang="scss">
.buy_wrap {
  margin-top: 26px;
  width: 325px;
  height: 182px;
  background: #FFFFFF;
  border-radius: 10px 10px 10px 10px;
  font-family: Poppins, Poppins;

  .top {
    position: relative;
    display: flex;
    height: 69px;
    background: #EBF2FF;
    border-radius: 10px 10px 0px 0px;

    .top_left {
      padding: 14px 0 0 16px;
      display: flex;
      flex-direction: column;

      .top_left_top {
        margin-bottom: 3px;
        font-weight: 600;
        font-size: 16px;
        color: #313C5B;
      }

      .top_left_bottom {
        font-weight: 400;
        font-size: 12px;
        color: #313C5B;
      }
    }

    .top_right {
      position: absolute;
      right: 16px;
      top: 23px
    }
  }

  .bottom {
    position: relative;
    display: flex;
    justify-content: space-between;
    height: calc(182px - 69px);

    .bottom_left {
      padding: 16px 0 0 16px;

      .left_top {
        display: flex;
        margin-bottom: 3px;
        align-items: center;

        .onsale {
          margin-right: 10px;
          width: 40px;
          height: 20px;
          background: #0359BD;
          border-radius: 2px 2px 2px 2px;
          font-weight: 600;
          font-size: 12px;
          color: #FFFFFF;
          text-align: center;
          line-height: 20px;
        }

        .product {
          font-weight: 400;
          font-size: 12px;
          color: #313C5B;
        }
      }

      .left_bottom {
        margin-top: 5px;

        .left_bottom_text {
          font-weight: 400;
          font-size: 12px;
          color: #313C5B;
        }
      }
    }

    .bottom_right {
      padding: 16px 19px 0 0;

      .bottom_right_top {
        text-align: right;
        margin-bottom: 3px;
        font-weight: 600;
        font-size: 16px;
        color: #0359BD;
      }

      .bottom_right_bottom {
        font-weight: 400;
        font-size: 12px;
        color: #313C5B;
      }
    }

    .buy {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 40px;
      background: #005ABD;
      border-radius: 0px 0px 10px 10px;
      font-family: Poppins, Poppins;
      font-weight: 600;
      font-size: 16px;
      color: #FFFFFF;
      line-height: 40px;
      text-align: center;
      border: none;
      padding: 0;
      margin: 0;
    }
  }
}
</style>