<template>
  <div class="container">
    <navigation :showBack="true" :title="'签约'"></navigation>

    <iframe class="iframe" width="100%" height="100%" ref="iframe" frameborder="0"></iframe>
    <div style="width: 100%; height: 50px;"></div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import InfoService from '@/api/info';

export default {
  name: 'iframe-page',
  data () {
    return {
      contractId: '',
      timer: null
    };
  },
  mounted () {
    this.contractId = this.$route.params.contractId;

    this.signFuiou();
  },
  methods: {
    signFuiou () {
      if (this.timer) {
        clearTimeout(this.timer);

        this.timer = null;
      }

      const iframe = this.$refs.iframe;

      const iframedoc = iframe.contentDocument || iframe.contentWindow.document;

      InfoService.getIframe(`/contract/signFuiou/1374`).then((res) => {
        if (res.code === '2004') {
          Toast.success('合同已签约');

          this.$router.push({ name: 'contract', params: { active: 1 } });
        } else {
          iframedoc.body.innerHTML = res;

          iframedoc.forwardForm.submit();

          this.searchSignResult();
        }
      });
    },

    // 查询签约结果
    searchSignResult () {
      if (this.timer) {
        clearTimeout(this.timer);

        this.timer = null;
      }

      InfoService.getResult(`/contract/signIdentify/1374`).then((res) => {
        if (res.result.signCode === 'no') {
          this.timer = setTimeout(() => {
            this.searchSignResult();
          }, 3000);
        } else {
          clearTimeout(this.times);

          this.timer = null;

          if (res.result.signCode === '0000') {
            Toast.success('签约成功');

            this.$router.push({ name: 'iframeAuth', params: { contractId: this.contractId } });
          } else {
            Toast.success('签约失败');

            this.$router.push({ name: 'contract', params: { active: 1 } });
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    flex-direction: column;
  };

  .iframe {
    flex: 1;
  }
</style>
