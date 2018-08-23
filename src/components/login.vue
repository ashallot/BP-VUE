<template>
<div class="layout">
    <Layout>
        <Header>
            <Menu mode="horizontal" theme="light" active-name="1">
                <div class="layout-logo">
                  <img src="../assets/logo-top.png" alt="">
                </div>
                <div class="layout-nav">
                  <Button type="text">登录/注册</Button>
                </div>
            </Menu>
        </Header>
        <Content>
          <div class="containner-box">
            <div class="bgimg">
              <div class="loginForm">
                <div class="title">手机验证码登录</div>
                <div class="in-icon" style="margin-top: 30px;margin-bottom: 10px;position: relative;">
                  <span><i class="headpic"></i></span>
                  <input @focus="telFocus" @blur="telBlur" class="bp-input" v-model="tel" placeholder="请输入手机号" maxlength="11" style="width: 400px" />
                </div>
                <div class="warn" v-if="!telValidate">
                  <div style="float:left"><img src="../assets/warning.png" alt=""></div>
                  <span>{{telTips}}</span>
                </div>
                <div class="in-icon" style="margin-top: 10px;margin-bottom: 10px;position: relative;overflow: hidden;">
                  <span><i class="pwdpic"></i></span>
                  <input @focus="codeFocus" @blur="codeBlur" class="bp-input" v-model="code" placeholder="请输入验证码" maxlength="4" style="width: 280px;float: left;" />
                  <Button @click="getCode" style="float:left;margin-left:6px;width:112px;height: 40px;">
                    <!-- <div style="color:#c63a47">{{getTxt}}</div> -->
                    <div style="color:#c63a47" v-if="!sendMsgDisabled && !reGet">发送验证码</div>
                    <div style="color:#c63a47" v-if="!sendMsgDisabled && reGet">重新获取</div>
                    <div style="color:#c63a47" v-if="sendMsgDisabled">{{rTime+'秒后重新获取'}}</div>
                  </Button>
                </div>
                <div class="warn" v-if="!codeValidate">
                  <div style="float:left"><img src="../assets/warning.png" alt=""></div>
                  <span>{{vcodeTips}}</span>
                </div>
                <Button class="LoginBtn" @click="login">登录/注册</Button>
              </div>
            </div>
            <div v-if="false" class="footimg">
              <Header>
                <Menu mode="horizontal"  active-name="1">
                    <div style="height:30px;float:left;margin-left:20px;">
                      <img style="position: absolute;top: 5px;" src="../assets/logo-foot.png" alt="">
                    </div>
                    <ul class="foot-nav" style="position: absolute !important;list-style:none;">
                        <li name="1">
                            关于我们
                        </li>
                        <li name="2">
                            服务
                        </li>
                        <li name="3">
                            项目
                        </li>
                        <li name="4">
                            联系我们
                        </li>
                    </ul>
                </Menu>
              </Header>
            </div>
          </div>
        </Content>
    </Layout>
    <Modal v-model="modal" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>提示</span>
      </p>
      <div style="text-align:center">
        <p>该平台仅对创业者开发</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long @click="confirm">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      telTips: '',
      vcodeTips: '',
      data:'',
      tel: "",
      password: "",
      getTxt: "获取验证码",
      telValidate: true,
      codeValidate: true,
      code:'',
      isInvestor:false,
      isUserInfo:false,
      modal:false,
      reGet: false, // 重新获取
      rTime: 60, // 发送验证码倒计时
      sendMsgDisabled: false, // 发送验证码按钮状态
    };
  },
  methods:{
    telFocus() {
      this.telValidate = true;
    },
    telBlur () {
      if (this.tel.substring(0,1) != '1' || this.tel.length != 11) {
        this.telValidate = false;
      } else {
        this.telValidate = true;
      }
      if (this.tel.trim().length == 0) {
        this.telTips = '请输入手机号'
      } else {
        this.telTips = '手机号错误'
      }
    },
    codeFocus() {
      this.codeValidate = true;
    },
    codeBlur () {
      if(this.code == null || this.code.trim().length == 0){
        this.codeValidate = false;
      } else {
        this.codeValidate = true;
      }
      if (this.code.trim().length == 0) {
        this.vcodeTips = '请输入验证码'
      } else {
        this.vcodeTips = '验证码错误'
      }
    },
    login() {
      var validate = true
      if(this.code == null || this.code.trim().length == 0){
        this.codeValidate = false;
        validate = false
      }else{
        this.codeValidate = true;
      }
      if (this.tel.substring(0,1) != '1' || this.tel.length != 11) {
        this.telValidate = false;
        validate = false
      } else {
        this.telValidate = true;
      }
      this.telBlur()
      this.codeBlur()

      if (validate) {
        this.$https.post('/bp/user/login', {  
          userName: this.tel,  
          vCode: this.code,
          userType: 0
        }, {
          headers: {
            Cookie: localStorage.Cookie,
            'Content-Type': 'application/json'
          }
        }).then(res => {
          console.log(res)
          if (res.data.code === 200) {
            var Cookie = 'JSESSIONID=' + res.data.data.JSESSIONID
            var user = res.data.data.user
            if (user != null) {
              localStorage.userName = user.userName
              localStorage.user = JSON.stringify(user)
              localStorage.Cookie = Cookie
              if (user.userType == 1)  {
                // 直接跳转到创业者首页
                this.$router.push({path: '/BPIndex'})
              } else if (user.userType == 2) {
                // 提示“该平台仅对创业者开放！”
                this.$Modal.info({
                  title: '提示',
                  content: '<p>' + '该平台仅对创业者开放！' + '</p>',
                  onOk: () => {
                      
                  },
                  onCancel: () => {
                      
                  }
                });
              } else {
                // 提示去设置创业者信息
                this.$Modal.info({
                  title: '提示',
                  content: '<p>' + '该平台仅对创业者开放！请先设置您的创业者信息~' + '</p>',
                  onOk: () => {
                    this.$router.push({path: '/userInfo'})
                  },
                  onCancel: () => {
                      
                  }
                });
              }
            }
          } else if (res.data.code === 500) {
            // this.$Message.error(res.data.message)
            this.codeValidate = false
          } else {
            this.$Message.error('登录失败！请重试！')
          }
        });
      }
    },
    send() {
      let that = this;
      that.sendMsgDisabled = true;
      let rTime = that.rTime;
      // 倒计时
      let interval = window.setInterval(() => {
        if (--that.rTime <= 0) {
          that.rTime = rTime;
          that.sendMsgDisabled = false;
          that.reGet = true; // 重新获取按钮
          window.clearInterval(interval);
        }
      }, 1000);
    },
    getCode(){
      const that = this
      if (this.sendMsgDisabled) {
        return
      }
      
      if (this.tel.substring(0,1) != '1' || this.tel.length != 11) {
        this.telValidate = false;
      } else {
        this.telValidate = true;
      }
      if (this.telValidate) {
        this.$https.get("/bp/user/sendSms" , {
          params: {
            userName: this.tel
          }
        }).then(res => {
          console.log(res)
          if (res.status === 200) {
            var Cookie = 'JSESSIONID=' + res.data.data.JSESSIONID
            localStorage.Cookie = Cookie
            var timestamp = (new Date()).valueOf() / 1000;
            localStorage.lastSendCodeTime = timestamp
            that.send()
          }
        });
      }
    },
    confirm(){
      this.modal = false;
    }
  },
  mounted(){
    // 倒计时判断
    // var lastSendCodeTime = parseFloat(localStorage.lastSendCodeTime);
    // var timestamp = (new Date()).valueOf() / 1000;
    // if (lastSendCodeTime + 60 > timestamp) {
    //   this.rTime = parseInt(lastSendCodeTime + 60 - timestamp)
    //   this.send()
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bp-input {
  height: 40px;
  background-color: rgb(90, 90, 90);
  border: 1px solid rgb(90, 90, 90);
  opacity: 0.6;
  border-radius: 5px;
  padding-left: 40px;
  color: #FFFFFF;
}
input::-webkit-input-placeholder {
  color: white;
}
input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: white;
}
input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: white;
}
input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: white;
}
.layout {
  /* border: 1px solid #d7dde4; */
  background: #28292c;
  position: relative;
  overflow: hidden;
}
.layout-logo {
  width: 100px;
  height: 40px;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 85px;
  margin: 0 auto;
  margin-right: 20px;
}
.bgimg {
  background-image: url(../assets/bg.png);
  height: calc(100vh - 64px);
  width: 100%;
  background-size: cover;
}
.loginForm {
  height: 400px;
  width: 400px;
  position: absolute;
  top: 280px;
  left: calc(50% - 200px);
}
.title {
  color: white;
  text-align: left;
  font-size: 22px;
}
.headpic {
  display: inline-block;
  width: 40px;
  height: 40px;
  background-image: url(../assets/Male-User.png);
  background-position: center center;
  background-repeat: no-repeat;
  text-align: center;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}
