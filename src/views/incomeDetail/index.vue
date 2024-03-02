<template>
  <div class='wrap'>
    <div class="banner df aic">
      <div class="log">
        <img src="@/assets/images/logo.png">
      </div>
      <p style="color: #fff;margin-left: -20px;" class="cfff fz16">收益明细</p>
      <div class="wallet_menu" @click="$router.push('/withdrawdetail')">
        <img src="@/assets/images/menu.png">
      </div>
    </div>
    <div class="control df aic fdc">
      <p class="c999 mb10">账户余额(USDT)</p>
      <p class="fw7 fz30">9,856.00</p>
      <p class="fz14 gray mt20">团队累积收益: 1,547.00USDT</p>
      <div class="btns df aic jcse">
        <div class="with">提现</div>
        <div class="recharge">充值</div>
      </div>
    </div>
    <div class="content bsbb">
      <van-tabs v-model:active="active" shrink>
                <van-tab title="全部">
                    <div class="all">
                        <div class="item df aic jcsb">
                            <div class="df fdc">
                                <p class="fw7 fz14 b2 mb10">理财收益</p>
                                <p class="gray fz14">2024/02/15</p>
                            </div>
                            <div class="df aic jcsb">
                                <p class="fz16 b1 fw7">+45.00USDT</p>
                            </div>
                        </div>
                        <div class="item df aic jcsb">
                            <div class="df fdc">
                                <p class="fw7 fz14 b2 mb10">复利收益</p>
                                <p class="gray fz14">2024/02/15</p>
                            </div>
                            <div class="df aic jcsb">
                                <p class="fz16 b1 fw7">+45.00USDT</p>
                            </div>
                        </div>
                        <div class="item df aic jcsb">
                            <div class="df fdc">
                                <p class="fw7 fz14 b2 mb10">推荐收益</p>
                                <p class="gray fz14">2024/02/15</p>
                            </div>
                            <div class="df aic jcsb">
                                <p class="fz16 b1 fw7">+45.00USDT</p>
                            </div>
                        </div>
                        <div class="item df aic jcsb">
                            <div class="df fdc">
                                <p class="fw7 fz14 b2 mb10">团队收益</p>
                                <p class="gray fz14">2024/02/15</p>
                            </div>
                            <div class="df aic jcsb">
                                <p class="fz16 b1 fw7">+45.00USDT</p>
                            </div>
                        </div>
                    </div>
                </van-tab>
                <van-tab title="理财">
                    <div class="recharge">
                      <div class="item df aic jcsb">
                            <div class="df fdc">
                                <p class="fw7 fz14 b2 mb10">理财收益</p>
                                <p class="gray fz14">2024/02/15</p>
                            </div>
                            <div class="df aic jcsb">
                                <p class="fz16 b1 fw7">+45.00USDT</p>
                            </div>
                        </div>
                    </div>
                </van-tab>
                <van-tab title="复利">
                    <div class="withdraw">
                      <div class="item df aic jcsb">
                            <div class="df fdc">
                                <p class="fw7 fz14 b2 mb10">复利收益</p>
                                <p class="gray fz14">2024/02/15</p>
                            </div>
                            <div class="df aic jcsb">
                                <p class="fz16 b1 fw7">+45.00USDT</p>
                            </div>
                        </div>
                    </div>
                </van-tab>
                <van-tab title="推荐">
                    <div class="transfer content">
                      <div class="item df aic jcsb">
                            <div class="df fdc">
                                <p class="fw7 fz14 b2 mb10">推荐收益</p>
                                <p class="gray fz14">2024/02/15</p>
                            </div>
                            <div class="df aic jcsb">
                                <p class="fz16 b1 fw7">+45.00USDT</p>
                            </div>
                        </div>
                    </div>
                </van-tab>
                <van-tab title="团队">
                    <div class="transfer">
                      <div class="item df aic jcsb">
                            <div class="df fdc">
                                <p class="fw7 fz14 b2 mb10">团队收益</p>
                                <p class="gray fz14">2024/02/15</p>
                            </div>
                            <div class="df aic jcsb">
                                <p class="fz16 b1 fw7">+45.00USDT</p>
                            </div>
                        </div>
                    </div>
                </van-tab>
            </van-tabs>
    </div>
  </div>
</template>

<script setup lang="ts" name="Home">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router'
const $router = useRouter()
const active = ref(0)
const formData = ref({
  toaddress: '',
  amount: ''
})
const flag = ref(false)
watch(() => formData.value.toaddress, () => {
  if (formData.value.toaddress) {
    flag.value = true
  }
})
</script>

<style scoped lang="scss">
::v-deep .van-tabs__nav{
    background-color: #F7F7F7;
}
::v-deep .van-tab--active{
    color: #fff;
    background-color: #0359BD;
    font-weight: normal;
}
::v-deep .van-tab{
    padding:5px 12px;
    height: 30px;
    border: 1px solid #ddd;
    border-radius: 15px;
    margin-right: 10px;
    font-weight: normal;
}
::v-deep .van-tabs__line{
    background: transparent;
}
::v-deep .van-tab__panel{
    padding: 10px 20px;
    box-sizing: border-box;
}

.co {
  color: #0E1446;
}

.wrap {
  display: flex;
  flex-direction: column;
  background-color: #F7F7F7;
  overflow: hidden;
  min-height: 100vh;

  .banner {
    display: flex;
    width: 100%;
    height: 168px;
    padding: 0 25px;
    justify-content: space-between;
    align-items: center;
    background-color: #005ABD;

    .log {
      img {
        width: 90px;
        height: 50px;
      }
    }

    .wallet_menu {
      img {
        width: 24px;
        height: 24px;

        &:first-child {
          margin-right: 16px;
        }
      }
    }


  }

  .control {
    padding: 15px;
    width: 325px;
    height: 170px;
    background: #FFFFFF;
    border-radius: 10px 10px 10px 10px;
    transform: translateY(-25%);
    margin: 0 auto;

    p {
      font-size: 14px;
    }
    .btns{
      width: 100%;
      font-size: 14px;
      margin-top: 20px;
      .with{
        background-color: #fff;
        border-radius: 8px;
        padding: 8px 25px;
        border:1px solid #0359BD;
        color: #0359BD;
      }
      .recharge{
        background-color: #0359BD;
        border-radius: 8px;
        padding: 8px 25px;
        border:1px solid #0359BD;
        color: #fff;
      }
    }
  }

  .content{
      .item{
          background: #fff;
          border-radius: 20px;
          padding: 15px 20px;
          box-sizing: border-box;
          margin-bottom: 20px;
      }
  }
}
</style>