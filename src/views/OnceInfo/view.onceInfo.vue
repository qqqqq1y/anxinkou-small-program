<template>
  <div class="container">
    <navigation :showBack="true" :title="'单次信息录入'"></navigation>
    <div class="info-container">
      <div class="info login-container">
        <van-uploader :after-read="handleReadIdcord">
          <div class="cord-box">
            <div v-if="!hasIdCard">
              <div class="camera-icon">
                <img class="camera" src="../../../static/img/camera.png" />
              </div>
              <div>拍摄身份证正面</div>
            </div>
            <img v-else class="cordImg" :src="idCardFront" />
          </div>
        </van-uploader>

        <van-uploader :after-read="handleReadBankCord">
          <div class="cord-box">
            <div v-if="!hasBankCord">
              <div class="camera-icon">
                <img class="camera" src="../../../static/img/camera.png" />
              </div>
              <div>拍摄银行卡正面</div>
            </div>
            <img v-else class="cordImg" :src="bankCardFront" />
          </div>
        </van-uploader>

        <van-field
          left-icon="contact"
          v-model="formInfo.info_name"
          placeholder="姓名"
        />
        <van-field
          left-icon="contact"
          v-model="formInfo.info_idCard"
          placeholder="身份证号"
        />
        <van-field
          left-icon="contact"
          v-model="formInfo.info_bankCard"
          placeholder="客户银行卡号"
        />

        <van-field
          left-icon="contact"
          v-model="formInfo.info_bankName"
          placeholder="银行卡开户支行选择"
          @focus="handleShowBankList"
        />

        <van-field
          left-icon="contact"
          v-model="formInfo.info_bankPhone"
          placeholder="客户银行卡预留电话"
        />

        <van-field
          left-icon="contact"
          v-model="formInfo.info_money"
          type="number"
          placeholder="贷款额度"
        />

        <van-field
          left-icon="contact"
          v-model="formInfo.info_point"
          placeholder="服务费比例(如：填写20位20%)"
        />
      </div>

      <div class="btn-box" @click="handleNext">下一步</div>
      <div style="width: 100%; height: 50px;"></div>
    </div>

    <!-- 银行列表 -->
    <van-popup v-model="showPopup" position="bottom" :overlay="false">
      <van-picker
        :show-toolbar="true"
        title="请选择"
        :columns="bankList"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </van-popup>

    <!-- 最后确认信息 -->
    <van-dialog
      v-model="lastShowInfo"
      title="请确认签约合同个人信息"
      show-cancel-button
      @confirm="handleLastInfoOk"
      @cancel="handleCloseLastBox"
    >
      <div class="dialog">
        <div class="col">
          <span class="col-lab">姓名:</span>
          <span >{{formInfo.info_name}}</span>
        </div>
        <div class="col">
          <span class="col-lab">身份证号:</span>
          <span >{{formInfo.info_idCard}}</span>
        </div>
        <div class="col">
          <span class="col-lab">银行卡号:</span>
          <span >{{formInfo.info_bankCard}}</span>
        </div>
        <div class="col">
          <span class="col-lab">手机号:</span>
          <span >{{formInfo.info_bankPhone}}</span>
        </div>
        <div class="col">
          <span class="col-lab">开户行:</span>
          <span >{{formInfo.info_bankName}}</span>
        </div>
        <div class="col">
          <span class="col-lab">贷款额度:</span>
          <span >{{formInfo.info_money}}</span>
        </div>
        <div class="col">
          <span class="col-lab">服务费比例:</span>
          <span >{{formInfo.info_point}}</span>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { Toast } from 'vant';
import LoginService from '@/api/login';
import InfoService from '@/api/info';