.pwdpic {
  display: inline-block;
  width: 40px;
  height: 40px;
  background-image: url(../assets/Lock-.png);
  background-position: center center;
  background-repeat: no-repeat;
  text-align: center;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}
.in-icon span {
  width: 40px;
  height: 40px;
  text-align: center;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}
.warn {
  height: 20px;
  line-height: 20px;
  text-align: left;
  color: white;
}
.warn span {
  opacity: 0.5;
  margin-left: 5px;
}
.LoginBtn{
  width: 400px;
  margin-top: 30px;
  background-color:#c63a47;
  border: 1px solid #c63a47;
  color:white;
  font-size: 18px;
}
.footimg {
  background-image: url(../assets/footer.png);
  height: 30px;
  width: 100%;
  background-size: cover;
  /* position: absolute;
  bottom: 0; */
}
.footimg div,
.footimg div ul {
  background: transparent;
  height: 30px !important;
  position: unset !important;
}
.foot-nav {
  right: 70px;
}
.foot-nav li {
  float: left;
  width: 100px;
  color: white;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
}
.containner-box {
  display: flex;
  flex-direction: column;
}

.ivu-layout-header {
    background: white !important;
}
.ivu-menu-horizontal.ivu-menu-light:after{
  background:white !important;
}


</style>
