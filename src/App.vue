<template>
  <div class="app-main">
    <router-view/>
    <van-tabbar v-model="active" style="z-index: 9999">
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="balance-list-o" to="/contract?active=0">合同</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/contract?active=1">扣款</van-tabbar-item>
      <van-tabbar-item icon="manager-o" to="/center">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      active: 0
    };
  }
};
</script>

<style lang="scss" scoped>
  .app-main {
    min-height: 100vh;
    display: flex;
  }
</style>
