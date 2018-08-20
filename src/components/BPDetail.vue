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
                    <div style="width:15px;height;15px;float: left;margin-right: 5px;margin-top:3px;"><img src="../assets/logout.png" alt=""></div>
                    <span>退出系统</span>
                  </div>
                  <div style="float:right;margin-right: 5px;">|</div>
                  <div style="float:right;margin-right: 5px;">{{ userName }}</div>
                  <div style="height:60px;"><img style="margin-top: 5px;" src="../assets/head.png" alt=""></div>
                </div>
            </Menu>
        </Header>
        <Content class="content-box">
          <Breadcrumb :style="{margin: '20px 0','text-align': 'left'}">
            您当前位置：
            <BreadcrumbItem to="/BPIndex">BP管理</BreadcrumbItem>
            <BreadcrumbItem>BP详情</BreadcrumbItem>
          </Breadcrumb>
          <Card class="card-box">
            <div style="min-height: 720px;">
              <div class="title" @click="panel(1)">
                <span style="margin-left: 20px;">项目基本信息</span>
                <img v-if="!modal1" style="position:absolute;height:50px;top:0;left:200px;" src="../assets/down.png" alt="">
                <img v-if="modal1" style="position:absolute;height:50px;top:0;left:200px;" src="../assets/up.png" alt="">
              </div>
              <div class="container" v-if="modal1">
                <div class="input-cell">
                  <span style="color:red;">*</span>
                  <label>项目名称：</label>
                  <span>{{ projectName }}</span>
                </div>
                <div class="input-cell">
                  <span style="color:red">*</span>
                  <label>项目简介：</label>
                  <p>{{ projectIntroduce }}</p>
                </div>
                <div class="input-cell" style="height: 280px;">
                  <span style="color:red">*</span>
                  <label>项目展示小图：</label>
                  <p class="tipword"></p><br>
                  <div class="demo-upload-list" :style="smallPIC.status === 'finished' ? 'height: 236px;margin-top: 10px;margin-left:10px;' : ''">
                      <template v-if="smallPIC.status === 'finished'">
                          <img :src="smallPIC.response.data.fileUrl"   style="width:290px;height:236px;">
                      </template>
                  </div>
                </div>
                <div class="input-cell" style="height:420px;">
                  <span style="color:red">*</span>
                  <label>项目封面：</label>
                  <p class="tipword"></p><br>
                  <div class="demo-upload-list" :style="topPIC.status === 'finished' ? 'height: 377px; margin-left:10px;margin-top:10px;' : ''">
                      <template v-if="topPIC.status === 'finished'">
                          <img :src="topPIC.response.data.fileUrl"   style="width:670px;height:377px;">
                      </template>
                  </div>
                </div>
                <div class="input-cell">
                  <span style="color:red">*</span>
                  <label>上传BP演讲视频/音频：</label>
                  <p class="tipword"></p><br>
                  <div style="height: 38px;line-height:38px;">已上传：{{music.name}}</div>
                   
                </div>
                <div class="input-cell">
                  <span style="color:red">*</span>
                  <label>项目详情：</label>
                  <p class="tipword"></p>
                  <div class="components-container" style="width:100%">
                    <div class="editor-container" style="width:100%">
                      <div v-html='defaultMsg'></div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="title" @click="panel(2)">
                <span style="margin-left: 20px;">团队介绍</span>
                <img v-if="!modal2" style="position:absolute;height:50px;top:0;left:200px;" src="../assets/down.png" alt="">
                <img v-if="modal2" style="position:absolute;height:50px;top:0;left:200px;" src="../assets/up.png" alt="">
              </div>
              <div class="container" v-if="modal2">
                <div class="input-cell">
                  <span style="color:red;">*</span>
                  <label>公司或团队名称：</label>
                  <span>{{ companyName }}</span>
                </div>
                <div class="input-cell">
                  <span style="color:red">*</span>
                  <label>团队成员：</label><br>
                  <div v-for="(item,index) in bpTeams" :key="index" style="overflow:hidden;width:100%; height: auto; margin: 10px;display: flex;flex-direction:row;">
                    <div class="headpic">
                      <div class="demo-upload-list" :style="item.headpic.status === 'finished' ? 'height: 100px;width:100px;' : ''">
                        <template v-if="item.headpic.status === 'finished'">
                            <img :src="item.headpic.response.data.fileUrl"   style="width:100px;height:100px;">
                        </template>
                      </div>
                    </div>
                    <div class="memberInfo">
                      <div style="display: flex; flex-direction: row;">
                        <div class="input-cell" style="display: flex; flex-direction: row;flex: 1;padding-right: 4px;">
                          <span style="color:red;">*</span>
                          <span style="width: 80px;">姓名：</span>
                          <span>{{item.userName}}</span>
                        </div>
                        <div class="input-cell" style="float:right; display: flex; flex-direction: row;flex: 1;padding-left: 4px;">
                          <span style="color:red;">*</span>
                          <span style="width: 80px;">角色：</span>
                          <span>{{item.roles}}</span>
                        </div>
                      </div>
                      <div class="input-cell" style="display: flex; flex-direction: row;">
                        <span style="color:red">*</span>
                        <span style="width: 68px;">介绍：</span>
                        <span>{{item.introduce}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="title"  @click="panel(3)">
                <span style="margin-left: 20px;">PPT</span>
                <img v-if="!modal3" style="position:absolute;height:50px;top:0;left:200px;" src="../assets/down.png" alt="">
                <img v-if="modal3" style="position:absolute;height:50px;top:0;left:200px;" src="../assets/up.png" alt="">
              </div>
              <div class="container" v-if="modal3">
                <div class="input-cell">
                  <!-- <span style="color:red;">*</span> -->
                  <label>ppt：</label>
                  <div v-if="ppt != null && ppt.name != ''" style="height: 38px;line-height:38px;">已上传：{{ppt.name}}</div>
                </div>
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
import '../../static/UE/ueditor.config.js'
import '../../static/UE/ueditor.all.min.js'
import '../../static/UE/lang/zh-cn/zh-cn.js'
import '../../static/UE/ueditor.parse.min.js'
import UE from "./ue/ue";

import VueEditor from 'vue-ueditor'

export default {
  components: { 
    UE,
    VueEditor
  },
  data() {
    return {
      userName: localStorage.userName,
      Cookie: localStorage.Cookie,
      id: "",
      projectName: "",
      projectIntroduce: "",
      companyName:'',
      modal1: true,
      modal2: true,
      modal3: true,
      smallPIC: [],
      smallPICName: "",
      smallvisible: false,
      topPIC: [],
      topPICName: "",
      topvisible: false,
      projectName: "",
      bpTeams: [],
      defaultMsg:'',
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 350
      },
      ue: "ue",
      UEcontent:'',
      file: '',
      data:'',
      ppt:'',
      music:''
    };
  },
  methods: {
    smallView (name) {
        this.smallPICName = name;
        this.smallvisible = true;
    },
    smallRemove (file) {
      this.smallPIC = [];
    },
    smallSuccess(res, file) {
      this.smallPIC = file;
    },
    smallFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不正确！",
        desc: "文件格式" + file.name + " 不正确, 请选择.jpg或.png的文件"
      });
    },
    smallMaxSize(file) {
      this.$Notice.warning({
        title: "超出文件大小限制！",
        desc: "文件" + file.name + "太大, 请选择不超过300kb的文件"
      });
    },
    musicRemove (file) {
      this.music = [];
      console.log(this.music)
    },
    musicSuccess(res, file) {
      this.music = file;
    },
    musicFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不正确！",
        desc: "文件格式" + file.name + " 不正确, 请选择.mp3或.mp4的文件"
      });
    },
    musicMaxSize(file) {
      this.$Notice.warning({
        title: "超出文件大小限制！",
        desc: "文件" + file.name + "太大, 请选择不超过500Mb的文件"
      });
    },
    
    topView (name) {
        this.topPICName = name;
        this.topvisible = true;
    },
    topRemove (file) {
      this.topPIC = [];
    },
    headpicRemove (index) {
      this.bpTeams[index].headpic = ""
    },
    topSuccess(res, file) {
      this.topPIC = file;
    },
    topFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不正确！",
        desc: "文件格式" + file.name + " 不正确, 请选择.jpg或.png的文件"
      });
    },
    topMaxSize(file) {
      this.$Notice.warning({
        title: "超出文件大小限制！",
        desc: "文件" + file.name + "太大, 请选择不超过300k的文件"
      });
    },
    pptRemove (file) {
      this.ppt = [];
    },
    pptSuccess(res, file) {
      this.ppt = file;
    },
    pptFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不正确！",
        desc: "文件格式" + file.name + " 不正确, 请选择.pptx的文件"
      });
    },
    pptMaxSize(file) {
      this.$Notice.warning({
        title: "超出文件大小限制！",
        desc: "文件" + file.name + "太大, 请选择不超过500MB的文件"
      });
    },
    headPicSuccess(index,res, file) {
      console.log(index,res,file)
      this.bpTeams[index].headpic = file;
    },
    headPicFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不正确！",
        desc: "文件格式" + file.name + " 不正确, 请选择.jpg或.png的文件"
      });
    },

    
    panel(p) {
      switch (p) {
        case 1:
          this.modal1 = !this.modal1;
          break;
        case 2:
          this.modal2 = !this.modal2;
          break;
        case 3:
          this.modal3 = !this.modal3;
          break;
      }
    },
    cancel() {},
    save() {
      if(this.id!=0){
        this.editBP(1)
      }else{
        this.uploadBP(1)
      }
    },
    submit() {
      if(this.id!=0){
        this.editBP(2)
      }else{
        this.uploadBP(2)
      }
    },
    // 验证BP输入是否合理
    validateBP (isCreate) {
      var tips = ''
      var validated = true
      if (this.projectName == null || this.projectName.trim().length == 0) {
        tips = '请输入项目名称'
        validated = false
      } else if (this.projectIntroduce == null || this.projectIntroduce.trim().length == 0) {
        tips = '请输入项目简介'
        validated = false
      } else if (this.$refs.ue.getUEContent() == null || this.$refs.ue.getUEContent().trim().length == 0) {
        tips = '请输入项目详细介绍'
        validated = false
      } else if (this.companyName == null || this.companyName.trim().length == 0) {
        tips = '请输入团队或公司名称'
        validated = false
      } else if (this.bpTeams == null || this.bpTeams.length == 0) {
        tips = '请添加团队成员'
        validated = false
      } else if (isCreate) {
        if (this.smallPIC == null || this.smallPIC.length == 0) {
          tips = '请设置项目展示小图'
          validated = false
        } else if (this.topPIC == null || this.topPIC.length == 0) {
          tips = '请设置项目封面图'
          validated = false
        } else if (this.music == null || this.music.name == null) {
          tips = '请上传BP演讲视频/音频'
          validated = false
        }
      }
      if (validated == false) {
        this.$Message.info(tips)
      }
      return validated
    },
    editBP(bpStatus){
      debugger
      if (!this.validateBP(false)) {
        return
      }
      for(var i=0;i<this.bpTeams.length;i++) {
        var headPic = ''
        if (this.bpTeams[i].headpic != null && this.bpTeams[i].headpic.response != null && this.bpTeams[i].headpic.response.data != null) {
          headPic = this.bpTeams[i].headpic.response.data.fileName;
        }
        this.bpTeams[i].headPic = headPic;
      }
      this.$https.post('/bp/businessPlan/updateBusinessPlan', {
          bpStatus: bpStatus,
          id:this.id,
          projectName:this.projectName,
          projectIntroduce:this.projectIntroduce,
          projectDetail:this.$refs.ue.getUEContent(),
          companyName:this.companyName,
          bpTeams:this.bpTeams,
          mCover:this.smallPIC.length!= 0?this.smallPIC.response.data.fileName:'',
          lCover:this.topPIC.length!= 0?this.topPIC.response.data.fileName:'',
          mediaPath:this.music.name?this.music.name:'',
          ppt:this.ppt.name?this.ppt.name:''
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
            this.$Message.error('BP修改失败！请重试！')
          }
            
        });
    },
    uploadBP(bpStatus){
      debugger
      if (!this.validateBP(true)) {
        return
      }
      if(this.bpTeams.length != 0){
        for(var i=0;i<this.bpTeams.length;i++){
          var headPic = ''
          if (this.bpTeams[i].headpic != null && this.bpTeams[i].headpic.response != null && this.bpTeams[i].headpic.response.data != null) {
            headPic = this.bpTeams[i].headpic.response.data.fileName;
          }
          this.bpTeams[i].headPic = headPic;
        }
      }
      this.$https.post('/bp/businessPlan/addBusinessPlanTeam', {
          bpStatus: bpStatus,
          projectName:this.projectName,
          projectIntroduce:this.projectIntroduce,
          projectDetail:this.$refs.ue.getUEContent(),
          companyName:this.companyName,
          bpTeams:this.bpTeams,
          mCover:this.smallPIC.length!= 0?this.smallPIC.response.data.fileName:'',
          lCover:this.topPIC.length!= 0?this.topPIC.response.data.fileName:'',
          mediaPath:this.music.name?this.music.name:'',
          ppt:this.ppt.name?this.ppt.name:''

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
            this.$Message.error('BP添加失败！请重试！')
          }
          
        });
    },
    logout() {
      // http
      localStorage.removeItem('Cookie');
      this.$router.push({path: '/login'})
    },
    addMember() {
      this.bpTeams.push({
        headpic: "",
        userName: "",
        roles: "",
        introduce: ""
      });
    },
    delMember(index) {
      this.$https.get('/bp/businessPlan/deleteBusinessPlanTeam', {  
        params:{
          id: this.bpTeams[index].id
        }
      }, {
        headers: {
          Cookie: localStorage.Cookie,
          'Content-Type': 'application/json'
        }
      }).then(res => {
        console.log(res.data)
        this.bpTeams.splice(index, 1);
      });
    },
    getDetail(id){
      const that = this
      this.$https.get('/bp/businessPlan/getBusinessPlan', {
          params:{
            id: id
          }
        }, {
          headers: {
            Cookie: localStorage.Cookie,
            'Content-Type': 'application/json'
          }
        }).then(res => {
          if (res.data.code != 200) {
            this.$Message.error('BP信息获取失败！请稍后再试！')
          }
          that.data = res.data.data;
          that.projectName = that.data.businessPlan.projectName;
          that.projectIntroduce = that.data.businessPlan.projectIntroduce;
          that.defaultMsg = that.data.businessPlan.projectDetail;
          that.companyName = that.data.businessPlan.companyName;
          that.bpTeams = that.data.businessPlan.bpTeams;
          for(var i = 0; i < that.bpTeams.length; i++){
            var temp = that.bpTeams[i].headPic;
            that.bpTeams[i].headpic = {
              status:"finished",
              response:{
                data:{
                  fileUrl:temp
                }
              }
            }
          };
          that.smallPIC = {
            status:"finished",
            response:{
              data:{
                fileUrl:that.data.businessPlan.mCover,
                fileName:that.data.businessPlan.originMCover
              }
            }
          };
          that.topPIC = {
            status:"finished",
            response:{
              data:{
                fileUrl:that.data.businessPlan.lCover,
                fileName:that.data.businessPlan.originLCover
              }
            }
          };
          that.music = {
            name:that.data.businessPlan.originMediaPath,
            status:that.data.businessPlan.originMediaPath==''?'':"finished"
          };
          that.ppt = {
            name:that.data.businessPlan.originPpt,
            status:that.data.businessPlan.originPpt==''?'':"finished"
          };
        });
    }
  },
  updated() {},
  mounted() {
    this.id = this.$route.params.BPId;
    this.Cookie = localStorage.Cookie;
    if(this.id != 0) this.getDetail(this.id);
  }
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
  height: 20px;
  line-height: 20px;
  text-align: left;
  color: white;
}
.warn span {
  opacity: 0.5;
  margin-left: 5px;
}

