<template>
    <div class="detail">
        <div class="top df aic jcsb p20 bsbb">
            <div class="df aic">
                <img src="../../assets/images/lefticon.png" style="width:10px;"  @click="$router.go(-1)">
                <p style="color: #313C5B;font-size: 14px;margin-left: 20px;font-weight: 700;">Back</p>
            </div>
            <p class="bl fz14 fw7">记录详情</p>
            <p style="width: 40px;"></p>
        </div>
        <div class="content mt20">
            <van-tabs v-model:active="active" shrink>
                <van-tab title="全部">
                    <div class="all content">
                        <div class="item df fdc" @click="goInnerDetail('提现',listType.success.type)">
                            <div class="df aic jcsb mb15">
                                <p style="color: #0E1446;" class="fw7 fz14">USDT : 45.00 提现成功</p>
                                <p class="fw7 fz14" :style="{color:listType.success.color}">{{ listType.success.text }}</p>
                            </div>
                            <div class="df aic jcsb">
                                <p style="color: #93989F;font-size: 14px;">接收方: 0x..5457</p>
                                <p style="color: #93989F;font-size: 14px;">2024/02/28 15:00:00</p>
                            </div>
                        </div>
                        <div class="item df fdc"  @click="goInnerDetail('提现',listType.failed.type)">
                            <div class="df aic jcsb mb15">
                                <p style="color: #0E1446;" class="fw7 fz14">USDT : 45.00 提现失败</p>
                                <p class="fw7 fz14" :style="{color:listType.failed.color}">{{ listType.failed.text }}</p>
                            </div>
                            <div class="df aic jcsb">
                                <p style="color: #93989F;font-size: 14px;">接收方: 0x..5457</p>
                                <p style="color: #93989F;font-size: 14px;">2024/02/28 15:00:00</p>
                            </div>
                        </div>
                        <div class="item df fdc"   @click="goInnerDetail('提现',listType.default.type)">
                            <div class="df aic jcsb mb15">
                                <p style="color: #0E1446;" class="fw7 fz14">USDT : 45.00 提现中</p>
                                <p class="fw7 fz14" :style="{color:listType.default.color}">{{ listType.default.text }}</p>
                            </div>
                            <div class="df aic jcsb">
                                <p style="color: #93989F;font-size: 14px;">接收方: 0x..5457</p>
                                <p style="color: #93989F;font-size: 14px;">2024/02/28 15:00:00</p>
                            </div>
                        </div>
                        <div class="item df fdc">
                            <div class="df aic jcsb mb15">
                                <p style="color: #0E1446;" class="fw7 fz14">USDT : 45.00 充值中</p>
                                <p class="fw7 fz14" :style="{color:listType.default.color}">{{ listType.default.text }}</p>
                            </div>
                            <div class="df aic jcsb">
                                <p style="color: #93989F;font-size: 14px;">接收方: 0x..5457</p>
                                <p style="color: #93989F;font-size: 14px;">2024/02/28 15:00:00</p>
                            </div>
                        </div>
                        <div class="item df fdc">
                            <div class="df aic jcsb mb15">
                                <p style="color: #0E1446;" class="fw7 fz14">USDT : 45.00 转账成功</p>
                                <p class="fw7 fz14" :style="{color:listType.success.color}">{{ listType.success.text }}</p>
                            </div>
                            <div class="df aic jcsb">
                                <p style="color: #93989F;font-size: 14px;">接收方: 0x..5457</p>
                                <p style="color: #93989F;font-size: 14px;">2024/02/28 15:00:00</p>
                            </div>
                        </div>
                    </div>
                </van-tab>
                <van-tab title="充值">
                    <div class="recharge content">
                        <div class="item df fdc">
                            <div class="df aic jcsb mb15">
                                <p style="color: #0E1446;" class="fw7 fz14">USDT : 45.00 充值中</p>
                                <p class="fw7 fz14" :style="{color:listType.default.color}">{{ listType.default.text }}</p>
                            </div>
                            <div class="df aic jcsb">
                                <p style="color: #93989F;font-size: 14px;">接收方: 0x..5457</p>
                                <p style="color: #93989F;font-size: 14px;">2024/02/28 15:00:00</p>
                            </div>
                        </div>
                    </div>
                </van-tab>
                <van-tab title="提现">
                    <div class="withdraw content">
                        <div class="item df fdc">
                            <div class="df aic jcsb mb15">
                                <p style="color: #0E1446;" class="fw7 fz14">USDT : 45.00 提现成功</p>
                                <p class="fw7 fz14" :style="{color:listType.success.color}">{{ listType.success.text }}</p>
                            </div>
                            <div class="df aic jcsb">
                                <p style="color: #93989F;font-size: 14px;">接收方: 0x..5457</p>
                                <p style="color: #93989F;font-size: 14px;">2024/02/28 15:00:00</p>
                            </div>
                        </div>
                        <div class="item df fdc">
                            <div class="df aic jcsb mb15">
                                <p style="color: #0E1446;" class="fw7 fz14">USDT : 45.00 提现失败</p>
                                <p class="fw7 fz14" :style="{color:listType.failed.color}">{{ listType.failed.text }}</p>
                            </div>
                            <div class="df aic jcsb">
                                <p style="color: #93989F;font-size: 14px;">接收方: 0x..5457</p>
                                <p style="color: #93989F;font-size: 14px;">2024/02/28 15:00:00</p>
                            </div>
                        </div>
                    </div>
                </van-tab>
                <van-tab title="转账">
                    <div class="transfer content">
                        <div class="item df fdc">
                            <div class="df aic jcsb mb15">
                                <p style="color: #0E1446;" class="fw7 fz14">USDT : 45.00 转账成功</p>
                                <p class="fw7 fz14" :style="{color:listType.success.color}">{{ listType.success.text }}</p>
                            </div>
                            <div class="df aic jcsb">
                                <p style="color: #93989F;font-size: 14px;">接收方: 0x..5457</p>
                                <p style="color: #93989F;font-size: 14px;">2024/02/28 15:00:00</p>
                            </div>
                        </div>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter ,useRoute} from 'vue-router'
