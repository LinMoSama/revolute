<template>
  <van-overlay :show="alertShow" @click="updateShow" lock-scroll z-index="999">
    <div class="wrapper" @click.stop>
      <div class="block">
        <p class="title">{{ title }}</p>
        <div class="input">
          <input type="number" v-model="inputMoney" placeholder="Min 100.00">
          <div class="tool">
            <div class="danwei">USDT</div>
            <div class="max">MAX</div>
          </div>
          <span class="keyong">可用: 1,547.00USDT</span>
        </div>

        <div class="btns">
          <div class="cancel" @click="cancel">取消</div>
          <div class="confirm" @click="confim">确定</div>
        </div>
      </div>
    </div>
  </van-overlay>
</template>

<script setup lang="ts">
import { ref } from 'vue';
let inputMoney = ref('');
defineProps<{ alertShow: boolean, title: string }>()
const emit = defineEmits(['updateShow', 'closeAlert'])
function updateShow() {
  emit('updateShow')
}
function cancel() {
  emit('closeAlert')
  inputMoney.value = ''
}
function confim() {

}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  .block {
    width: 334px;
    height: 230px;
    background: #FFFFFF;
    border-radius: 10px 10px 10px 10px;

    .title {
      margin-top: 30px;
      margin-bottom: 26px;
      text-align: center;
      font-weight: 600;
      font-size: 20px;
      color: #313C5B;
    }

    .input {
      position: relative;
      display: flex;
      margin: 0 auto;
      width: 300px;
      height: 52px;
      background: #EBF2FF;
      border-radius: 6px 6px 6px 6px;

      input {
        width: 194px;
        height: 100%;
        background: #EBF2FF;
        border: none;
        padding-left: 17px;
        border-radius: 6px 6px 6px 6px;
      }

      .tool {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: calc(300px - 194px);
        height: 100%;
        border-radius: 6px 6px 6px 6px;

        .danwei {
          font-weight: 500;
          font-size: 14px;
          color: #0359BD;
        }

        .max {
          width: 50px;
          height: 26px;
          background: #0359BD;
          border-radius: 2px 2px 2px 2px;
          font-weight: 500;
          font-size: 14px;
          color: #FFFFFF;
          text-align: center;
          line-height: 26px;
        }
      }

      .keyong {
        position: absolute;
        bottom: -20px;
        right: 0px;
        font-weight: 400;
        font-size: 12px;
        color: #313C5B;
      }
    }

    .btns {
      display: flex;
      padding: 0 17px;
      margin-top: 44px;
      justify-content: space-between;

      div {
        width: 146px;
        height: 40px;
        border-radius: 6px 6px 6px 6px;
        font-weight: 400;
        font-size: 16px;
        text-align: center;
        line-height: 40px;
      }

      .cancel {
        background: #D9D9D9;
        color: #2F354D;
      }

      .confirm {
        background: #0359BD;
        color: #FFFFFF;
      }


    }
  }
}
</style>