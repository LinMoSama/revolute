<template>
  <div class="footer_wrap">
    <img src="../assets/images/footer_img.png" alt="" />
    <ul>
      <li>
        <a href="#">
          <!-- <img src="../assets/images/footer_icon.png" alt="" /> -->
          <img src="../assets/images/YouTube.svg" alt="" />

        </a>
      </li>
      <li>
        <a href="https://twitter.com/Revolute_DAM">
          <img src="../assets/images/x.svg" alt="" />
        </a>
      </li>
      <li>
        <a href="https://t.me/Revolute_Channel">
          <img src="../assets/images/twitter.svg" alt="" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts" name="Footer"></script>

<style lang="scss" scoped>
.footer_wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 25px;
  width: 375px;
  height: 88px;
  background: #ffffff;
  border-radius: 0px 0px 0px 0px;
  img {
    width: 87px;
    height: 50px;
  }
  ul {
    display: flex;
    li {
      img {
        margin-right: 11px;
        width: 24px;
        height: 24px;
      }
      &:last-child {
        img {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