.btn-container  {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  justify-content: center;
  margin: 20px;
}

.cancelBtn {
  width: 200px;
  margin-top: 30px;
  font-size: 16px;
}
.saveBtn {
  width: 200px;
  margin-top: 30px;
  font-size: 16px;
  margin-left: 10px;
}
.submitBtn {
  width: 200px;
  margin-top: 30px;
  border: 1px solid #c63a47;
  color: #c63a47;
  font-size: 16px;
  margin-left: 10px;
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
  position: relative;
  margin-top: 10px;
}
.container {
  padding: 10px;
  overflow: hidden;
}
.input-cell {
  width: 100%;
  overflow: hidden;
  margin-top: 20px;
}
.input-cell span,
.input-cell label,
.input-cell div {
  float: left;
}
.input-cell label {
  font-weight: bold;
}
.tipword {
  float: left;
}
.headpic {
  /* height: 100px; */
  width: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.headpic div img {
  height: 100px;
  width: 100px;
  border-radius: 50px;
  /* margin-top: 30px; */
}
.memberInfo {
  /* height: 140px; */
  width: 80%;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
}
.info {
  border-radius: 10px;
  line-height: 20px;
  padding: 10px;
  margin: 10px;
  background-color: #ffffff;
}
.editor-container{
  margin-top: 10px;
}

.content-box {
  min-height: calc(100vh - 64px);
  min-width: 1200px;
  padding: 0px calc((100vw - 1200px) / 2);
}

.card-box {
  margin-bottom: 60px;
}

.ivu-card-body {
    padding: 0px !important;
}
.demo-upload-list{
    display: inline-block;
    text-align: center;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
}
.demo-upload-list img{
    width: 100%;
    height: 100%;
}
.demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
}
.demo-upload-list:hover .demo-upload-list-cover{
    display: block;
}
.demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
}

.btn-default {
  background-color: #c63a47;
  color: white;
  width: 200px;
  font-size: 16px;
}

</style>