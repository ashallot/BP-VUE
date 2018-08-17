<template>
  <div class="layout">
      <Layout>
        <Header>
            <Menu mode="horizontal" theme="light" active-name="1">
                <div class="layout-logo">
                  <img src="../assets/logo-top.png" alt="">
                </div>
                <div class="layout-nav">
                  <div style="float:right;cursor:pointer;" @click="logout">
                    <div style="width:15px;height;15px;float: left;margin-right: 5px;"><img src="../assets/logout.png" alt=""></div>
                    <span>退出系统</span>
                  </div>
                  <div style="float:right;margin-right: 5px;">|</div>
                  <div style="float:right;margin-right: 5px;">{{ accountName }}</div>
                  <div style="height:60px;"><img style="margin-top: 5px;" src="../assets/head.png" alt=""></div>
                </div>
            </Menu>
        </Header>
        <Content class="content-box">
          <Breadcrumb :style="{margin: '20px 0','text-align': 'left'}">
            您当前位置：
            <!-- <BreadcrumbItem>首页</BreadcrumbItem> -->
            <BreadcrumbItem>填写身份信息</BreadcrumbItem>
          </Breadcrumb>
          <Card>
            <div style="min-height: 720px;">
              <div class="title">填写身份信息</div>
              <div class="container">
                <div class="input-cell">
                  <span style="color:red;">*</span>
                  <label>请填写真实姓名：</label>
                  <Input @on-change="realNameChanged" v-model="realName" placeholder="请输入姓名" style="width: 500px" />
                  <div v-if="!realNameValidate" class="warn">
                    <div style="float:left;margin-left:0"><img src="../assets/warning.png" alt=""></div>
                    <span>请填写真实姓名</span>
                  </div>
                </div>
                <div class="input-cell">
                  <span style="color:red">*</span>
                  <label>请填写常用邮箱：</label>
                  <Input @on-change="emailChanged" v-model="email" placeholder="请输入邮箱" style="width: 500px" />
                  <div v-if="!emailValidate" class="warn">
                    <div style="float:left;margin-left:0"><img src="../assets/warning.png" alt=""></div>
                    <span>请填写常用邮箱/请填写正确的邮箱地址</span>
                  </div>
                </div>
                <div class="input-cell">
                  <span style="color:red">*</span>
                  <label>请填写公司或团队名称：</label>
                  <Input @on-change="companyNameChanged" v-model="companyName" placeholder="请输入公司或团队" style="width: 500px;margin-left: 108px !important;" />
                  <div v-if="!companyNameValidate" class="warn">
                    <div style="float:left;margin-left:0"><img src="../assets/warning.png" alt=""></div>
                    <span>请填写公司或团队名称</span>
                  </div>
                </div>
                <Button class="SubmitBtn" @click="submit">提交</Button>
              </div>
            </div>
          </Card>
        </Content>
        <div v-if="false" class="footimg">
              <Header>
                <Menu mode="horizontal"  active-name="1">
                    <div style="height:60px;float:left;margin-left:20px;">
                      <img style="position: absolute;bottom: 20px;" src="../assets/logo-foot.png" alt="">
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
    </Layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      accountName: localStorage.userName,
      realName: "",
      email: "",
      companyName: "",
      realNameValidate: false,
      emailValidate: false,
      companyNameValidate: false
    };
  },
  methods: {
    realNameChanged () {
      if (this.realName == '' || this.realName.trim() == '') {
        this.realNameValidate = false
      } else {
        this.realNameValidate = true
      }
    },
    emailChanged () {
      var reg = new RegExp("^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$");
      this.emailValidate = reg.test(this.email)
    },
    companyNameChanged () {
      if (this.companyName == '' || this.companyName.trim() == '') {
        this.companyNameValidate = false
      } else {
        this.companyNameValidate = true
      }
    },
    submit() {

      if (!this.realNameValidate || !this.emailValidate || !this.companyNameValidate) {
        return
      }

      this.$https.post('/bp/user/updateUser', {  
        email: this.email,
        companyName: this.companyName,
        realName: this.realName,
        userType: '1'
      }, {
        headers: {
          Cookie: localStorage.Cookie,
          'Content-Type': 'application/json'
        }
      }).then(res => {
        console.log(res)
        if (res.data.code == 200) {
          this.$router.push({path: '/BPIndex'})
        } else {
          this.$Message.error('身份信息设置失败！请重试！')
        }
      });
    },
    logout() {
      // http
      localStorage.removeItem('Cookie');
      this.$router.push({path: '/login'})
    },
    confirm(){
      this.modal = false;
    }
  },
  mounted() {}
};
</script>

<style scoped>
.ivu-layout-header {
  background: rgb(58, 59, 60);
}
.ivu-menu-light {
  background: rgb(58, 59, 60);
}
.ivu-menu {
  position: unset;
}
.layout {
  /* border: 1px solid rgb(58, 59, 60); */
  background: #f5f7f9;
  position: relative;
  /* border-radius: 4px; */
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
  width: 240px;
  margin: 0 auto;
  margin-right: 20px;
  overflow: hidden;
  color: rgb(155, 140, 184);
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
  margin-left: 20px !important;
  height: 20px;
  line-height: 20px;
  text-align: left;
  color: #c63a47;
  margin-top: 5px;
}
.warn span {
  opacity: 0.5;
  margin-left: 5px;
}
.SubmitBtn {
  width: 200px;
  margin-top: 30px;
  background-color: #c63a47;
  border: 1px solid #c63a47;
  color: white;
  font-size: 18px;
  float: left;
}
.footimg {
  background-image: url(../assets/footer.png);
  height: 60px;
  width: 100%;
}
.footimg div,
.footimg div ul {
  background: transparent;
  height: 60px !important;
  position: unset !important;
}
.foot-nav {
  right: 70px;
}
.foot-nav li {
  float: left;
  width: 100px;
  color: white;
  height: 60px;
  line-height: 60px;
  cursor: pointer;
}
.title {
  text-align: left;
  font-size: 20px;
  padding: 10px;
  background: rgb(254, 247, 247);
}
.container {
  padding: 10px;
  overflow: hidden;
}
.input-cell {
  width: 100%;
  overflow: hidden;
  padding-top: 20px;
}
.input-cell span,
.input-cell label,
.input-cell div {
  float: left;
}
.input-cell label {
  font-weight: bold;
}
.input-cell div {
  margin-left: 150px;
}

.content-box {
  min-height: calc(100vh - 64px);
  min-width: 1200px;
  padding: 0px calc((100vw - 1200px) / 2);
}

</style>