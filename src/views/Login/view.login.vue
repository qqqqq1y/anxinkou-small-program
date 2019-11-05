<template>
  <div class="container">
    <div class="login-container">
      <div class="logo-box">
        <img class="logo" src="../../../static/img/logo.png" alt="">
      </div>

      <div class="login-box">
        <van-cell-group>
          <van-field
            v-model="username"
            clearable
            placeholder-style="color: #fff"
            left-icon="contact"
            placeholder="请输入用户名"
            @input="handleUsername"
          />
        </van-cell-group>
        <van-cell-group>
          <van-field
            v-model="password"
            clearable
            placeholder-style="color: #fff"
            left-icon="close"
            placeholder="请输入密码"
            type="password"
            @input="handlePassword"
          />
        </van-cell-group>
        <div class="radio-group">
          <van-checkbox
            v-model="isChecked"
            shape="square"
            name="yes"
            checked-color="#07c160"
            @click="handleChangeCheck"
            >记住用户名</van-checkbox>
        </div>
      </div>

      <div class="login-btn">
        <div class="btn" @click="handleLogin">登录</div>
      </div>
    </div>
  </div>

</template>

<script>
import { Toast } from 'vant';
import LoginService from '@/api/login';

export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      hasLogin: false,
      isChecked: true,
    };
  },
  mounted () {
    const user = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    if (token) {
      this.$router.push({ name: 'home' });
    }

    if (user) {
      this.username = user;
    }
  },
  methods: {
    handleUsername (val) {
      this.username = val;
      this.hasLogin = false;
    },

    handlePassword (val) {
      this.password = val;
      this.hasLogin = false;
    },

    handleChangeCheck () {
      this.isChecked = !this.isChecked;
    },

    handleLogin () {
      if (this.hasLogin) {
        return false;
      }

      this.hasLogin = true;

      const params = {
        jobCode: this.username,
        pass: this.password
      };

      LoginService.login(params).then(res => {
        if (res.code === '1000') {
          localStorage.setItem('token', res.result.token);

          localStorage.setItem('userInfo', JSON.stringify(res.result));

          if (this.isChecked) {
            localStorage.setItem('username', this.username);
          } else {
            localStorage.removeItem('username');
          }

          this.hasLogin = true;

          this.$router.push({ name: 'home' });
        } else {
          Toast.fail('登录失败');
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    padding: 0 6.0rem;
    width: 100%;
    min-height: 100%;
    background: url('http://testimage.weiqiangtech.com/upload/background_img.png');
    background-repeat: repeat-y;
  }

  .login-container {
    display: flex;
    flex-direction: column;

    width: 100%;
    height: 100%;
  }

  .logo-box {
    height: 22.0rem;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
  }

  .logo {
    width: 7.0rem;
    height: 7.0rem;
  }

  .radio-group {
    margin-top: 1.2rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 4.0rem;
    line-height: 4.0rem;
    font-size: 1.4rem;
  }

  .login-btn {
    display: flex;
    margin-top: 2.2rem;
  }

  .btn {
    width: 100%;
    height: 4.0rem;
    text-align: center;
    line-height: 4.0rem;
    background: #fff;
    border-radius: 3.25rem;
    font-size: 1.4rem;
    color: #FC3B40;
  }

</style>
