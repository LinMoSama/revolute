<template>
  <van-overlay :show="alertShow" @click="updateShow" lock-scroll z-index="999">
    <div class="wrapper" @click.stop>
      <div class="block">
        <img
          src="../assets/images/succ.png"
          alt=""
          class="succ"
          v-if="transferSucc"
        />
        <img
          src="../assets/images/fail.png"
          alt=""
          class="succ"
          v-if="transferFail"
        />
        <p class="title" :class="{ title_succ: transferSucc }">{{ title }}</p>
        <p class="tip_text" v-if="tipTextShow">
          基金收益+复利的收益总和大于本金时， 不再享受复利收益
        </p>
        <p v-if="transferSucc" class="succ_tip">请在收益明细中查看</p>
        <template v-if="flag">
          <div class="input">
            <input
              type="number"
              v-model.trim="inputMoney"
              placeholder="Min 100.00"
              v-if="!zhuanchu"
            />
            <input
              v-else
              type="number"
              v-model.trim="inputMoney"
              placeholder="0.00"
            />
            <div class="tool">
              <div class="danwei">USDT</div>
              <div class="max" @click="max">MAX</div>
            </div>
            <span
              class="balance_not_enough"
              v-if="!zhuanchu && inputMoney > userStore.userInfo.money"
              >余额不足</span
            >
            <span
              class="balance_not_enough"
              v-if="zhuanchu && inputMoney > userInfo.money_award"
            >
              余额不足
            </span>
            <span class="keyong">可用: {{ keYongMoney }}USDT</span>
          </div>
        </template>

        <template v-else>
          <div class="input input2" v-if="!hiddenInput">
            <input
              type="text"
              placeholder="输入推荐码"
              v-model.trim="recommenderAddress"
            />
          </div>
        </template>
        <div
          class="btns"
          :class="{
            center_btns: hiddenCancel,
            mt18: transferSucc,
            mt34: transferFail,
          }"
        >
          <div class="cancel" @click="cancel" v-if="!hiddenCancel">取消</div>
          <div
            class="confirm"
            @click="confim(flag ? inputMoney : recommenderAddress)"
          >
            确定
          </div>
        </div>
      </div>
    </div>
  </van-overlay>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { showFailToast } from 'vant'
import { formatDecimal } from '@/utils/utils'

let inputMoney = ref('')
let recommenderAddress = ref('')
const userStore = useUserStore()
const props = withDefaults(
  defineProps<{
    alertShow: boolean
    title: string
    flag?: boolean
    hiddenCancel?: boolean
    transferFail?: boolean
    transferSucc?: boolean
    hiddenInput?: boolean
    tipTextShow?: boolean
    zhuanchu?: boolean
    userInfo?: any
  }>(),
  {
    hiddenCancel: false,
    transferFail: false,
    transferSucc: false,
    hiddenInput: false,
    tipTextShow: false,
    zhuanchu: false,
  }
)

const emit = defineEmits(['updateShow', 'closeAlert', 'confirmAlert'])
const keYongMoney = computed(() => {
  if (props.zhuanchu) {
    return formatDecimal(props.userInfo.money_award)
  } else {
    return formatDecimal(userStore.userInfo.money)
  }
})
function updateShow() {
  inputMoney.value = ''
  recommenderAddress.value = ''

  emit('updateShow')
}
function cancel() {
  inputMoney.value = ''
  recommenderAddress.value = ''
  emit('closeAlert')
}
function confim(val: any) {
  if (
    props.title === '温馨提示' ||
    props.title === '转出成功' ||
    props.title === '转出失败' ||
    props.title === '推荐人'
  ) {
    return emit('confirmAlert', val)
  }
  if (
    inputMoney.value > userStore.userInfo.money
  ) {
    return
  }
  if (
    inputMoney.value > props.userInfo.money_award
  ) {
    return
  }
  if (!props.zhuanchu && Number(inputMoney.value) < 100) {
    return showFailToast('Min 100.00')
  }
  if (props.zhuanchu && Number(inputMoney.value) <= 0) {
    return showFailToast('不能为0')
  }
  inputMoney.value = ''
  recommenderAddress.value = ''
  emit('confirmAlert', val)
}
function max() {
  if (props.zhuanchu) {
    inputMoney.value = String(props.userInfo.money_award)
  } else {
    inputMoney.value = String(userStore.userInfo.money)
  }
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
    // height: 230px;
    background: #ffffff;
    border-radius: 10px 10px 10px 10px;

    .succ {
      display: block;
      margin: 26px auto 0;
      width: 68px;
      height: 68px;
    }

    .succ_tip {
      font-weight: 400;
      font-size: 12px;
      color: #313c5b;
      text-align: center;
    }

    .title {
      margin-top: 30px;
      margin-bottom: 26px;
      text-align: center;
      font-weight: 600;
      font-size: 20px;
      color: #313c5b;
    }

    .title_succ {
      margin-top: 16px;
      margin-bottom: 10px;
    }

    .tip_text {
      width: 218px;
      margin: 0 auto -14px;
      text-align: center;
      font-weight: 400;
      font-size: 12px;
      color: rgba(49, 60, 91, 0.6);
    }

    .input {
      position: relative;
      display: flex;
      margin: 0 auto;
      width: 300px;
      height: 52px;
      background: #ebf2ff;
      border-radius: 6px 6px 6px 6px;

      input {
        width: 194px;
        height: 100%;
        background: #ebf2ff;
        border: none;
        padding-left: 17px;
        border-radius: 6px 6px 6px 6px;
        font-size: 18px;
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
          color: #0359bd;
        }

        .max {
          width: 50px;
          height: 26px;
          background: #0359bd;
          border-radius: 2px 2px 2px 2px;
          font-weight: 500;
          font-size: 14px;
          color: #ffffff;
          text-align: center;
          line-height: 26px;
        }
      }

      .balance_not_enough {
        position: absolute;
        bottom: -20px;
        font-weight: 400;
        font-size: 12px;
        color: #ff0000;
      }

      .keyong {
        position: absolute;
        bottom: -20px;
        right: 0px;
        font-weight: 400;
        font-size: 12px;
        color: #313c5b;
      }
    }

    .input2 {
      input {
        width: 100%;
        color: rgba(49, 60, 91, 0.3);
      }
    }

    .btns {
      display: flex;
      padding: 0 17px;
      margin-top: 44px;
      margin-bottom: 30px;
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
        background: #d9d9d9;
        color: #2f354d;
      }

      .confirm {
        background: #0359bd;
        color: #ffffff;
      }
    }

    .mt18 {
      margin-top: 18px;
    }

    .mt34 {
      margin-top: 34px;
    }

    .center_btns {
      justify-content: center;
    }
  }
}
</style>
