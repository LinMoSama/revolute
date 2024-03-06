<template>
    <div class="detail">
        <div class="top df aic jcsb p20 bsbb">
            <div class="df aic">
                <img src="../../assets/images/lefticon.png" style="width:10px;" @click="$router.go(-1)">
                <p style="color: #313C5B;font-size: 14px;margin-left: 20px;font-weight: 700;">Back</p>
            </div>
            <p class="bl fz14 fw7">团队成员</p>
            <p style="width: 50px;font-size: 12px;" class="b1" @click="$router.push('/teamDirectDetail')">直推详细</p>
        </div>
        <div class="p120 bsbb box">
            <div class="boxs df aic jcsb">
                <div class="df fdc">
                    <p style="margin-bottom: 20px;font-size: 14px;">直推人数 (人)</p>
                    <p class="fw7 fz16 mt20">{{ formData.recommend_count }}</p>
                </div>
                <div class="df fdc">
                    <p style="margin-bottom: 20px;font-size: 14px;">团队人数 (人)</p>
                    <p class="fw7 fz16">{{ formData.team_coun }}</p>
                </div>
            </div>
        </div>
        <div class="content mt20 p120 bsbb">
            <van-tabs v-model:active="active" shrink @change="changeType">
                <!-- <van-tab title="全部">
                    <div class="all content">
                        <div class="item df fdc" v-for="(v, i) in allList" :key="i">
                            <div class="df aic jcsb mb15">
                                <p style="color: #0E1446;" class="fw7 fz14">
                                    <span>{{ hiddenUserAccount(v.username) }}</span>
                                </p>
                                <p class="fw7 fz14 b2">直推人员</p>
                            </div>
                            <div class="df aic jcsb">
                                <p style="color: #93989F;font-size: 14px;">{{ getHMS(v.createtime * 100) }}</p>
                            </div>
                        </div>
                    </div>
                </van-tab> -->
                <van-tab title="直推人员" name=0>
                    <div class="direct cont" ref="directRef" v-if="recommendList.length" @scroll="loadMore">
                        <div class="item df fdc" v-for="(v, i) in recommendList" :key="i">
                            <div class="df aic jcsb mb15">
                                <p style="color: #0E1446;" class="fw7 fz14">
                                    <span>{{ hiddenUserAccount(v.username) }}</span>
                                </p>
                                <p class="fw7 fz14 b2">直推人员</p>
                            </div>
                            <div class="df aic jcsb">
                                <p style="color: #93989F;font-size: 14px;">{{ getHMS(v.createtime * 100) }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="nodata df aic jcc mt40 fz20 b2" v-else>
                        暂无数据
                    </div>
                </van-tab>
                <van-tab title="团队人员" name=1>
                    <div class="withdraw cont" ref="teamRef" v-if="teamList.length" @scroll="loadMore">
                        <div class="item df fdc" v-for="(v, i) in teamList" :key="i">
                            <div class="df aic jcsb mb15">
                                <p style="color: #0E1446;" class="fw7 fz14">
                                    <span>{{ hiddenUserAccount(v.username) }}</span>
                                </p>
                                <p class="fw7 fz14 b2">团队人员</p>
                            </div>
                            <div class="df aic jcsb">
                                <p style="color: #93989F;font-size: 14px;">{{ getHMS(v.createtime * 100) }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="nodata df aic jcc mt40 fz20 b2" v-else>
                        暂无数据
                    </div>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { getUserTeamList } from '../../service/api'
import { hiddenUserAccount, getHMS } from '../../utils/utils'
import { showSuccessToast, showFailToast } from 'vant';
const $router = useRouter()
const $route = useRoute()
const active = ref(0)

const params = ref<any>({
    var_page: 1,
    list_rows: 10
})
const formData = ref<any>({})
const allList = ref<any>([])
const recommendList = ref<any>([])
const teamList = ref<any>([])

const changeType = (number: number) => {
    active.value = number
}
const directRef = ref<any>(null)
const teamRef = ref<any>(null)
const refList = ref<any>([
    directRef,
    teamRef,
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
    getUserTeamList({
        var_page: nowPage,
        list_rows: params.value.list_rows,
    }).then((res: any) => {
        if (!res.data.data.data.length) {
            showFailToast('到底了')
        } else {
            recommendList.value = [...res.data.data.data, ...recommendList.value]
            teamList.value = [...res.data.data.data, ...teamList.value]
        }
    })
}
const getData = () => {
    getUserTeamList(params.value).then((res: any) => {
        formData.value = res.data.data
        allList.value = [...res.data.data.recommend_list.data, ...res.data.data.team_list.data]
        recommendList.value = res.data.data.recommend_list.data
        teamList.value = res.data.data.team_list.data
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

        .cont {
            max-height: 500px;
            overflow-y: scroll;

        }
    }
}
</style>