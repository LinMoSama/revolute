<template>
    <div class="inner">
        <div class="top df aic jcsb p20 bsbb">
            <div class="df aic">
                <img src="../../assets/images/lefticon.png" style="width:10px;" @click="$router.go(-1)">
                <p style="color: #313C5B;font-size: 14px;margin-left: 20px;font-weight: 700;">Back</p>
            </div>
            <p class="bl fz14 fw7">{{status}}详情</p>
            <p style="width: 40px;"></p>
        </div>
        <div class="content df aic jcsb fdc">
            <img :src="detailText[type].icon" style="width: 80px;">
            <p class="mt20 fz14" style="color: #0E1446;">
                <span>{{ status }}</span>
                <span v-if="type!==2">{{ detailText[type].type }}</span>
            </p>
            <p class="mt20 fz14" style="color: #93989F;">2024/02/28 15:15:15</p>
            <p class="mt10 fz14" :style="{color:detailText[type].color}"> {{ detailText[type].text }}</p>
        </div>
        <div class="detail p20 bsbb">
            <p class="gray mb15">发送账户</p>
            <div class="df aic jcsb mb15 bb">
                <p class="b2">0x..5457</p>
                <p class="b1 fw7">-150.00USDT</p>
            </div>
            <p class="gray mb15">接受账户</p>
            <div class="df aic jcsb mb15 bb ">
                <p class="b2">0x..3025</p>
                <p class="b1 fw7">+149.50USDT</p>
            </div>
            <p class="mt20 b1 fw7 mb20">详细付款</p>
            <div class="df aic jcsb mb15">
                <p class="gray">提现金额</p>
                <p>240.00USDT</p>
            </div>
            <div class="df aic jcsb mb15">
                <p class="gray">手续费</p>
                <p>0.01%</p>
            </div>
            <div class="df aic jcsb mb15">
                <p class="b2">实际到账</p>
                <p class="b2 fw7">149.50USDT</p>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter ,useRoute} from 'vue-router'
const $router = useRouter()
const $route = useRoute()
const status = ref($route.query.status)
const type = ref<any>(0)
const detailText = ref([
    {icon:'/src/assets/images/succ.png',text:'已完成',type:'成功',color:'#4CCD78'},
    {icon:'/src/assets/images/fail.png',text:'失败',type:'失败',color:'#FF0000'},
    {icon:'/src/assets/images/fail.png',text:'待确认',type:'确认中',color:'#313C5B'},
])
onMounted(()=>{
    type.value = $route.query.type
})
</script>
<style lang="scss" scoped>
p{
    font-size: 14px;
}
.inner{
    min-height: 100vh;
    .top{
        background-color: #f7f7f7;
    }
    .content{
        background-color: #f7f7f7;
        height: 260px;
        padding-top: 40px;
        box-sizing: border-box;
        padding-bottom: 20px;
    }
    .detail{
        background-color: #fff;
        padding-top: 30px;
        box-sizing: border-box;
        .bb{
            border-bottom: 1px solid #DFDFDF;
            padding-bottom: 10px;
        }
    }
}
</style>