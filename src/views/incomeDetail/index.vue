<template>
  <div class='wrap'>
    <Banner :menu="menu" :showWallect="true" :defaults="true"></Banner>
    <div class="control df aic fdc">
      <p class="c999 mb10">账户余额(USDT)</p>
      <p class="fw7 fz30">9,856.00</p>
      <p class="fz14 gray mt20">团队累积收益: 1,547.00USDT</p>
      <div class="btns df aic jcse">
        <div class="with" @click="$router.push('/withdraw')">提现</div>
        <div class="recharge">充值</div>
      </div>
    </div>
    <div class="content bsbb">
      <van-tabs v-model:active="active" shrink @change="changeType">
        <van-tab title="全部">
          <div class="all" v-if="formData.length">
            <div class="item df aic jcsb" v-for="(v, i) in formData" :key="i">
              <div class="df fdc">
                <p class="fw7 fz14 b2 mb10">{{ typeList[v.type] }}收益</p>
                <p class="gray fz14">{{ getHMS(v.createtime) }}</p>
              </div>
              <div class="df aic jcsb">
               <p class="fz16 b1 fw7">+{{ (v.mun*1).toFixed(2) }}USDT</p>
              </div>
            </div>
          </div>
          <div class="nodata df aic jcc mt40 fz20 b2" v-else>
            暂无数据
          </div>
        </van-tab>
        <van-tab title="理财">
          <div class="recharge" v-if="formData.length">
            <div class="item df aic jcsb" v-for="(v, i) in formData" :key="i">
              <div class="df fdc">
                <p class="fw7 fz14 b2 mb10">{{ typeList[v.type] }}收益</p>
                <p class="gray fz14">{{ getHMS(v.createtime) }}</p>
              </div>
              <div class="df aic jcsb">
                <p class="fz16 b1 fw7">+{{ (v.mun*1).toFixed(2) }}USDT</p>
              </div>
            </div>
          </div>
          <div class="nodata df aic jcc mt40 fz20 b2" v-else>
            暂无数据
          </div>
        </van-tab>
        <van-tab title="复利">
          <div class="withdraw" v-if="formData.length">
            <div class="item df aic jcsb" v-for="(v, i) in formData" :key="i">
              <div class="df fdc">
                <p class="fw7 fz14 b2 mb10">{{ typeList[v.type] }}收益</p>
                <p class="gray fz14">{{ getHMS(v.createtime) }}</p>
              </div>
              <div class="df aic jcsb">
                <p class="fz16 b1 fw7">+{{ (v.mun*1).toFixed(2) }}USDT</p>
              </div>
            </div>
          </div>
          <div class="nodata df aic jcc mt40 fz20 b2" v-else>
            暂无数据
          </div>
        </van-tab>
        <van-tab title="推荐">
          <div class="transfer content" v-if="formData.length">
            <div class="item df aic jcsb" v-for="(v, i) in formData" :key="i">
              <div class="df fdc">
                <p class="fw7 fz14 b2 mb10">{{ typeList[v.type] }}收益</p>
                <p class="gray fz14">{{ getHMS(v.createtime) }}</p>
              </div>
              <div class="df aic jcsb">
               <p class="fz16 b1 fw7">+{{ (v.mun*1).toFixed(2) }}USDT</p>
              </div>
            </div>
          </div>
          <div class="nodata df aic jcc mt40 fz20 b2" v-else>
            暂无数据
          </div>
        </van-tab>
        <van-tab title="团队">
          <div class="transfer" v-if="formData.length">
            <div class="item df aic jcsb" v-for="(v, i) in formData" :key="i">
              <div class="df fdc">
                <p class="fw7 fz14 b2 mb10">{{ typeList[v.type] }}收益</p>
                <p class="gray fz14">{{ getHMS(v.createtime) }}</p>
              </div>
              <div class="df aic jcsb">
                <p class="fz16 b1 fw7">+{{ (v.mun*1).toFixed(2) }}USDT</p>
              </div>
            </div>
          </div>
          <div class="nodata df aic jcc mt40 fz20 b2" v-else>
            暂无数据
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <Menu ref="menu"></Menu>
  </div>
</template>

<script setup lang="ts" name="Home">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router'
import Menu from '@/components/Menu.vue'
import Banner from '@/components/Banner.vue'
import { getFinancialList } from '../../service/api'
import { getHMS } from '../../utils/utils'
const menu = ref()
const $router = useRouter()
const active = ref(0)

const params = ref({
  var_page: 1,
  list_rows: 10,
  award_type: 0
})
const typeList = ref([
  '理财',
  '复利',
  '推荐',
  '团队'
])
const formData = ref<any>([])
const changeType = (number: number) => {
  params.value.award_type = number
}

const getData = () => {
  getFinancialList(params.value).then((res: any) => {
    formData.value = res.data.data.data
  })
}
getData()
watch(() => params.value.award_type, () => {
  getData()
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

    .btns {
      width: 100%;
      font-size: 14px;
      margin-top: 20px;

      .with {
        background-color: #fff;
        border-radius: 8px;
        padding: 8px 25px;
        border: 1px solid #0359BD;
        color: #0359BD;
      }

      .recharge {
        background-color: #0359BD;
        border-radius: 8px;
        padding: 8px 25px;
        border: 1px solid #0359BD;
        color: #fff;
      }
    }
  }

  .content {
    .item {
      background: #fff;
      border-radius: 20px;
      padding: 15px 20px;
      box-sizing: border-box;
      margin-bottom: 20px;
    }
  }
}
</style>