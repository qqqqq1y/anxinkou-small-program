<template>
  <div class="container">
    <navigation :showBack="true" :title="'委托服务费扣款'"></navigation>
    <div class="times-container">
      <div class="info">
        <div class="col">
          <div class="lab">姓名:</div>
          <div class="val">{{customName}}</div>
        </div>
        <div class="col">
          <div class="lab">合同代扣次数:</div>
          <div class="val">{{times}}</div>
        </div>
        <div class="col">
          <div class="lab">请输入扣款金额:</div>
          <div class="lab val ipt-box">
            <input class="ipt" type="number" v-model="money" />
          </div>
        </div>
      </div>
      <div class="note">
        <div class="it">1. 每日扣款最多两次, 每次最短间隔三分钟</div>
        <div class="it">2. 若本银行卡当日因余额不足造成2次扣款失败, 次日可在扣款一次。 若依然因余额不足造成扣款失败, 本月不可再扣款</div>
        <div class="it">3. 各银行卡扣款每笔限额, 请参照首页 '银行卡扣款限额信息'</div>
        <div class="it">4. 扣款额度, 请与实际放款数额所需支付的服务费比例一致</div>
        <div class="it">5. 实际扣款最高额度, 不可超过《委托扣款合同》中所标注的放款数额所需支付的服务费比例</div>
      </div>

      <div class="btn-group">
        <div class="btn" @click="handleDeduct">扣款</div>
        <div class="btn" @click="handleToBack">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast, Dialog } from 'vant';
import InfoService from '@/api/info';

export default {
  name: 'detailOneTimes',
  data () {
    return {
      contractId: '', // 合同id
      customId: '', // 客户id
      customName: '', // 客户名称
      times: 0, // 扣款次数

      money: '', // 扣款金额
    };
  },
  mounted () {
    const info = this.$route.params;

    this.contractId = info.contractId;
    this.customId = info.customId;
    this.customName = info.customName;

    this.getTimes();
  },
  methods: {
    getTimes () {
      InfoService.getTimes(`/contract/deductedcount/${this.contractId}`).then((res) => {
        this.times = res.result.deductedCount;
      });
    },
    handleDeduct () {
      if (!this.money) {
        Toast({
          type: 'fail',
          position: 'middle',
          message: `请输入扣款金额`,
          duration: 2000
        });

        return false;
      }

      const params = {
        customId: parseInt(this.customId),
        money: parseInt(this.money)
      };

      InfoService.deducted(`/contract/deducted/${this.contractId}`, params).then((res) => {
        if (res.code === '1000' || res.code === '1001') {
          Dialog.alert({
            message: res.msg
          }).then(() => {
            this.$router.push({ name: 'contract', params: { active: 1 } });
          });
        } else {
          Dialog.alert({
            message: res.msg
          }).then(() => {
            this.$router.push({ name: 'contract', params: { active: 1 } });
          });
        }
      });
    },
    handleToBack () {
      this.$router.push({ name: 'contract', params: { active: 1 } });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  background: #eeeeee;
  display: flex;
  flex-direction: column;
}

.times-container {
  position: relative;
  width: 100%;
  flex: 1;
}

.info {
  width: 100%;
}

.col {
  margin-top: 1rem;
  padding: 0 1rem;
  width: 100%;
  height: 3.2rem;
  line-height: 3.2rem;
  display: flex;
  font-size: 1.1rem;
  color: #333;
}

.lab {
  width: 8rem;
  margin-right: 1rem;
  text-align: left;
}

.val {
  width: 18rem;
  height: 100%;
  padding-left: 0.5rem;
}

.ipt-box {
  border-bottom: 1px solid #1A1E27;
}

.ipt {
  border: none;
  background: #eee;
  height: 3rem;
  line-height: 3.2rem;
}

.note {
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  margin-top: 2rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: #000;
}

.it {
  margin-top: 1rem;
}

.btn-group {
  width: 100%;
  position: absolute;
  bottom: 6rem;
  display: flex;
  justify-content: space-between;
}

.btn {
  margin: 0 1rem;
  padding: 0.5rem 1.2rem;
  border-radius: 0.2rem;
  background: #FC3B40;
  font-size: 1.2rem;
  color: #FFF;
}

.van-toast {
  white-space: nowrap !important;
}
</style>
