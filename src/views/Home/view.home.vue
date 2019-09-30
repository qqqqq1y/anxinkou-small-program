<template>
  <div class="container">
    <navigation :title="'首页'"></navigation>
    <div class='entrance'>
      <div class="item-box" @click="handleToEntryInformation">
        <img class="img-tip" src="/static/img/single.jpg" />
        <div class="title">单次扣款信息录入</div>
      </div>
      <div class="item-box" @click="handleToTimesInformation">
        <img class="img-tip" src="/static/img/single.jpg" />
        <div class="title">分期扣款信息录入</div>
      </div>
      <div class="item-box" @click="handleToLimit">
        <img class="img-tip" src="/static/img/cardinfo.jpg" />
        <div class="title">银行卡扣款限额信息</div>
      </div>
    </div>
    <div style="width: 100%; height: 50px;"></div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {

    };
  },
  methods: {
    handleToEntryInformation () {
      this.$router.push({ name: 'onceInfo' });
    },
    handleToTimesInformation () {
      this.$router.push({ name: 'moreInfo' });
    },
    handleToLimit () {
      this.$router.push({ name: 'bankLimit' });
    }
  }
};
</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
    min-height: 100%;
    background: #EFEFF4;
  }

  .entrance {
    margin-top: 1.2rem;
  }

  .list {
    display: flex;
    flex-direction: column;
    background: #fff;
  }

  .item-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0.6rem 1.2rem;
    margin-bottom: 1.8rem;
    width: calc(100% - 2.4rem);
    background: #fff;
  }

  .img-tip {
    flex: 1;
    width: 100%;
  }

  .title {
    height: 3rem;
    line-height: 3rem;
    font-size: 1.2rem;
    color: #333;
  }

</style>