import { getWithdrawList } from '@/service/api'
const $router = useRouter()
const $route = useRoute()
const active = ref(0)
const formData = ref([])

const listType = ref({
    success:{color:'#4CCD78',text:'已完成',type:0},
    failed:{color:'#FF0000',text:'失败',type:1},
    default:{color:'#313C5B',text:'待确认',type:2},
})

const goInnerDetail = (status:any,type:any)=>{
    $router.push({
        path:'withdrawinner',
        query:{
            status:status,//状态
            type:type,//类型
        }
    })
}

const getFormData = ()=>{
    getWithdrawList().then((res:any)=>{
        if(res.code == 200){
            formData.value = res.result
        }
    })
}
</script>

<style lang="scss" scoped>
p{
    padding: 0;
    margin:0;
    font-size: 16px;
}
::v-deep .van-tabs__nav{
    background-color: #F7F7F7;
}
::v-deep .van-tab--active{
    color: #fff;
    background-color: #0359BD;
}
::v-deep .van-tab{
    padding:5px 12px;
    height: 30px;
    border: 1px solid #ddd;
    border-radius: 15px;
    margin-right: 10px;
    
}
::v-deep .van-tabs__line{
    background: transparent;
}
::v-deep .van-tab__panel{
    padding: 10px 20px;
    box-sizing: border-box;
}

.bl {
    color: #313C5B;
}

.detail {
    background-color: #F7F7F7;
    min-height: 100vh;
    .content{
        .item{
            background: #fff;
            border-radius: 20px;
            padding: 20px;
            box-sizing: border-box;
            margin-bottom: 20px;
        }
    }
}
</style>