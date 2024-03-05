<template>
  <div class='wrap'>
    <Banner :menu="menu" :showWallect="true" :defaults="true"></Banner>
    <div class="control df aic jcsb">
      <div class="df aic">
        <img src="../../assets/images/lv1.png" style="width: 30px;">
        <div class="ml20">
          <p class="b2 mb10">{{ hiddenUserAccount(account) }}</p>
          <p class="gray">团队收益率: {{ (formData.team_sum * 1).toFixed(2) }} %</p>
        </div>
      </div>
      <div class="level df aic jcsb">
        <img src="../../assets/images/lv1.png" style="width: 15px;margin-right: 5px;">
        <p class="cfff">V{{ formData.user_level }}</p>
      </div>
    </div>
    <div class="detail df fdc bsbb">
      <div class="df aic jcsb">
        <p class="fz12 gray">我的团队</p>
        <div class="fz12 b1 df aic" @click="$router.push('/teamDetail')">
          <p>查看成员</p>
          <img src="../../assets/images/righticon.png" style="width: 10px;">
        </div>
      </div>
      <div class="direct mt20 df fdc">
        <div class="df aic jcsb">
          <div class="df aic">
            <img src="../../assets/images/team.png" style="width: 26px;margin-right: 5px;">
            <p class="fz12">直推还差1人</p>
            <img src="../../assets/images/upper.png" style="width: 20px;margin-left: 10px;">
          </div>
          <div class="yell">收益率: 10%-15%</div>
        </div>
        <div class="df aic jcsb box">
          <div class="df fdc">
            <p class="mb20">直推人数 (人)</p>
            <p class="fw7 fz16">{{ formData.recommend_count }}</p>
          </div>
          <div class="df fdc">
            <p class="mb20">团队人数 (人)</p>
            <p class="fw7 fz16">{{ formData.team_coun }}</p>
          </div>
        </div>
      </div>
      <div class="upp df fdc mt20">
        <div class="df aic jcsb">
          <div class="df aic">
            <img src="../../assets/images/data.png" style="width: 26px;margin-right: 5px;">
            <p class="fz12">距离V5还差3个V4</p>
          </div>
          <div class="yell">收益率: 10%</div>
        </div>
        <div class="df aic jcsb box">
          <div class="df fdc">
            <p class="mb20">直推业绩 (USDT)</p>
            <p class="fw7 fz16">{{ formData.team_award_recommend }}</p>
          </div>
          <div class="df fdc">
            <p class="mb20">团队业绩 (USDT)</p>
            <p class="fw7 fz16">{{ (formData.team_finc_sum * 1).toFixed(2) }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="content bsbb mt20">
      <van-tabs v-model:active="active" shrink>
        <van-tab title="全部">
          <div class="all">
            <div class="item df fdc">
              <div class="df aic jcsb">
                <p class="fw7 fz14 b2 mb10">0x...sdf4</p>
                <p class="fw7 fz14 b2 mb10">推荐奖励</p>
              </div>
              <div class="df aic jcsb">
                <p class="fz14 gray">2024/02/28 15:00:00</p>
                <p class="gray fz14">+10.00 USDT</p>
              </div>
            </div>
            <div class="item df fdc">
              <div class="df aic jcsb">
                <p class="fw7 fz14 b2 mb10">0x...sdf4</p>
                <p class="fw7 fz14 b2 mb10">团队奖励</p>
              </div>
              <div class="df aic jcsb">
                <p class="fz14 gray">2024/02/28 15:00:00</p>
                <p class="gray fz14">+10.00 USDT</p>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="推荐奖励">
          <div class="recharge">
            <div class="item df fdc">
              <div class="df aic jcsb">
                <p class="fw7 fz14 b2 mb10">0x...sdf4</p>
                <p class="fw7 fz14 b2 mb10">推荐奖励</p>
              </div>
              <div class="df aic jcsb">
                <p class="fz14 gray">2024/02/28 15:00:00</p>
                <p class="gray fz14">+10.00 USDT</p>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="团队奖励">
          <div class="withdraw">
            <div class="item df fdc">
              <div class="df aic jcsb">
                <p class="fw7 fz14 b2 mb10">0x...sdf4</p>
                <p class="fw7 fz14 b2 mb10">团队奖励</p>
              </div>
              <div class="df aic jcsb">
                <p class="fz14 gray">2024/02/28 15:00:00</p>
                <p class="gray fz14">+10.00 USDT</p>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <Menu ref="menu"></Menu>
  </div>
</template>

<script setup lang="ts" name="Home">
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router'
import Menu from '@/components/Menu.vue'
import Banner from '@/components/Banner.vue'
import { getUserTeam } from '../../service/api'
import { hiddenUserAccount } from '../../utils/utils'
const menu = ref()
const $router = useRouter()
const active = ref(0)
const account = ref<any>(localStorage.getItem('account'))
const formData = ref<any>({
  address: '',
  level: ''
})
const getUserTeamInfo = () => {
  getUserTeam().then((res: any) => {
    formData.value = res.data.data
  })
}
onMounted(() => {
  getUserTeamInfo()
})
</script>

<style scoped lang="scss">
::v-deep .van-tabs__nav {
  background-color: #F7F7F7;
}

::v-deep .van-tab--active {
  color: #fff;
  background-color: #0359BD;
  font-weight: normal;
}

::v-deep .van-tab {
  padding: 5px 12px;
  height: 30px;
  border: 1px solid #ddd;
  border-radius: 15px;
  margin-right: 10px;
  font-weight: normal;
}

::v-deep .van-tabs__line {
  background: transparent;
}

::v-deep .van-tab__panel {
  padding: 10px;
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
    height: 90px;
    background: #FFFFFF;
    border-radius: 10px 10px 10px 10px;
    transform: translateY(-45%);
    margin: 0 auto;

    p {
      font-size: 14px;
    }

    .level {
      background-color: #005ABD;
      border-radius: 20px;
      padding: 5px 10px;
      box-sizing: border-box;
    }
  }

  .detail {
    padding: 0 20px;

    .direct {
      background-color: #005ABD;
      border-radius: 10px;
      padding: 20px 0 20px 20px;
      box-sizing: border-box;
      color: #fff;

      .yell {
        background-color: #FFB41C;
        color: #fff;
        padding: 5px 5px 5px 10px;
        box-sizing: border-box;
        border-radius: 20px 0 0 20px;
        font-size: 12px;
      }

      .box {
        color: #fff;
        font-size: 12px;
        margin-top: 30px;

        >div {
          width: 50%;
        }
      }
    }

    .upp {
      background-color: #FFB41C;
      border-radius: 10px;
      padding: 20px 0 20px 20px;
      box-sizing: border-box;
      color: #fff;

      .yell {
        background-color: #fff;
        color: #000;
        padding: 5px 5px 5px 10px;
        box-sizing: border-box;
        border-radius: 20px 0 0 20px;
        font-size: 12px;
      }

      .box {
        color: #fff;
        font-size: 12px;
        margin-top: 30px;

        >div {
          width: 50%;
        }
      }
    }
  }

  .content {
    padding: 0 10px;

    .item {
      background: #fff;
      border-radius: 10px;
      padding: 15px 20px;
      box-sizing: border-box;
      margin-bottom: 20px;
    }
  }
}
</style>