<template>
  <div class="container">
    <navigation :showBack="true" :title="'委托代扣款合同'"></navigation>
    <div class="img-container">
      <img class="img" :src="contractImage" alt="">
    </div>

    <div v-if="progress == 1" class="btn" @click="handleToCoverSign">客户签字</div>
    <div v-if="progress == 2" class="btn" @click="handleToNext">下一步</div>


    <div style="width: 100%; height: 50px;"></div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import InfoService from '@/api/info';

export default {
  name: 'contractImg',
  data () {
    return {
      contractId: '', // 合同id
      customId: '', // 客户id
      contractImage: '', // 合同图片地址
      progress: '' // 进度
    };
  },
  mounted () {
    const info = this.$route.params;

    this.contractId = info.contractId;
    this.customId = info.customId;
    this.progress = info.progress;
    this.contractImage = info.contractImage;
  },
  methods: {
    handleToCoverSign () {
      const params = {
        customId: parseInt(this.customId),
        progress: 1,
      };

      InfoService.uploadSign(`/contract/sign/${this.contractId}`, params).then((res) => {
        if (res.code === '1000' || res.code === '2004') {
          const a = {
            contractImage: this.contractImage,
            customId: this.customId,
            contractId: this.contractId
          };

          this.$router.push({ name: 'sign', params: a });
        }
      });
    },

    handleToNext () {
      InfoService.getIframe(`/contract/signFuiou/${this.contractId}`).then((res) => {
        if (res.code === '2004') {
          Toast.success('合同已签约');

          this.$router.push({ name: 'contract', params: { active: 1 } });
        } else {
          this.$router.push({ name: 'iframe-page', params: { contractId: this.contractId } });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  .container {
    background: #EFEFF4;
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .img-container {
    display: flex;
    flex: 1;
    padding: 0 3rem;
  }

  .img {
    width: 100%;
    height: 100%;
  }

  .btn {
    position: absolute;
    bottom: 5.5rem;
    width: calc(100% - 2rem);
    margin: 0 1rem;
    height: 4rem;
    line-height: 4rem;
    text-align: center;
    background: #FC3B40;
    border-radius: 2rem;
    font-size: 1.2rem;
    color: #FFF;
  }
</style>
