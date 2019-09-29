<template>
  <div class="container">
    <navigation :showBack="true" :title="'分期扣款信息'"></navigation>
    <div class="times-container">
      <div class="ipt-box">
        <div class="lab">请输入分期总次数:</div>
        <van-field
          v-model="times"
          input-align="center"
          type="number"
          placeholder="正整数"
          bind:change="handleInputValue"
        />
      </div>
      <div class="note">
        注: 第一期扣款时间为分期扣款的第一次扣款时间。第二次扣款时间为第一次扣款时间之后下一个月的同一天。例：第一次扣款时间为8月20日, 则第二次扣款时间为9月20日, 以此类推。
      </div>

      <div class="btn" @click="handleShowDialog">确定</div>

      <van-dialog
        v-model="showDialog"
        title="分期扣款信息"
        show-cancel-button
        @confirm="handleConfirm"
        @cancel="handleCancel"
      >
        <div class="dialog-info">总分期次数: {{ times }}</div>
      </van-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'moreInfo',
  data () {
    return {
      times: '',
      showDialog: false
    };
  },
  methods: {
    handleShowDialog () {
      this.showDialog = true;
    },
    handleConfirm () {
      this.$router.push({ name: 'onceInfo', params: { instalmentCount: this.times, contractType: 2 } });
    },
    handleCancel () {
      this.showDialog = false;
    }
  }
};
</script>

<style lang="scss" scoped>
  .container {
    position: relative;
    background: #EBEFF8;
  }

  .times-container {
    padding: 2rem;
    display: flex;
    flex-direction: column;
  }

  .ipt-box {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #8A8A92;
  }

  .lab {
    margin-right: 1rem;
    font-size: 1rem;
  }

  .van-cell {
    flex: 1;
    padding: 16px 15px !important;
    border-bottom: 1px solid #1A1E27 !important;
    background: none !important;
  }

  .note {
    margin-top: 3rem;
    display: flex;
    font-size: 1.2rem;
    color: #686B72;
  }

  .btn {
    position: absolute;
    display: flex;
    // padding: 0 24rpx;
    width: calc(100% - 4rem);
    height: 4rem;
    justify-content: center;
    align-items: center;
    bottom: 5rem;
    border-radius: 3.2rem;
    background: #FC3B40;
    font-size: 1.2rem;
    color: #FFF;
  }

  .dialog-info {
    margin: 0.5rem 2rem 2rem;
    height: 4rem;
    line-height: 4rem;
    font-size: 1.2rem;
  }

</style>
