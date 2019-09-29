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
  name: 'iframeAuth',
  data () {
    return {
      contractId: '',
      timer: null
    };
  },
  mounted () {
    this.contractId = this.$route.params.contractId;

    this.signAuth();
  },
  methods: {
    signAuth () {
      if (this.timer) {
        clearTimeout(this.timer);

        this.timer = null;
      }

      const iframe = this.$refs.iframe;

      const iframedoc = iframe.contentDocument || iframe.contentWindow.document;

      InfoService.getAuthIframe(`/contract/signAuth/1374`).then((res) => {
        iframedoc.body.innerHTML = res;

        iframedoc.forwardForm.submit();

        this.searchAuthResult();
      });
    },

    // 查询签约结果
    searchAuthResult () {
      if (this.timer) {
        clearTimeout(this.timer);

        this.timer = null;
      }

      InfoService.getResult(`/contract/signIdentify/1374`).then((res) => {
        if (res.result.authCode === 'no') {
          this.timer = setTimeout(() => {
            this.searchAuthResult();
          }, 3000);
        } else {
          if (res.result.authCode === '0000') {
            Toast.success('授权成功');
          } else {
            Toast.fail('授权失败');
          }
          clearTimeout(this.times);

          this.timer = null;

          this.$router.push({ name: 'contract', params: { active: 1 } });
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
