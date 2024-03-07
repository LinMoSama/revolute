<template>
  <div class='wrap'>
    <Banner :menu="menu" :showWallect="true" :defaults="true" :isShowReferenceHandler="isShowReferenceHandler"></Banner>
    <div class="control df fdc">
      <div class="df aic mt10">
        <img src="../../assets/images/withdrawicon.png" style="width: 60px;">
        <div class="df fdc ml20">
          <p class="b2 mb10 fw7 fz16">我的邀请码</p>
          <p class="gray fz12">{{ formData.salt }}</p>
        </div>
      </div>
      <div class="df aic jcc">
        <img id="images" src="" class="mt30" style="width: 180px;">
      </div>
    </div>

    <div class="content bsbb">
      <div class="invi df aic jcsb">
        <div class="df fdc mr10">
          <p class="fz12 gray mb10">邀请链接</p>
          <p style="word-break:break-all" class="fz14">{{ formData.salt }}</p>
        </div>
        <img src="../../assets/images/copy.png" style="width: 40px;" @click="copyAdd(formData.salt, $event)">
      </div>
      <div class="btn">去邀请</div>
    </div>
    <Menu ref="menu"></Menu>
  </div>
</template>

<script setup lang="ts" name="Home">
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router'
import Menu from '@/components/Menu.vue'
import Banner from '@/components/Banner.vue'
import { getUserInfo } from '../../service/api'
import QRCode from "qrcode"
import clipboard from '../../utils/utils'
import { getHMS } from '../../utils/utils'
import useIndex from '@/hooks/useIndex'
const {isShowReferenceHandler} = useIndex()
const menu = ref()
const $router = useRouter()
const formData = ref<any>({
  salt: '',
  avatar: '',
  time: ''
})

const copyAdd = (text: string, event: any) => {
  clipboard(text, event)
  event.value = event
}
onMounted(() => {
  getUserInfo().then((res: any) => {
    formData.value.salt = res.data.data.salt
    formData.value.avatar = res.data.data.avatar
    // formData.value.time = getHMS(res.data.time * 100)
    const opts = {
      errorCorrectionLevel: "H",
      type: "image/jpeg",
      quality: 0.3,
      margin: 1,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
      width: 300,
    };
    //这一步就是生成二维码图片，然后赋值给上面的img标签
    QRCode.toDataURL(formData.value.salt, opts, function (err: any, url: any) {
      if (err) throw err;
      var img = document.getElementById("images");
      img.src = url;
    })
  })
})
</script>

<style scoped lang="scss">
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
    height: 340px;
    background: #FFFFFF;
    border-radius: 10px 10px 10px 10px;
    transform: translateY(-10%);
    margin: 0 auto;

    p {
      font-size: 14px;
    }
  }

  .content {
    padding: 0 20px;

    .invi {
      background-color: #fff;
      border-radius: 20px;
      padding: 20px;
      box-sizing: border-box;
    }

    .btn {
      background: #005ABD;
      color: #fff;
      border-radius: 30px;
      width: 100%;
      margin: 20px auto;
      text-align: center;
      padding: 20px;
      font-size: 16px;
    }
  }
}
</style>