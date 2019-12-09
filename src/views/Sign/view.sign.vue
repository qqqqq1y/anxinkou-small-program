<template>
  <div class="signature">
    <navigation :showBack="true" :title="'电子签名法'"></navigation>

    <vue-esign ref="esign" :width="canvasWidth" :height="canvasHeight" :lineWidth="lineWidth"/>
    <button class="btn reset" @click="handleReset">重写</button>
    <button class="btn commit" @click="handleGenerate">提交签名</button>
  </div>
</template>

<script>
import InfoService from '@/api/info';

export default {
  name: 'sign',
  data () {
    return {
      contractId: '', // 合同id
      customId: '', // 客户id
      contractImage: '', // 合同图片地址

      canvasWidth: window.innerWidth,
      canvasHeight: window.innerHeight - 128,

      lineWidth: 5,
    };
  },
  created () {
    const info = this.$route.params;

    this.contractId = info.contractId;
    this.customId = info.customId;
    this.contractImage = info.contractImage;
  },
  methods: {
    handleReset () {
      this.$refs.esign.reset();
    },
    handleGenerate () {
      this.$refs.esign.generate().then((res) => {
        let base64 = res.replace('data:image/png;base64,', '');

        const params = {
          customId: parseInt(this.customId),
          progress: 2,
          contractImage: base64
        };

        InfoService.uploadSign(`/contract/sign/${this.contractId}`, params).then((res) => {
          if (res.code === '1000') {
            this.contractImg = res.result.contractImage; // 最终合同图片

            const a = {
              progress: 2,
              contractImage: res.result.contractImage,
              customId: this.customId,
              contractId: this.contractId
            };

            this.$router.push({ name: 'contractImg', params: a });
          }
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.signature {
  min-height: 100vh;
  background: #fff;
  position: relative;

  .btn {
    position: absolute;
    bottom: 3rem;
    width: 7rem;
    height: 3.2rem;
    border: none;
    line-height: 2.4rem;
    text-align: center;
    padding: 0 1rem;
    background: #FC3B40;
    border-radius: 0.2rem;
    font-size: 1.2rem;
    color: #FFF;
  }

  .reset {
    left: 1rem;
  }

  .commit {
    right: 1rem;
  }
}
</style>