export default {
  name: 'onceInfo',
  data () {
    return {
      hasIdCard: false, // 已上传身份证
      hasBankCord: false, // 已上传银行卡
      idCardFront: '', // 上传返回的 身份证url
      bankCardFront: '', // 上传返回的 银行卡url
      // 表单内容
      formInfo: {
        info_name: '',
        info_idCard: '',
        info_bankCard: '',
        info_bankName: '',
        info_bankPhone: '',
        info_money: '',
        info_point: '',
      },
      showPopup: false, // 显示银行列表
      bankList: [], // 银行列表
      bankSearchList: [],

      lastShowInfo: false, // 最后确认信息
      contractType: 1, // 合同类型 1：单次扣款合同；2：分期扣款合同
      instalmentCount: 0, // 分期次数

      contractId: '', // 合同id
      customId: '', // 客户id
      contractImage: '', // 合同图片地址
    };
  },
  mounted () {
    if (this.$route.params) {
      this.contractType = this.$route.params.contractType;
      this.instalmentCount = this.$route.params.instalmentCount;
    }

    this.getBankList();
  },
  methods: {
    // 上传身份证
    handleReadIdcord (file) {
      this.hasIdCard = true;

      let formData = new FormData();

      formData.append('avatar_data', '{"x": 0, "y": 0, "width": 1000, "height": 1000}');
      formData.append('avatar_file', file.file);

      InfoService.upLoad(formData).then((res) => {
        this.idCardFront = res.result;

        this.getCordInfo();
      });
    },

    // 上传银行卡
    handleReadBankCord (file) {
      this.hasBankCord = true;

      let formData = new FormData();

      formData.append('avatar_data', '{"x": 0, "y": 0, "width": 1000, "height": 1000}');
      formData.append('avatar_file', file.file);

      InfoService.upLoad(formData).then((res) => {
        this.bankCardFront = res.result;

        this.getCordInfo();
      });
    },

    // 获取上传图片信息
    getCordInfo () {
      if (this.bankCardFront && this.idCardFront) {
        const params = {
          idCard: this.idCardFront,
          bankcard: this.bankCardFront
        };

        InfoService.cordInfo(params).then((res) => {
          this.formInfo.info_name = res.result.name;
          this.formInfo.info_idCard = res.result.idcardId;
          this.formInfo.info_bankCard = res.result.bankAccount;
        });
      }
    },

    // 选择银行
    handleShowBankList () {
      this.showPopup = true;
    },

    // 下一步
    handleNext () {
      let noVal = []; // 未输入行

      Object.keys(this.formInfo).forEach((key) => {
        if (!this.formInfo[key]) {
          noVal.push(key);
        }
      });

      if (noVal.length > 0) {
        const toastLabel = this.filterList(noVal[0]);

        Toast({
          type: 'fail',
          message: `请输入${toastLabel}`,
          duration: 2000
        });
      } else {
        // 显示输入内容 model
        this.lastShowInfo = true;
      }
    },

    // 确认信息
    handleLastInfoOk () {
      const info = this.formInfo;

      const params = {
        customId: '',
        bankAccount: info.info_bankCard,
        provinceId: '',
        cityId: '',
        bankBindPhone: info.info_bankPhone,
        bankCardFront: this.bankCardFront,
        bankCardBack: '',
        loanLimit: parseInt(info.info_money),
        progress: 0,
        agencyFees: parseInt(info.info_point),
        contractType: parseInt(this.contractType)
      };

      const customParams = {
        customName: info.info_name,
        idCard: info.info_idCard,
        // idCardFront: 'http://testimage.weiqiangtech.com/upload/user/image_test/20190711185916552.png',
        idCardFront: this.idCardFront,
        idCardBack: null
      };

      if (this.contractType > 1) {
        params.instalmentCount = parseInt(this.instalmentCount);
      }

      this.bankSearchList.forEach(item => {
        if (item.bankName === this.formInfo.info_bankName) {
          params.bankId = item.bankCode;
        }
      });

      InfoService.getCustomId(customParams).then((res) => {
        params.customId = res.result.id;
        this.customId = res.result.id;

        this.createContract(params);
      });
    },

    createContract (params) {
      InfoService.createContract(params).then((res) => {
        if (res.code === '1000') {
          this.contractImage = res.result.contractImage;
          this.contractId = res.result.id;

          const a = {
            progress: 1,
            contractImage: this.contractImage,
            customId: this.customId,
            contractId: this.contractId
          };

          this.lastShowInfo = false;
          this.$router.push({ name: 'contractImg', params: a });
        } else {
          Toast({
            type: 'fail',
            message: '注册富有账户失败',
            duration: 2000
          });
        }
      });
    },

    handleCloseLastBox () {
      this.lastShowInfo = false;
    },

    // toast 文字提示
    filterList (v) {
      const list = [
        { lab: 'info_name', val: '姓名' },
        { lab: 'info_idCard', val: '身份证号' },
        { lab: 'info_bankCard', val: '银行卡号' },
        { lab: 'info_bankName', val: '开户行' },
        { lab: 'info_bankPhone', val: '银行预留电话' },
        { lab: 'info_money', val: '贷款额度' },
        { lab: 'info_point', val: '服务费比例' },
      ];

      let a;

      list.forEach(item => {
        if (item.lab === v) {
          a = item.val;
        }
      });

      return a;
    },
    onConfirm (val) {
      this.formInfo.info_bankName = val;

      this.showPopup = false;
    },
    onCancel () {
      this.showPopup = false;
    },
    getBankList () {
      LoginService.bankList().then((res) => {
        res.result.forEach(item => {
          this.bankList.push(item.bankName);
          this.bankSearchList.push({ bankName: item.bankName, bankCode: item.id });
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  .info-container {
    display: flex;
    flex-direction: column;
    padding: 0 1rem;

    .van-uploader {
      margin-top: 2rem;
    }
  }

  .btn-box {
    margin: 2rem 0 1rem;
    display: flex;
    padding: 0 2.4rem;
    height: 4rem;
    align-items: center;
    justify-content: center;
    border-radius: 4rem;
    background: #FC3B40;
    font-size: 1.4rem;
    color: #FFF;
  }

  .cord-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 12rem;
    border-radius: 0.8rem;
    background: #FFF;
    font-size: 1.2rem;
    color: #000;
  }
  .camera-icon {
    display: flex;
    justify-content: center;
    text-align: center;
    line-height: 4.8rem;
    margin-bottom: 1rem;
  }
  .camera {
    width: 4rem;
    height: 3.2rem;
  }
  .cordImg {
    width: 100%;
    height: 100%;
  }
  .dialog {
    margin: 1rem;
    padding: 0 0.5rem;
    display: flex;
    flex-direction: column;
  }

  .col {
    margin-top: 0.5rem;
  }

  .col-lab {
    margin-right: 0.5rem;
  }
</style>
