<template>
  <div class="container">
    <navigation :showBack="false" :title="'合同'"></navigation>
    <van-search class="login-container" v-model="search.keyword" placeholder="请输入搜索关键词" @search="handleSearch" @clear="handleClear"/>

    <div class="tab">
      <van-tabs style="z-index: 1001" sticky animated v-model="active" @click="handleChangeTabs">
        <van-tab title="未完成">
          <div class="ct-container" v-for="item in noOverList" :key="`no-${item.contractId}`">
            <div class="list">
              <div class="item" @click="handleInfo(item)">
                <div class="col orderId">
                  <div class="lab">订单号:</div>
                  <div class="val">{{item.orderNumber}}</div>
                </div>
                <div class="col">
                  <div class="lab">客户名:</div>
                  <div class="val">{{item.customName}}</div>
                </div>
                <div class="col">
                  <div class="lab">身份证:</div>
                  <div class="val">{{item.idCard}}</div>
                </div>
                <div class="col">
                  <div class="lab">扣款状态:</div>
                  <div class="val">{{item.deductedStatus}}</div>
                </div>
                <div class="col">
                  <div class="lab">手机号:</div>
                  <div class="val">{{item.bankBindPhone}}</div>
                </div>
                <div class="col">
                  <div class="lab">创建时间:</div>
                  <div class="val">{{item.createTime}}</div>
                </div>
                <div class="col">
                  <div class="lab">合同分类:</div>
                  <div class="val">{{item.contractType === 1 ? '单次扣款' : '分期扣款'}}</div>
                </div>
                <div v-if="item.contractType === 2">
                  <div class="col">
                    <div class="lab">一档分期扣款次数:</div>
                    <div class="val">{{item.oneTimeInstalmentCount}}</div>
                  </div>
                  <div class="col">
                    <div class="lab">一档分期扣款金额:</div>
                    <div class="val">{{item.oneTimeInstalmentAmount}}元</div>
                  </div>
                  <div class="col">
                    <div class="lab">二档分期扣款次数:</div>
                    <div class="val">{{item.twoTimeInstalmentCount}}</div>
                  </div>
                  <div class="col">
                    <div class="lab">一档分期扣款金额:</div>
                    <div class="val">{{item.twoTimeInstalmentAmount}}元</div>
                  </div>
                  <div class="col">
                    <div class="lab">三档分期扣款次数:</div>
                    <div class="val">{{item.threeTimeInstalmentCount}}</div>
                  </div>
                  <div class="col">
                    <div class="lab">一档分期扣款金额:</div>
                    <div class="val">{{item.threeTimeInstalmentAmount}}元</div>
                  </div>
                  <div class="col">
                    <div class="lab">总分期次数:</div>
                    <div class="val">{{item.instalmentCount}}</div>
                  </div>
                  <div class="col">
                    <div class="lab">已代扣次数:</div>
                    <div class="val">{{item.deductedCount}}</div>
                  </div>
                  <div class="col">
                    <div class="lab">分期每月扣款时间:</div>
                    <div class="val">{{item.monthTime}}</div>
                  </div>
                </div>
                <div class="col-btn col-btn-top" @click.capture.stop="handleDeleteContract(item.contractId)">删除</div>
              </div>
            </div>
          </div>

        </van-tab>
        <van-tab title="业务进行中">
            <div class="ct-container" v-for="item in doingList" :key="`do-${item.contractId}`">
              <div class="list">
                <div class="item">
                  <div class="col orderId">
                    <div class="lab">订单号:</div>
                    <div class="val">{{item.orderNumber}}</div>
                  </div>
                  <div class="col">
                    <div class="lab">客户名:</div>
                    <div class="val">{{item.customName}}</div>
                  </div>
                  <div class="col">
                    <div class="lab">身份证:</div>
                    <div class="val">{{item.idCard}}</div>
                  </div>
                  <div class="col">
                    <div class="lab">扣款状态:</div>
                    <div class="val">{{item.deductedStatus}}</div>
                  </div>
                  <div class="col">
                    <div class="lab">手机号:</div>
                    <div class="val">{{item.bankBindPhone}}</div>
                  </div>
                  <div class="col">
                    <div class="lab">创建时间:</div>
                    <div class="val">{{item.createTime}}</div>
                  </div>
                  <div class="col">
                    <div class="lab">委托扣款合同:</div>
                    <div class="val rediv review" @click="handleRediv(item.contractImage)">查看</div>
                  </div>
                  <div class="col">
                    <div class="lab">合同分类:</div>
                    <div class="val">{{item.contractType === 1 ? '单次扣款' : '分期扣款'}}</div>
                  </div>

                  <div class="col" v-if="item.contractType === 1">
                    <div class="lab">最后一次代扣信息:{{item.deductedInfo}}</div>
                  </div>

                  <div v-if="item.contractType === 2">
                    <div class="col">
                      <div class="lab">一档分期扣款次数:</div>
                      <div class="val">{{item.oneTimeInstalmentCount}}</div>
                    </div>
                    <div class="col">
                      <div class="lab">一档分期扣款金额:</div>
                      <div class="val">{{item.oneTimeInstalmentAmount}}元</div>
                    </div>
                    <div class="col">
                      <div class="lab">二档分期扣款次数:</div>
                      <div class="val">{{item.twoTimeInstalmentCount}}</div>
                    </div>
                    <div class="col">
                      <div class="lab">一档分期扣款金额:</div>
                      <div class="val">{{item.twoTimeInstalmentAmount}}元</div>
                    </div>
                    <div class="col">
                      <div class="lab">三档分期扣款次数:</div>
                      <div class="val">{{item.threeTimeInstalmentCount}}</div>
                    </div>
                    <div class="col">
                      <div class="lab">一档分期扣款金额:</div>
                      <div class="val">{{item.threeTimeInstalmentAmount}}元</div>
                    </div>
                    <div class="col">
                      <div class="lab">总分期次数:</div>
                      <div class="val">{{item.instalmentCount}}</div>
                    </div>
                    <div class="col">
                      <div class="lab">已代扣次数:</div>
                      <div class="val">{{item.deductedCount}}</div>
                    </div>
                    <div class="col">
                      <div class="lab">分期每月扣款时间:</div>
                      <div class="val">{{item.monthTime}}</div>
                    </div>
                  </div>

                  <div class="col-btn col-btn-top" @click="handleCancelDeducted(item.customId, item.contractId)">放弃代扣</div>

                  <div v-if="item.contractType === 1 || (item.contractType === 2 && item.instalmentStartFlag == 0)"
                    class="col-btn col-btn-bottom"
                    @click="handleToDetail(item)">代扣</div>
                </div>
              </div>
            </div>
        </van-tab>
        <van-tab title="业务已结束">
            <div class="ct-container" v-for="item in overList" :key="`over-${item.contractId}`">
              <div class="list">
                <div class="item">
                  <div class="col orderId">
                    <div class="lab">订单号:</div>
                    <div class="val">{{item.orderNumber}}</div>
                  </div>
                  <div class="col">
                    <div class="lab">客户名:</div>
                    <div class="val">{{item.customName}}</div>
                  </div>
                  <div class="col">
                    <div class="lab">身份证:</div>
                    <div class="val">{{item.idCard}}</div>
                  </div>
                  <div class="col">
                    <div class="lab">扣款状态:</div>
                    <div class="val">{{item.deductedStatus}}</div>
                  </div>
                  <div class="col">
                    <div class="lab">手机号:</div>
                    <div class="val">{{item.bankBindPhone}}</div>
                  </div>
                  <div class="col">
                    <div class="lab">创建时间:</div>
                    <div class="val">{{item.createTime}}</div>
                  </div>
                  <div class="col">
                    <div class="lab">委托扣款合同:</div>
                    <div class="val rediv review" @click="handleRediv(item.contractImage)">查看</div>
                  </div>
                  <div class="col">
                    <div class="lab">合同分类:</div>
                    <div class="val">{{item.contractType === 1 ? '单次扣款' : '分期扣款'}}</div>
                  </div>
                  <div class="col" v-if="item.contractType === 1">
                    <div class="lab">最后一次代扣信息:{{item.deductedInfo}}</div>
                  </div>
                  <div v-if="item.contractType === 2">
                    <div class="col">
                      <div class="lab">一档分期扣款次数:</div>
                      <div class="val">{{item.oneTimeInstalmentCount}}</div>
                    </div>
                    <div class="col">
                      <div class="lab">一档分期扣款金额:</div>
                      <div class="val">{{item.oneTimeInstalmentAmount}}元</div>
                    </div>
                    <div class="col">
                      <div class="lab">二档分期扣款次数:</div>
                      <div class="val">{{item.twoTimeInstalmentCount}}</div>
                    </div>
                    <div class="col">
                      <div class="lab">一档分期扣款金额:</div>
                      <div class="val">{{item.twoTimeInstalmentAmount}}元</div>
                    </div>
                    <div class="col">
                      <div class="lab">三档分期扣款次数:</div>
                      <div class="val">{{item.threeTimeInstalmentCount}}</div>
                    </div>
                    <div class="col">
                      <div class="lab">一档分期扣款金额:</div>
                      <div class="val">{{item.threeTimeInstalmentAmount}}元</div>
                    </div>
                    <div class="col">
                      <div class="lab">总分期次数:</div>
                      <div class="val">{{item.instalmentCount}}</div>
                    </div>
                    <div class="col">
                      <div class="lab">已代扣次数:</div>
                      <div class="val">{{item.deductedCount}}</div>
                    </div>
                    <div class="col">
                      <div class="lab">分期每月扣款时间:</div>
                      <div class="val">{{item.monthTime}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </van-tab>
      </van-tabs>
    </div>

    <div class="loadMore" @click="loadMore">{{ loadMoreTxt }}</div>
    <div style="width: 100%; height: 50px;"></div>
    <van-dialog id="van-dialog" />

    <div v-show="show" class="contract-box" @click="handleCloseImg">
      <div class="mask"></div>
      <img class="img" :src="contractUrl" />
    </div>
  </div>
</template>

<script>
import { Dialog, Toast } from 'vant';
import ContractService from '@/api/contract';

export default {
  name: 'contract',
  data () {
    return {
      active: 0,

      search: {
        start: 1, // 分页页码
        offset: 20, // 每页条数
        keyword: '', // 搜索关键字
        contractStatus: 0, // 合同状态
      },

      noOverList: [], // 未完成订单
      doingList: [], // 进行中订单
      overList: [], // 已完成订单
      total: 0, // 后台存储的订单长度

      show: false,
      contractUrl: '',

      loadMoreTxt: '加载更多...'
    };
  },
  mounted () {
    this.active = parseInt(this.$route.params.active || this.$route.query.active) || 0;
    this.search.contractStatus = parseInt(this.$route.params.active || this.$route.query.active);

    // console.log(this.active);

    this.getContractList();
  },
  methods: {
    handleSearch () {
      this.search.start = 1;
      this.total = 0;

      this.noOverList = [];
      this.doingList = [];
      this.overList = [];

      this.getContractList();
    },
    handleClear () {
      this.search.keyword = '';
      this.search.start = 1;
      this.total = 0;

      this.noOverList = [];
      this.doingList = [];
      this.overList = [];

      this.getContractList();
    },
    handleChangeTabs (val) {
      this.search.contractStatus = val;
      this.search.start = 1;
      this.total = 0;

      this.noOverList = [];
      this.doingList = [];
      this.overList = [];
      this.getContractList();
    },
    handleInfo (info) {
      if (info.progress === 0) { // progress == 0 信息录入完毕,  未签名
        const a = {
          contractImage: info.contractImage,
          customId: info.customId,
          contractId: info.contractId
        };

        this.$router.push({ name: 'sign', params: a });
      } else if (info.progress === 1 || info.progress === 2) { // progress == 1 已签名  签约页面
        this.$router.push({ name: 'iframe-page', params: { contractId: info.contractId } });
      }
    },
    handleDeleteContract (info) {
      Dialog.confirm({
        title: '标题',
        message: '是否确定删除合同'
      }).then(() => {
        ContractService.deleteContract(`/contract/delete/${info}`).then((res) => {
          if (res.code === '1000') {
            Toast.success('删除成功');

            this.search.start = 1;
            this.noOverList = [];
            this.total = 0;

            this.getContractList();
          } else {
            Toast.fail('删除失败');
          }
        });
      });
    },
    handleRediv (info) {
      this.show = true;
      this.contractUrl = info;
    },

    handleCloseImg () {
      this.show = false;
      this.contractUrl = '';
    },

    // 放弃代扣
    handleCancelDeducted (customId, contractId) {
      const params = {
        customId
      };

      Dialog.confirm({
        title: '标题',
        message: '是否确定放弃代扣'
      }).then(() => {
        ContractService.cancelDeducted(`/contract/cancelDeducted/${contractId}`, params).then((res) => {
          if (res.code === '1000') {
            Toast.success('成功放弃代扣');

            this.search.start = 1;
            this.doingList = [];
            this.total = 0;

            this.getContractList();
          } else {
            Toast.fail('操作失败');
          }
        });
      });
    },

    // 代扣
    handleToDetail (info) {
      const a = {
        contractId: info.contractId,
        customName: info.customName,
        customId: info.customId
      };

      if (info.contractType === 1) {
        this.$router.push({ name: 'detailOneTimes', params: a });
      } else {
        this.$router.push({ name: 'detailMoreTimes', params: a });
      }
    },

    loadMore () {
      const nowLength = this.search.start * 20;

      if (this.total > nowLength) {
        this.search.start++;

        this.getContractList();
      }
    },
    getContractList () {
      const params = {
        ...this.search
      };

      ContractService.getContractList(params).then((res) => {
        res.result.list.forEach(item => {
          item.createTime = this.changeTime(item.createTime);
          switch (item.deductedStatus) {
            case 0:
              item.deductedStatus = '未代扣';
              break;
            case 1:
              item.deductedStatus = '代扣处理中';
              break;
            case 2:
              item.deductedStatus = '充值失败';
              break;
            case 3:
              item.deductedStatus = '拨款失败';
              break;
            case 4:
              item.deductedStatus = '拨款成功';
              break;
            case 5:
              item.deductedStatus = '放弃代扣';
              break;
          }
        });

        this.total = res.result.count;

        if (res.code === '1000') {
          switch (this.search.contractStatus) {
            case 0:
              this.noOverList = this.noOverList.concat(res.result.list);
              break;
            case 1:
              this.doingList = this.doingList.concat(res.result.list);
              break;
            case 2:
              this.overList = this.overList.concat(res.result.list);
              break;
          }
        }

        const nowLength = this.search.start * 20;

        this.loadMoreTxt = this.total > nowLength ? '加载更多...' : '暂无更多数据';
      });
    },
    changeTime (time) {
      const date = new Date(time); // 增加8小时

      return date.toJSON().substr(0, 16).replace('T', ' ');
    }
  },
  watch: {
    $route (to) {
      // eslint-disable-next-line
      if (to.query.active == 0 || to.query.active == 1) {
        this.active = parseInt(to.query.active);

        this.search = {
          start: 1, // 分页页码
          offset: 20, // 每页条数
          keyword: '', // 搜索关键字
          contractStatus: parseInt(to.query.active), // 合同状态
        };

        this.noOverList = [];
        this.doingList = [];
        this.overList = [];
        this.total = 0;

        this.getContractList();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  .container {
    position: relative;
    background: #f4f4f4;
  }

  .ct-container {
    height: 100%;
  }

  .list {
    width: 100%;
  }

  .item {
    position: relative;
    display: flex;
    margin-top: 0.5rem;
    flex-direction: column;
    padding: 1rem 0 0.5rem;
    width: 100%;
    background: #ffffff;
    color: #818181;
  }

  .col {
    display: flex;
    padding: 0 1.2rem;
    min-height: 2rem;
    line-height: 2rem;
    font-size: 1rem;
  }

  .lab {
    margin-right: 0.8rem;
  }

  .col-btn {
    position: absolute;
    right: 1rem;
    border-radius: 1rem;
    background: #FE634D;
    color: #FFF;
    font-size: 1rem;
  }

  .col-btn-top {
    padding: 0.2rem 1.2rem;
    top: 6rem;
  }

  .col-btn-bottom {
    padding: 0.1rem 2.4rem;
    bottom: 0.5rem;
  }

  .review {
    margin-left: 1rem;
    color: #E65A7D;
  }

  .contract-box {
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
    top: 0;
    z-index: 1001;
  }

  .mask {
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.5;
  }

  .img {
    position: fixed;
    width: 60%;
    height: 96%;
    z-index: 1002;
    top: 1rem;
    left: 20%;
  }

  .loadMore {
    width: 100%;
    height: 3.2rem;
    text-align: center;
    line-height: 3.2rem;
    background: #f4f4f4;
    color: #333;
  }
</style>
