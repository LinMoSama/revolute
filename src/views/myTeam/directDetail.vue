<template>
    <div class="detail">
        <div class="top df aic jcsb p20 bsbb">
            <div class="df aic">
                <img src="../../assets/images/lefticon.png" style="width:10px;" @click="$router.go(-1)">
                <p style="color: #313C5B;font-size: 14px;margin-left: 20px;font-weight: 700;">Back</p>
            </div>
            <p class="bl fz14 fw7">直推详细</p>
            <p style="width: 50px;font-size: 12px;" class="b1"></p>
        </div>
        <div class="content mt20 p120 bsbb">
          <div class="item df fdc" v-for="(v,i) in formData" :key="i">
            <div class="df aic jcsb" style="border-bottom:1px dashed #f7f7f7;padding-bottom:20px">
              <div class="df aic">
                <img :src="v.url" style="width:30px">
                <p class="fz12 b2 fw7">{{hiddenUserAccount(v.username)}}</p>
              </div>
              <div class="df aic jcsb ani">
                <img src="../../assets/images/lv1.png" style="width:18px;margin-right:5px">
                <p class="fz12">V{{v.level}}</p>
              </div>
            </div>
            <div class="df aic jcsb mt20" style="width:100%">
              <div class="df fdc aic" style="width:50%">
                <p class="gray fz12" style="padding-bottom:20px">团队人数</p>
                <p class="b2 fz14 fw7">{{v.team_coun}}</p>
              </div>
              <p style="color:#f7f7f7">|</p>
              <div class="df fdc aic" style="width:50%">
                <p class="gray fz12" style="padding-bottom:20px">团队业绩 (USDT)</p>
                <p class="b2 fz14 fw7">{{(v.team_fic*1).toFixed(2)}}</p>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { getUserRecommendList } from '../../service/api'
import { hiddenUserAccount, getHMS } from '../../utils/utils'
const $router = useRouter()
const $route = useRoute()

const params = ref<any>({
    var_page: 1,
    list_rows: 10
})
const formData = ref<any>({})
const getData = () => {
    getUserRecommendList(params.value).then((res: any) => {
        formData.value = res.data.data.data
    })
}
onMounted(() => {
    getData()
})
</script>

<style lang="scss" scoped>
p {
    padding: 0;
    margin: 0;
    font-size: 16px;
}

::v-deep .van-tabs__nav {
    background-color: #F7F7F7;
}

::v-deep .van-tab--active {
    color: #fff;
    background-color: #0359BD;
}

::v-deep .van-tab {
    padding: 5px 12px;
    height: 30px;
    border: 1px solid #ddd;
    border-radius: 15px;
    margin-right: 10px;

}

::v-deep .van-tabs__line {
    background: transparent;
}

::v-deep .van-tab__panel {
    padding: 10px;
    box-sizing: border-box;
}

.bl {
    color: #313C5B;
}

.detail {
    background-color: #F7F7F7;
    min-height: 100vh;

    .boxs {
        background-color: #0359BD;
        border-radius: 10px;
        color: #fff;
        padding: 20px;
        box-sizing: border-box;
        width: 100%;
        height: 80px;

        >div {
            width: 50%;
        }
    }

    .content {
        .item {
            background: #fff;
            border-radius: 20px;
            padding: 20px;
            box-sizing: border-box;
            margin-bottom: 20px;
            .lev{
              
            }
            .ani {
                background-color: #0359BD;
                border-radius: 20px;
                padding: 3px 10px;
                box-sizing: border-box;
                margin-left: 10px;
                color: #fff;
                font-size: 12px;
            }
        }
    }
}
</style>