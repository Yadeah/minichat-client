<template>
  <div class="login">
    <header>
      <div class="logo">
        <svg-icon icon-class="logo" />
      </div>
      <TitleButton />
    </header>
    <main>
      <!-- 左侧扫码登录 -->
      <div class="scan">
        <div>
          <svg-icon icon-class="QR code" />
          <span>扫一扫登录</span>
        </div>
        <div>
          <p>请使用<span class="notice">MiniChat App</span>扫码登陆</p>
        </div>
        <div ref="qrcode" class="qrcode"></div>
        <el-button type="text" @click="getQrcode">刷新二维码</el-button>
      </div>

      <!-- 右侧账号密码登录 -->
      <div class="right">
        <div>账号登录</div>
        <el-button class="changeLoginType" type="text" size="mini" @click="changeLoginType">
          <span v-if="loginForm.isPasswordLogin">使用验证码登录</span>
          <span v-else>使用密码登录</span>
        </el-button>
        <el-form :model="loginForm.data" ref="loginForm">
          <el-form-item prop="account">
            <el-input v-model="loginForm.data.account" :placeholder="loginForm.isPasswordLogin ? '手机号码/邮箱/账号' : '手机号码'">
              <svg-icon slot="prefix" icon-class="account" />
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.data.password" :placeholder="loginForm.isPasswordLogin ? '密码' : '验证码'">
              <svg-icon slot="prefix" icon-class="password" />
              <span v-if="!loginForm.isPasswordLogin" slot="suffix">
                <el-button v-if="mobileCodeTimer.count===0" type="text" size="mini" slot="suffix" @click="getMobileCode">获取验证码</el-button>
                <p v-else>{{mobileCodeTimer.count}}秒后重新获取验证码</p>
              </span>
            </el-input>
          </el-form-item>
        </el-form>
        <div>
          <div style="float: left">
            <el-checkbox v-model="loginForm.isAutoLogin" size="mini">自动登录</el-checkbox>
            <el-checkbox v-model="loginForm.isRemember" size="mini" style="margin-left: 5px">记住密码</el-checkbox>
          </div>
          <div style="float: right">
            <el-button type="text" size="mini" @click="forgetPassword">忘记密码</el-button>
          </div>
        </div>
        <div>
          <el-button v-loading="logining" class="loginButton" type="primary" @click="login">登录</el-button>
        </div>
        <div class="footer">
          <el-button type="text" size="mini" @click="register">注册账号</el-button>
          <span class="footerRight">
            <el-button type="text">
              <svg-icon icon-class="wechat" />
            </el-button>
            <el-button type="text">
              <svg-icon icon-class="qq" />
            </el-button>
            <el-button type="text">
              <svg-icon icon-class="weibo" />
            </el-button>
          </span>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import TitleButton from '@/components/TitleButton'
import QRCode from 'qrcodejs2'
export default {
  components: {
    TitleButton,
    QRCode
  },
  data () {
    return {
      loginForm: {
        data: {
          account: '',
          password: ''
        },
        isPasswordLogin: true,
        isRemember: false,
        isAutoLogin: false
      },
      logining: false,
      mobileCodeTimer: {
        count: 0,
        timer: null
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getQrcode()
    })
  },
  methods: {
    /**
     * 获取二维码
     */
    getQrcode () {
      this.$refs.qrcode.innerHTML = ''
      /* eslint-disable no-new */
      new QRCode(this.$refs.qrcode, {
        text: 'http://www.baidu.com',
        width: 120,
        height: 120,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      })
    },
    /**
     * 获取验证码
     */
    getMobileCode () {
      this.getMobileCodeCountDown()
    },
    getMobileCodeCountDown () {
      const TIME_COUNT = 60
      if (!this.mobileCodeTimer.timer) {
        this.mobileCodeTimer.count = TIME_COUNT
        this.mobileCodeTimer.timer = setInterval(() => {
          if (this.mobileCodeTimer.count > 0 && this.mobileCodeTimer.count <= TIME_COUNT) {
            this.mobileCodeTimer.count--
          } else {
            clearInterval(this.mobileCodeTimer.timer)
            this.mobileCodeTimer.timer = null
          }
        }, 1000)
      }
    },
    /**
     * 切换登录方式
     */
    changeLoginType () {
      this.loginForm.isPasswordLogin = !this.loginForm.isPasswordLogin
    },
    /**
     * 忘记密码
     */
    forgetPassword () {

    },
    /**
     * 登录
     */
    login () {

    },
    /**
     * 注册
     */
    register () {

    }
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

.login {
  font-family: "微软雅黑";
  -webkit-user-select: none;
}

/* 头部 */
header {
  height: 75px;
  background-color: #eff2f6;
  -webkit-app-region: drag;
  position: relative;
}

header .logo {
  height: 100%;
  width: 80px;
  margin: 0 auto;
  text-align: center;
}

header .logo .svg-icon {
  width: 60%;
  height: 80%;
  margin-top: 10%;
}

/* 主体 */
main {
  height: 365px;
  padding-top: 30px;
  background: #ffffff;
}

main .scan {
  width: 45%;
  text-align: center;
  float: left;
}

main .scan p {
  margin-top: 20px;
}

main .scan p .notice {
  color: #398cff;
  margin: 0 3px;
}

main .scan .qrcode {
  padding: 10px;
  border: rgb(100, 100, 100) 1px solid;
  border-radius: 3px;
  width: 140px;
  height: 140px;
  margin: 20px auto;
}

main .right {
  width: 55%;
  float: right;
  text-align: center;
  padding: 0 50px;
}

main .right .changeLoginType {
  margin: 0 0 5px 70%;
}

main .right .loginButton {
  width: 100%;
  margin-top: 10px;
}

main .right .footer {
  margin-top: 30px;
  height: 30px;
  text-align: left;
}

main .right .footer .footerRight {
  padding: 0;
  margin-left: 45%;
}
</style>