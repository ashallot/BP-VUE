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
                  <div style="float:right;margin-right: 5px;">admin</div>
                  <div style="height:60px;"><img style="margin-top: 5px;" src="../assets/head.png" alt=""></div>
                </div>
            </Menu>
        </Header>
        <Content :style="{padding: '0 50px'}">
          <Breadcrumb :style="{margin: '20px 0','text-align': 'left'}">
            您当前位置：
            <BreadcrumbItem>首页</BreadcrumbItem>
            <BreadcrumbItem>上传BP</BreadcrumbItem>
          </Breadcrumb>
          <Card>
            <div style="min-height: 720px;">
              <div class="title" @click="panel(1)">
                <span>课程基本信息</span>
                <img style="height: 15px;margin-left: 50px;" src="../assets/down.png" alt="">
              </div>
              <div class="container" v-if="modal1">
                <div class="input-cell">
                  <span style="color:red;">*</span>
                  <label>项目名称：</label>
                  <Input v-model="username" placeholder="请输入手机号" :maxlength="11" style="width: 500px" />
                  <p style="color:gray;float:left;margin-left:20px;">(请输入2-20个字)</p>
                </div>
                <div class="input-cell">
                  <span style="color:red">*</span>
                  <label>项目简介：</label>
                  <Input v-model="email" placeholder="请输入邮箱" style="width: 500px" />
                </div>
                <div class="input-cell">
                  <span style="color:red">*</span>
                  <label>项目展示小图：</label>
                  <p class="tipword">(支持格式：jpg、png，尺寸：290*236，大小在300kb之内)</p>
                  <Input v-model="team" placeholder="请输入公司或团队" style="width: 500px;margin-left: 95px !important;" />
                </div>
                <div class="input-cell">
                  <span style="color:red">*</span>
                  <label>项目封面：</label>
                  <p class="tipword">(支持格式：jpg、png，尺寸：290*236，大小在300kb之内)</p>
                  <Input v-model="team" placeholder="请输入公司或团队" style="width: 500px;margin-left: 95px !important;" />
                </div>
                <div class="input-cell">
                  <span style="color:red">*</span>
                  <label>上传BP演讲视频/音频：</label>
                  <p class="tipword">(支持格式：视频为mp4，音频为mp3，大小在500M之内)</p>
                  <Input v-model="team" placeholder="请输入公司或团队" style="width: 500px;margin-left: 95px !important;" />
                </div>
                <div class="input-cell">
                  <span style="color:red">*</span>
                  <label>项目详情：</label>
                  <p class="tipword">(为保证良好的阅读体验，建议上传宽度为750px，大小在2M之内图片)</p>
                  <Input v-model="team" placeholder="请输入公司或团队" style="width: 500px;margin-left: 95px !important;" />
                </div>
                <Button class="SubmitBtn" @click="submit">提交</Button>
              </div>

              <div class="title" @click="panel(2)">
                <span>课程基本信息</span>
                <img style="height: 15px;margin-left: 50px;" src="../assets/down.png" alt="">
              </div>
              <div class="container" v-if="modal2">
                <div class="input-cell">
                  <span style="color:red;">*</span>
                  <label>请填写真实姓名：</label>
                  <Input v-model="username" placeholder="请输入姓名" style="width: 500px" />
                </div>
                <div class="input-cell">
                  <span style="color:red">*</span>
                  <label>请填写常用邮箱：</label>
                  <Input v-model="email" placeholder="请输入邮箱" style="width: 500px" />
                </div>
                <div class="input-cell">
                  <span style="color:red">*</span>
                  <label>请填写公司或团队名称：</label>
                  <Input v-model="team" placeholder="请输入公司或团队" style="width: 500px;margin-left: 95px !important;" />
                </div>
                <Button class="SubmitBtn" @click="submit">提交</Button>
              </div>

              <div class="title"  @click="panel(3)">
                <span>课程基本信息</span>
                <img style="height: 15px;margin-left: 50px;" src="../assets/down.png" alt="">
              </div>
              <div class="container" v-if="modal3">
                <div class="input-cell">
                  <span style="color:red;">*</span>
                  <label>请填写真实姓名：</label>
                  <Input v-model="username" placeholder="请输入姓名" style="width: 500px" />
                </div>
                <div class="input-cell">
                  <span style="color:red">*</span>
                  <label>请填写常用邮箱：</label>
                  <Input v-model="email" placeholder="请输入邮箱" style="width: 500px" />
                </div>
                <div class="input-cell">
                  <span style="color:red">*</span>
                  <label>请填写公司或团队名称：</label>
                  <Input v-model="team" placeholder="请输入公司或团队" style="width: 500px;margin-left: 95px !important;" />
                </div>
                <Button class="SubmitBtn" @click="submit">提交</Button>
              </div>
            </div>
          </Card>
        </Content>
        <div class="footimg">
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
        id:'',
        username:'',
        email:'',
        team:'',
        modal1:true,
        modal2:true,
        modal3:true
    };
  },
  methods:{
    panel(p){
      switch(p){
        case 1:this.modal1 = !this.modal1;break;
        case 2:this.modal2 = !this.modal2;break;
        case 3:this.modal3 = !this.modal3;break;
      }
      
    },
    submit(){

    },
    logout(){

    }
  },
  updated(){

  },
  mounted(){
    this.id = this.$route.params.BPId;
  }
}
</script>

<style scoped>
.ivu-layout-header {
    background: rgb(58,59,60);
}
.ivu-menu-light {
    background: rgb(58,59,60);
}
.ivu-menu{
  position: unset;
}
.layout {
  border: 1px solid rgb(58,59,60);
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
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
  color:rgb(155,140,184)
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
.SubmitBtn{
  width:300px;
  margin-top: 30px;
  background-color:#c63a47;
  border: 1px solid #c63a47;
  color:white;
  font-size: 18px;
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
  cursor: pointer;
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
.tipword{
  float: left;
}
</style>