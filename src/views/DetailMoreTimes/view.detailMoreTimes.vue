<template>
  <div class="container">
    <navigation :showBack="true" :title="'委托代扣款合同'"></navigation>
    <div class="times-container">
      <div class="info">
        <div class="col">
          <div class="lab">姓名:</div>
          <div class="lab">{{ customName }}</div>
        </div>
        <div class="col">
          <div class="lab">一档分期扣款次数:</div>
          <div class="lab val">
            <input class="ipt" bindblur="handleBlur" placeholder="如: 3" v-model="form.oneTimeInstalmentCount" data-typeStr="一档分期扣款次数" />
          </div>
        </div>
        <div class="col">
          <div class="lab">一档分期扣款金额:</div>
          <div class="lab val">
            <input class="ipt" bindblur="handleBlur" placeholder="如: 2000" v-model="form.oneTimeInstalmentAmount" data-typeStr="一档分期扣款金额" />
          </div>
        </div>
        <div class="col">
          <div class="lab">二档分期扣款次数:</div>
          <div class="lab val">
            <input class="ipt" bindblur="handleBlur" placeholder="如: 3" v-model="form.twoTimeInstalmentCount" data-typeStr="二档分期扣款次数" />
          </div>
        </div>
        <div class="col">
          <div class="lab">二档分期扣款金额:</div>
          <div class="lab val">
            <input class="ipt" bindblur="handleBlur" placeholder="如: 2000" v-model="form.twoTimeInstalmentAmount" data-typeStr="二档分期扣款金额" />
          </div>
        </div>
        <div class="col">
          <div class="lab">三档分期扣款次数:</div>
          <div class="lab val">
            <input class="ipt" bindblur="handleBlur" placeholder="如: 3" v-model="form.threeTimeInstalmentCount" data-typeStr="三档分期扣款次数"  />
          </div>
        </div>
        <div class="col">
          <div class="lab">三档分期扣款金额:</div>
          <div class="lab val">
            <input class="ipt" bindblur="handleBlur" placeholder="如: 2000" v-model="form.threeTimeInstalmentAmount" data-typeStr="三档分期扣款金额"  />
          </div>
        </div>
        <div class="col">
          <div class="lab">第一期扣款时间:</div>
          <div class="lab val date">
            <input class="ipt" bindblur="handleBlur" placeholder="1-12" v-model="form.mouth" data-typeStr="第一期扣款时间" type="number"/> 月
            <input class="ipt" bindblur="handleBlur" placeholder="1-31" v-model="form.day" data-typeStr="第一期扣款时间" type="number"/> 日
          </div>
        </div>
      </div>
      <span class="note">
        注: 第一期扣款时间为分期扣款的第一次扣款时间。第二次扣款时间为第一次扣款时间之后下一个月的同一天。例：第一次扣款时间为8月20日, 则第二次扣款时间为9月20日, 以此类推。
      </span>

      <div class="btn-group">
        <div class="btn" @click="handleDeduct">开始分期扣款</div>
        <div class="btn" @click="handleToBack">取消</div>
      </div>
    </div>

  </div>
</template>

<script>
import { Toast, Dialog } from 'vant';
import InfoService from '@/api/info';

export default {
  name: 'detailMoreTimes',
  data () {
    return {
      contractId: '', // 合同id
      customId: '', // 客户id
      customName: '', // 客户名称
      times: 0, // 扣款次数

      form: {
        oneTimeInstalmentCount: '',
        oneTimeInstalmentAmount: '',
        twoTimeInstalmentCount: '',
        twoTimeInstalmentAmount: '',
        threeTimeInstalmentCount: '',
        threeTimeInstalmentAmount: '',
        mouth: '',
        day: ''
      },

      money: '', // 扣款金额
    };
  },
  mounted () {
    const info = this.$route.params;

    this.contractId = info.contractId;
    this.customId = info.customId;
    this.customName = info.customName;
  },
  methods: {
    handleDeduct () {
      let noValList = [];

      Object.keys(this.form).forEach((key) => {
        if (!this.form[key]) {
          noValList.push(key);
        }
      });

      if (noValList.length > 0) {
        const toastTxt = this.filterList(noValList[0]);

        Toast({
          type: 'fail',
          position: 'middle',
          message: `请输入${toastTxt}`,
          duration: 2000
        });

        return false;
      };

      const params = {
        ...this.form,
        monthTime: `${this.form.mouth}/${this.form.day}`
      };

      InfoService.moreDeducted(`/contract/instalment/deducted/${this.contractId}`, params).then((res) => {
        if (res.code === '1000') {
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
    },
    // toast 文字提示
    filterList (v) {
      const list = [
        { lab: 'oneTimeInstalmentCount', val: '一档分期扣款次数' },
        { lab: 'oneTimeInstalmentAmount', val: '一档分期扣款金额' },
        { lab: 'twoTimeInstalmentCount', val: '二档分期扣款次数' },
        { lab: 'twoTimeInstalmentAmount', val: '二档分期扣款金额' },
        { lab: 'threeTimeInstalmentCount', val: '三档分期扣款次数' },
        { lab: 'threeTimeInstalmentAmount', val: '三档分期扣款金额' },
        { lab: 'mouth', val: '请输入扣款日期' },
        { lab: 'day', val: '请输入扣款日期' },
      ];

      let a;

      list.forEach(item => {
        if (item.lab === v) {
          a = item.val;
        }
      });

      return a;
    },
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  position: relative;
  background: #eeeeee;
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
  height: 3rem;
  line-height: 3rem;
  display: flex;
  font-size: 1.1rem;
  color: #333;
}

.lab {
  margin-right: 1rem;
  width: 10rem;
  text-align: left;
}

.val {
  width: 18rem;
  height: 100%;
  padding-left: 0.5rem;
  border-bottom: 1px solid #1A1E27;
}

.date {
  display: flex;
  justify-content: space-between;
  padding: 0 0.5rem;
  input {
    padding-left: 2rem;
  }
}

.ipt {
  width: 80%;
  height: 2.8rem;
  text-align: left;
  line-height: 2.8rem;
  border: none;
  background: #eee;
}

.note {
  margin-top: 2.8rem;
  display: flex;
  padding: 0 0.5;
  font-size: 1.1rem;
  color: #686B72;
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
  padding: 0.8rem 1.5rem;
  border-radius: 0.5rem;
  background: #FC3B40;
  font-size: 1.1rem;
  color: #FFF;
}

.van-toast {
  white-space: nowrap !important;
}

</style>
