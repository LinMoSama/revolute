<template>
    <div class="detail">
        <div class="top df aic jcsb p20 bsbb">
            <div class="df aic">
                <img src="../../assets/images/lefticon.png" style="width:10px;"  @click="$router.go(-1)">
                <p style="color: #313C5B;font-size: 14px;margin-left: 20px;font-weight: 700;">Back</p>
            </div>
            <p class="bl fz14 fw7">团队成员</p>
            <p style="width: 40px;"></p>
        </div>
        <div class="p120 bsbb box">
            <div class="boxs df aic jcsb">
                <div class="df fdc">
                    <p style="margin-bottom: 20px;font-size: 14px;">直推人数 (人)</p>
                    <p class="fw7 fz16 mt20">2</p>
                </div>
                <div class="df fdc">
                    <p style="margin-bottom: 20px;font-size: 14px;">间接人数 (人)</p>
                    <p class="fw7 fz16">12</p>
                </div>
            </div>
        </div>
        <div class="content mt20 p120 bsbb">
            <van-tabs v-model:active="active" shrink>
                <van-tab title="全部">
                    <div class="all content">
                        <div class="item df fdc">
                            <div class="df aic jcsb mb15">
                                <p style="color: #0E1446;" class="fw7 fz14">
                                    <span>0x...sdf4</span>
                                    <span class="ani">一代</span>
                                </p>
                                <p class="fw7 fz14 b2">直推人员</p>
                            </div>
                            <div class="df aic jcsb">
                                <p style="color: #93989F;font-size: 14px;">2024/02/28 15:00:00</p>
                                <p style="color: #93989F;font-size: 14px;">+10.00 USDT</p>
                            </div>
                        </div>
                        <div class="item df fdc">
                            <div class="df aic jcsb mb15">
                                <p style="color: #0E1446;" class="fw7 fz14">
                                    <span>0x...sdf4</span>
                                    <span class="ani">二代</span>
                                </p>
                                <p class="fw7 fz14 b2">团队人员</p>
                            </div>
                            <div class="df aic jcsb">
                                <p style="color: #93989F;font-size: 14px;">2024/02/28 15:00:00</p>
                                <p style="color: #93989F;font-size: 14px;">+10.00 USDT</p>
                            </div>
                        </div>
                        <div class="item df fdc">
                            <div class="df aic jcsb mb15">
                                <p style="color: #0E1446;" class="fw7 fz14">
                                    <span>0x...sdf4</span>
                                    <span class="ani">一代</span>
                                </p>
                                <p class="fw7 fz14 b2">直推人员</p>
                            </div>
                            <div class="df aic jcsb">
                                <p style="color: #93989F;font-size: 14px;">2024/02/28 15:00:00</p>
                                <p style="color: #93989F;font-size: 14px;">+10.00 USDT</p>
                            </div>
                        </div>
                    </div>
                </van-tab>
                <van-tab title="直推人员">
                    <div class="recharge content">
                        <div class="item df fdc">
                            <div class="df aic jcsb mb15">
                                <p style="color: #0E1446;" class="fw7 fz14">
                                    <span>0x...sdf4</span>
                                    <span class="ani">一代</span>
                                </p>
                                <p class="fw7 fz14 b2">直推人员</p>
                            </div>
                            <div class="df aic jcsb">
                                <p style="color: #93989F;font-size: 14px;">2024/02/28 15:00:00</p>
                                <p style="color: #93989F;font-size: 14px;">+10.00 USDT</p>
                            </div>
                        </div>
                    </div>
                </van-tab>
                <van-tab title="团队人员">
                    <div class="withdraw content">
                        <div class="item df fdc">
                            <div class="df aic jcsb mb15">
                                <p style="color: #0E1446;" class="fw7 fz14">
                                    <span>0x...sdf4</span>
                                    <span class="ani">二代</span>
                                </p>
                                <p class="fw7 fz14 b2">团队人员</p>
                            </div>
                            <div class="df aic jcsb">
                                <p style="color: #93989F;font-size: 14px;">2024/02/28 15:00:00</p>
                                <p style="color: #93989F;font-size: 14px;">+10.00 USDT</p>
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
const $router = useRouter()
const $route = useRoute()
const active = ref(0)
const colorArr = ref({
    success:'#4CCD78',
    failed:'#FF0000',
    default:'#313C5B'
})
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
    padding: 10px;
    box-sizing: border-box;
}

.bl {
    color: #313C5B;
}

.detail {
    background-color: #F7F7F7;
    min-height: 100vh;
    .boxs{
        background-color: #0359BD;
        border-radius: 10px;
        color: #fff;
        padding: 20px;
        box-sizing: border-box;
        width: 100%;
        height: 80px;
        >div{
            width: 50%;
        }
    }
    .content{
        .item{
            background: #fff;
            border-radius: 20px;
            padding: 20px;
            box-sizing: border-box;
            margin-bottom: 20px;
            .ani{
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