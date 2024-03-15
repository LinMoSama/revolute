<template>
  <div class="wrap">
    <Banner :menu="menu" :showSwiper="true" :showWallect="true" :defaults="true"
      :isShowReferenceHandler="isShowReferenceHandler"></Banner>
    <div class="control df aic jcsb" :class="!hasTeam ? 'active' : '' || formData.user_level == 0 ? 'active' : ''">
      <div class=" df aic">
        <!-- <img :src="levelArr[formData.user_level - 1]" style="width: 30px" /> -->
        <img :src="userInfo.avatar" style="width: 50px;height: 50px;border-radius: 50%;" />
        <div class="ml20">
          <p class="b2 mb10">{{ hiddenUserAccount(account) }}</p>
          <p class="gray">
            <span>团队收益率:</span>
            <!-- <span v-if="hasTeam"> {{ formatDecimal(formData.team_sum * 1)}} %</span> -->
            <span v-if="hasTeam"> {{ formatDecimal(formData.team_award_team * 1)}} %</span>
            <span v-else>-- %</span>
          </p>
        </div>
      </div>
      <div class="level df aic jcsb" v-if="hasTeam && formData.user_level !== 0">
        <img :src="levelArr[formData.user_level - 1]" style="width: 15px; margin-right: 5px" />
        <p class="cfff">V{{ formData.user_level }}</p>
      </div>
    </div>
    <div class="detail df fdc bsbb">
      <div class="df aic jcsb">
        <p class="fz12 gray">我的团队</p>
        <div class="fz12 b1 df aic" @click="$router.push('/teamDetail')">
          <p>查看成员</p>
          <img src="../../assets/images/righticon.png" style="width: 10px" />
        </div>
      </div>
      <div class="direct mt20 df fdc">
        <div class="df aic jcsb">
          <div class="df aic">
            <img src="../../assets/images/team.png" style="width: 26px; margin-right: 5px" />
            <p class="fz12">
              <span>直推有效还差</span>
              <span v-if="formData.recommend_count">1人</span>
              <span v-else>2人</span>
            </p>
            <img src="../../assets/images/upper.png" style="width: 20px; margin-left: 10px" />
          </div>
          <div class="yell df aic">
            <p>收益率 :</p>
            <p v-if="hasTeam"> {{ formData.team_award_recommend }}%</p>
            <p class="fz12" v-else>0%</p>
          </div>
        </div>
        <div class="df aic jcsb box">
          <div class="df fdc">
            <p class="mb20">直推有效人数 (人)</p>
            <p class="fw7 fz16" v-if="formData.recommend_count">{{ formData.recommend_count }}</p>
            <p class="fw7 fz16" v-else>--</p>
          </div>
          <div class="df fdc">
            <p class="mb20">团队有效人数 (人)</p>
            <p class="fw7 fz16" v-if="formData.team_coun">{{ formData.team_coun }}</p>
            <p class="fw7 fz16" v-else>--</p>
          </div>
        </div>
      </div>
      <div class="upp df fdc mt20">
        <div class="df aic jcsb">
          <div class="df aic">
            <img src="../../assets/images/data.png" style="width: 26px; margin-right: 5px" />
            <p class="fz12" v-if="hasTeam">{{ formData.level_if }}</p>
            <p class="fz12" v-else>--</p>
          </div>
          <div class="yell df aic">
            <p>收益率 :</p>
            <!-- <p v-if="hasTeam"> {{ formData.team_award_team }}%</p> -->
            <p v-if="hasTeam">{{ formatDecimal(formData.team_award_team * 1) }} %</p>
            <p class="fz12" v-else>0%</p>
          </div>
        </div>
        <div class="df aic jcsb box">
          <div class="df fdc">
            <p class="mb20">直推业绩 (USDT)</p>
            <p class="fw7 fz16" v-if="hasTeam">{{ formatDecimal(formData.recommend_sum * 1) }}</p>
            <p class="fz12" v-else>--</p>
          </div>
          <div class="df fdc">
            <p class="mb20">团队业绩 (USDT)</p>
            <p class="fw7 fz16" v-if="hasTeam">
              {{ formatDecimal(formData.team_finc_sum * 1) }}
            </p>
            <p class="fz12" v-else>--</p>
          </div>
        </div>
      </div>
    </div>
    <div class="content bsbb mt20">
      <van-tabs v-model:active="active" shrink @change="changeType">
        <van-tab title="推荐奖励" name=0>
          <div class="direct cont" ref="directRef" v-if="dataList.length" @scroll="loadMore">
            <div class="item df aic jcsb" v-for="( v, i ) in  dataList " :key="i">
              <div class="df fdc">
                <p class="fw7 fz14 b2 mb10">推荐奖励</p>
                <p class="fw7 fz14 b2 mb10">{{ getHMS(v.createtime * 1000) }}</p>
              </div>
              <div class="df fdc">
                <p class="b1 fz14">+{{ formatDecimal(v.mun * 1) }} USDT</p>
              </div>
            </div>
          </div>
          <div class="nodata df aic jcc mt40 fz20 b2" v-else>
            暂无数据
          </div>
        </van-tab>
        <van-tab title="团队奖励" name=1>
          <div class="withdraw cont" ref="rewardRef" v-if="dataList.length" @scroll="loadMore">
            <div class="item df aic jcsb" v-for="( v, i ) in  dataList " :key="i">
              <div class="df fdc">
                <p class="fw7 fz14 b2 mb10">团队奖励</p>
                <p class="fw7 fz14 b2 mb10">{{ getHMS(v.createtime * 1000) }}</p>
              </div>
              <div class="df fdc">
                <p class="b1 fz14">+{{ formatDecimal(v.mun * 1) }} USDT</p>
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
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import Menu from "@/components/Menu.vue";
import Banner from "@/components/Banner.vue";
import { getUserTeam, getFinancialList } from "../../service/api";
import { hiddenUserAccount, getHMS,formatDecimal } from "../../utils/utils";
import { showSuccessToast, showFailToast } from 'vant';
import useIndex from '@/hooks/useIndex'
const { isShowReferenceHandler } = useIndex()
const menu = ref();
const $router = useRouter();
const active = ref(0);
const account = ref(sessionStorage.getItem("account"));
const levelArr = ref([
  '/src/assets/images/lv1.png',
  '/src/assets/images/lv2.png',
  '/src/assets/images/lv3.png',
  '/src/assets/images/lv4.png',
  '/src/assets/images/lv5.png',
  '/src/assets/images/lv6.png',
])
const params = ref<any>({
  var_page: 1,
  list_rows: 10,
  award_type: 3,
});
const formData = ref<any>({});
const dataList = ref<any>([]);
const changeType = (number: number) => {
  if (number == 0) {
    params.value.award_type = 3;
  } else {
    params.value.award_type = 4;
  }
  active.value = number
};
const userInfo = ref<any>(JSON.parse(sessionStorage.getItem('userInfo')!))

