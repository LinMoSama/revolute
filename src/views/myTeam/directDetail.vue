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
        <div class="content mt20 p120 bsbb" ref="contentRef" v-if="formData.length" @scroll="loadMore">
            <div class="item df fdc" v-for="(v, i) in formData" :key="i" :class="v.level ? '' : 'active'">
                <div class="df aic jcsb" style="border-bottom:1px dashed #f7f7f7;padding-bottom:20px">
                    <div class="df aic">
                        <img :src="v.url" style="width:30px">
                        <p class="fz12 b2 fw7">{{ hiddenUserAccount(v.username) }}</p>
                    </div>
                    <div class="df aic jcsb ani" v-if="v.level">
                        <img src="../../assets/images/lv1.png" style="width:18px;margin-right:5px">
                        <p class="fz12">V{{ v.level }}</p>
                    </div>
                </div>
                <div class="df aic jcsb mt20" style="width:100%">
                    <div class="df fdc aic" style="width:50%">
                        <p class="gray fz12" style="padding-bottom:20px">团队人数</p>
                        <p class="b2 fz14 fw7">{{ v.team_coun }}</p>
                    </div>
                    <p style="color:#f7f7f7">|</p>
                    <div class="df fdc aic" style="width:50%">
                        <p class="gray fz12" style="padding-bottom:20px">团队业绩 (USDT)</p>
                        <p class="b2 fz14 fw7">{{ formatDecimal(v.team_fic * 1) }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="nodata df aic jcc mt40 fz20 b2" v-else>
            暂无数据
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { getUserRecommendList } from '../../service/api'
import { hiddenUserAccount, getHMS,formatDecimal } from '../../utils/utils'
import { showSuccessToast, showFailToast } from 'vant';
const $router = useRouter()
const $route = useRoute()
const contentRef = ref<any>(null)

const params = ref<any>({
    var_page: 1,
    list_rows: 10
})

// 触底加载
const loadMore = () => {
    const activeRef = contentRef.value
    if (activeRef.scrollTop + activeRef.clientHeight >= activeRef.scrollHeight) {
        pageAdd()
    }
}
const pageAdd = async () => {
    const nowPage = await ++params.value.var_page
    getUserRecommendList({
        var_page: nowPage,
        list_rows: params.value.list_rows,
    }).then((res: any) => {
        if (!res.data.data.data.length) {
            showFailToast('到底了')
        } else {
            formData.value = [...formData.value, ...res.data.data.data]
        }
    })
}
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
        max-height: 500px;
        overflow-y: scroll;

        .item {
            background: #fff;
            border-radius: 20px;
            padding: 20px;
            box-sizing: border-box;
            margin-bottom: 20px;

            &.active {
                background: url('../../assets/images/lv0.png') no-repeat center;
                background-size: cover;
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