<template>
  <div class="app-main">
    <router-view/>
    <van-tabbar v-if="showTab" v-model="active" style="z-index: 9999">
      <van-tabbar-item icon="home-o" to="/web/home">首页</van-tabbar-item>
      <van-tabbar-item icon="balance-list-o" to="/web/contract?active=0">合同</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/web/contract?active=1">扣款</van-tabbar-item>
      <van-tabbar-item icon="manager-o" to="/web/center">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  name: 'app',
  data () {
    return {
      active: 0,
      showTab: true
    };
  },
  mounted () {
    this.showTab = (this.$route.name === 'login' || this.$route.name === 'sign') ? false : true;
  },
  watch: {
    $route (to) {
      if (to.name !== 'sign') {
        this.showTab = true;

        if (to.name !== 'login') {
          this.showTab = true;
        } else {
          this.showTab = false;
        }
      } else {
        this.showTab = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  .app-main {
    min-height: 100vh;
    display: flex;
  }
</style>
