<template>
    <div class="detail">
        <van-sticky>
            <div class="top df aic jcsb p20 bsbb">
                <div class="df aic">
                    <img src="../../assets/images/lefticon.png" style="width:10px;" @click="$router.go(-1)">
                    <p style="color: #313C5B;font-size: 14px;margin-left: 20px;font-weight: 700;">Back</p>
                </div>
                <p class="bl fz14 fw7">交易明细</p>
                <p style="width: 40px;"></p>
            </div>
        </van-sticky>
        <div class="content mt20">
            <van-tabs v-model:active="active" sticky shrink @change="changeType" offset-top="20px">
                <van-tab title="全部" name=0>
                    <div class="all cont" ref="allRef" @scroll="loadMore" v-if="formData.length">
                        <div class="item df fdc" v-for="(v, i) in formData" :key="i"
                            @click="goInnerDetail(v.type, stateType[v.status].type, v.id)">
                            <div class="df aic jcsb mb15">
                                <p style="color: #0E1446;" class="fw7 fz14">USDT : {{ (v.mun * 1).toFixed(2) }}
                                    {{ typeList[v.type - 1] }}{{ statusList[v.status - 1] }}</p>
                                <p class="fw7 fz14" :style="{ color: stateType[v.status - 1].color }">{{
                        stateType[v.status - 1].text }}
                                </p>
                            </div>
                            <div class="df aic jcsb">
                                <p v-if="v.type !== 1" style="color: #93989F;font-size: 14px;">接收方:
                                    {{ hiddenUserAccount(v.add_username) }}
                                </p>
                                <p v-else style="color: #93989F;font-size: 14px;">接收方: {{ v.add_username }}
                                </p>
                                <p style="color: #93989F;font-size: 14px;">{{ getHMS((v.createtime * 1000)) }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="nodata df aic jcc mt40 fz20 b2" v-else>
                        暂无数据
                    </div>
                </van-tab>
                <van-tab title="转账" name=1>
                    <div class="transfer cont" ref="transRef" @scroll="loadMore" v-if="formData.length">
                        <div class="item df fdc" v-for="(v, i) in formData" :key="i"
                            @click="goInnerDetail(v.type, stateType[v.status].type, v.id)">
                            <div class="df aic jcsb mb15">
                                <p style="color: #0E1446;" class="fw7 fz14">USDT : {{ (v.mun * 1).toFixed(2) }}
                                    {{ typeList[v.type - 1] }}{{ statusList[v.status - 1] }}</p>
                                <p class="fw7 fz14" :style="{ color: stateType[v.status - 1].color }">{{
                        stateType[v.status - 1].text }}
                                </p>
                            </div>
                            <div class="df aic jcsb">
                                <p v-if="v.type !== 1" style="color: #93989F;font-size: 14px;">接收方:
                                    {{ hiddenUserAccount(v.add_username) }}
                                </p>
                                <p v-else style="color: #93989F;font-size: 14px;">接收方: {{
                        hiddenUserAccount(v.add_username) }}
                                </p>
                                <p style="color: #93989F;font-size: 14px;">{{ getHMS((v.createtime * 1000)) }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="nodata df aic jcc mt40 fz20 b2" v-else>
                        暂无数据
                    </div>
                </van-tab>
                <van-tab title="充值" name=2>
                    <div class="recharge cont" ref="rechargeRef" @scroll="loadMore" v-if="formData.length">
                        <div class="item df fdc" v-for="(v, i) in formData" :key="i"
                            @click="goInnerDetail(v.type, stateType[v.status].type, v.id)">
                            <div class="df aic jcsb mb15">
                                <p style="color: #0E1446;" class="fw7 fz14">USDT : {{ (v.mun * 1).toFixed(2) }}
                                    {{ typeList[v.type - 1] }}{{ statusList[v.status - 1] }}</p>
                                <p class="fw7 fz14" :style="{ color: stateType[v.status - 1].color }">{{
                        stateType[v.status - 1].text }}
                                </p>
                            </div>
                            <div class="df aic jcsb">
                                <p v-if="v.type !== 1" style="color: #93989F;font-size: 14px;">接收方: {{
                        hiddenUserAccount(v.add_username) }}
                                </p>
                                <p v-else style="color: #93989F;font-size: 14px;">接收方: {{
                        v.add_username }}
                                </p>
                                <p style="color: #93989F;font-size: 14px;">{{ getHMS((v.createtime * 1000)) }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="nodata df aic jcc mt40 fz20 b2" v-else>
                        暂无数据
                    </div>
                </van-tab>
                <van-tab title="提现" name=3>
                    <div class="withdraw cont" ref="withdrawRef" @scroll="loadMore" v-if="formData.length">
                        <div class="item df fdc" v-for="(v, i) in formData" :key="i"
                            @click="goInnerDetail(v.type, stateType[v.status].type, v.id)">
                            <div class="df aic jcsb mb15">
                                <p style="color: #0E1446;" class="fw7 fz14">USDT : {{ (v.mun * 1).toFixed(2) }}
                                    {{ typeList[v.type - 1] }}{{ statusList[v.status - 1] }}</p>
                                <p class="fw7 fz14" :style="{ color: stateType[v.status - 1].color }">{{
                        stateType[v.status - 1].text }}
                                </p>
                            </div>
                            <div class="df aic jcsb">
                                <p v-if="v.type !== 1" style="color: #93989F;font-size: 14px;">接收方: {{
                        hiddenUserAccount(v.add_username) }}
                                </p>
                                <p v-else style="color: #93989F;font-size: 14px;">接收方: {{
                                    v.add_username }}
                                </p>
                                <p style="color: #93989F;font-size: 14px;">{{ getHMS((v.createtime * 1000)) }}</p>
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
import { onMounted, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { getTransferList } from '../../service/api'
import { getHMS, hiddenUserAccount } from '../../utils/utils'
import { showSuccessToast, showFailToast } from 'vant';
const $router = useRouter()
const $route = useRoute()
const active = ref<any>($route.query.active ? $route.query.active : 0)
const formData = ref<any>([])
const params = ref<any>({
    var_page: 1,
    list_rows: 10,
    transfer_type: $route.query.active ? $route.query.active : 0
})
const allRef = ref<any>(null)
const transRef = ref<any>(null)
const rechargeRef = ref<any>(null)
const withdrawRef = ref<any>(null)
const refList = ref<any>([
    allRef,
    transRef,
    rechargeRef,
    withdrawRef
])
const changeType = (number: number) => {
    params.value.transfer_type = number * 1
    active.value = number
}
const typeList = ref([
    '转账',
    '充值',
    '提现'
])
const statusList = ref([
    '成功',
    '失败',
    '确认中'
])
const stateType = ref([
    { color: '#4CCD78', text: '已完成', type: 0 },
    { color: '#FF0000', text: '失败', type: 1 },
    { color: '#313C5B', text: '待确认', type: 2 },
])
const goInnerDetail = (status: any, type: any, id: number) => {
    $router.push({
        path: 'withdrawinner',
        query: {
            status: status,//状态
            type: type,//类型
            id: id
        }
    })
}

const getFormData = () => {
    getTransferList(params.value).then((res: any) => {
        formData.value = res.data.data.data
    })
}

// 触底加载
const loadMore = () => {
    const activeRef = refList.value[active.value]
    if (activeRef.value.scrollTop + activeRef.value.clientHeight >= activeRef.value.scrollHeight) {
        pageAdd()
    }
}
const pageAdd = async () => {
    const nowPage = await ++params.value.var_page
    getTransferList({
        var_page: nowPage,
        list_rows: params.value.list_rows,
        transfer_type: params.value.transfer_type
    }).then((res: any) => {
        if (!res.data.data.data.length) {
            showFailToast('到底了')
        } else {
            formData.value = [...res.data.data.data, ...formData.value]
        }
    })
}


watch(() => params.value.transfer_type, () => {
    getFormData()
})
onMounted(async () => {
    if ($route.query.active) {
        active.value = await $route.query.active
    }
    getFormData()
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
    padding: 10px 20px;
    box-sizing: border-box;
}

.bl {
    color: #313C5B;
}

.detail {
    background-color: #F7F7F7;
    min-height: 100vh;
    overflow: hidden;

    .content {
        height: calc(100% - 60px);
        overflow-y: scroll;
        overflow-x: hidden;

        .item {
            background: #fff;
            border-radius: 20px;
            padding: 20px;
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