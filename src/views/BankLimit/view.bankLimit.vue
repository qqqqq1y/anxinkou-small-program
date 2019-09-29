<template>
  <div class="container">
    <navigation :showBack="true" :title="'银行卡扣款限额信息'"></navigation>
    <div class="limit-container">
      <div class="title-box">
        <div class="title">银行名</div>
        <div class="line"></div>
        <div class="title">单笔扣款限额</div>
      </div>
      <div class="main">
        <div class="item" v-for="item in bankList" :key="item.bankCode">
          <div class="item-val">{{item.bankName}}</div>
          <div class="item-val">{{item.deductLimit}}元</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginService from '@/api/login';

export default {
  name: 'bankLimit',
  data () {
    return {
      bankList: []
    };
  },
  mounted () {
    this.getBankList();
  },
  methods: {
    getBankList () {
      LoginService.bankList().then((res) => {
        this.bankList = res.result;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  .container {
    min-height: 100%;
    background: #FFF;
  }

  .title-box {
    display: flex;
    width: 100%;
    height: 4rem;
    background: #EBEFF8;
    align-items: center;
  }

  .title {
    width: 49.5%;
    text-align: center;
    font-size: 1.2rem;
    font-weight: 600;
    color: #000;
  }

  .line {
    width: 1px;
    height: 100%;
    background: #FFF;
  }

  .main {
    margin-top: 0.2rem;
  }

  .item {
    display: flex;
    width: 100%;
    height: 3.2rem;
    align-items: center;
    border-top: 2px solid #EBEFF8;
  }

  .item-val {
    width: 50%;
    text-align: center;
    font-size: 1.2rem;
    color: #000;
  }

</style>
