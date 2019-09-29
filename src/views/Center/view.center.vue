<template>
  <div class="container">
    <navigation :showBack="false" :title="'个人中心'"></navigation>
    <div class="my-container">
      <div class="info">
        <div class="avatar">
          <img class="img" src="/static/img/default.png" />
        </div>
        <div class="name">{{ info.adminName }}</div>
        <div >{{ info.jobCode }}</div>
      </div>

      <div class="main">
        <div class="col">
          <div class="col-bor">
            <img class="col-icon" src="/static/img/icon_opera.png" />
            <div class="col-lab">所属公司:</div>
            <div class="col-val opera">北京无线科技有限公司</div>
          </div>
        </div>
        <div class="col">
          <div class="col-bor">
            <img class="col-icon about" src="/static/img/icon_about.png" />
            <div class="col-lab" style="text-align: left">关于我们:</div>
            <div class="col-val arrow"></div>
          </div>
        </div>
        <div class="col">
          <div class="col-bor">
            <img class="col-icon" src="/static/img/icon_change_pwd.png" />
            <div class="col-lab">密码修改:</div>
            <div class="col-val arrow"></div>
          </div>
        </div>
        <div class="col">
          <div class="col-bor">
            <img class="col-icon" src="/static/img/icon_version.png" />
            <div class="col-lab">当前版本:</div>
            <div class="col-val col-red">V.1.3</div>
          </div>
        </div>
        <div class="col">
          <div class="col-bor">
            <img class="col-icon" src="/static/img/icon_phone.png" />
            <div class="col-lab">客服电话:</div>
            <div class="col-val col-red">4001002323</div>
          </div>
        </div>
        <div class="col">
          <div class="col-bor">
            <img class="col-icon" src="/static/img/icon_download.png" />
            <div class="col-lab">下载专区:</div>
            <div class="col-val">
              <img class="code" src="/static/img/icon_deminsion.png" />
            </div>
          </div>
        </div>
      </div>

      <div class="logout">退出登录</div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'center',
  data () {
    return {
      info: {}
    };
  },
  mounted () {
    this.info = JSON.parse(localStorage.getItem('userInfo'));
  }
};
</script>

<style lang="scss" scoped>
.container {
  background: #EFEFF4;
}

.info {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 15rem;
  background: #FF6A6E;
  color: #FFF;
}

.avatar {
  margin: 1.2rem 0;
  width: 6rem;
  height: 6rem;
  overflow: hidden;
}

.img {
  width: 100%;
  height: 100%;
  border-radius: 6rem;
}

.name {
  margin-bottom: 1rem;
}

.main {
  margin-top: 1rem;
  background: #FFF;
}

.col {
  display: flex;
  padding: 0 0.5rem;
}

.col-bor {
  display: flex;
  width: 100%;
  height: 3.2rem;
  align-items: center;
  font-size: 1.2rem;
  color: #333;
  border-bottom: 1px solid #E7E9E8;
}

.col-icon {
  width: 1.2rem;
  height: 1.2rem;
}

.col-lab {
  width: 5rem;
  padding-right: 0.5rem;
  text-align: right;
}

.col-val {
  flex: 1;
  padding-right: 0.5rem;
  text-align: right;
}

.arrow {
  position: relative;
}

.arrow:before {
  content: '';
  position: absolute;
  top: -0.5rem;
  right: 0.5rem;
  width: 0;
  height: 0;
  border-left: 10px solid #E4E4E2;
  border-bottom: 10px solid transparent;
  border-top: 10px solid transparent;
}

.arrow:after {
  content: '';
  position: absolute;
  top: -5px;
  right: 8px;
  width: 0;
  height: 0;
  border-bottom: 9px solid transparent;
  border-left: 9px solid #fff;
  border-top: 9px solid transparent;
}

.col-red {
  color: #D8626E;
}

.about {
  width: 1.8rem;
  height: 1.8rem;
}

.opera {
  text-align: left;
}

.code {
  width: 2rem;
  height: 2rem;
}

.logout {
  width: 100%;
  height: 3rem;
  margin-top: 2rem;
  text-align: center;
  line-height: 3rem;
  background: #FFF;
  font-size: 1.2rem;
  color: #D8626E;
}

</style>