const directRef = ref<any>(null)
const rewardRef = ref<any>(null)
const refList = ref<any>([
  directRef,
  rewardRef,
])

// 触底加载
const loadMore = () => {
  const activeRef = refList.value[active.value]
  if (activeRef.value.scrollTop + activeRef.value.clientHeight >= activeRef.value.scrollHeight) {
    pageAdd()
  }
}
const pageAdd = async () => {
  const nowPage = await ++params.value.var_page
  getFinancialList({
    var_page: nowPage,
    list_rows: params.value.list_rows,
    award_type: params.value.award_type
  }).then((res: any) => {
    if (!res.data.data.data.length) {
      showFailToast('到底了')
    } else {
      dataList.value = [...dataList.value, ...res.data.data.data]
    }
  })
}
const hasTeam = ref(true)
const getUserTeamInfo = () => {
  getUserTeam().then((res: any) => {
    if (!res.data.data) {
      hasTeam.value = false
    } else {
      formData.value = res.data.data;
    }

  });
};

const getListData = () => {
  getFinancialList(params.value).then((res: any) => {
    dataList.value = res.data.data.data;
  });
};
watch(
  () => params.value.award_type,
  () => {
    getListData();
  }
);

onMounted(() => {
  getUserTeamInfo();
  getListData();
});
</script>

<style scoped lang="scss">
::v-deep .van-tabs__nav {
  background-color: #f7f7f7;
}

::v-deep .van-tab--active {
  color: #fff;
  background-color: #0359bd;
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
  color: #0e1446;
}

.wrap {
  display: flex;
  flex-direction: column;
  background-color: #f7f7f7;
  overflow: auto;

  .control {
    padding: 15px;
    width: 325px;
    height: 90px;
    background: #ffffff;
    border-radius: 10px 10px 10px 10px;
    transform: translateY(-45%);
    margin: 0 auto;

    &.active {
      background: url('../../assets/images/lv0.png') no-repeat center;
      background-size: cover;
    }

    p {
      font-size: 14px;
    }

    .level {
      background-color: #005abd;
      border-radius: 20px;
      padding: 5px 10px;
      box-sizing: border-box;
    }
  }

  .detail {
    padding: 0 20px;

    .direct {
      background-color: #005abd;
      border-radius: 10px;
      padding: 20px 0 20px 20px;
      box-sizing: border-box;
      color: #fff;

      .yell {
        background-color: #ffb41c;
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
      background-color: #ffb41c;
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

    .cont {
      max-height: 500px;
      overflow-y: scroll;

    }
  }
}
</style>