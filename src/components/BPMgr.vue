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
        <Content class="content-box">
          <Breadcrumb :style="{margin: '20px 0','text-align': 'left'}">
            您当前位置：
            <BreadcrumbItem to="/BPIndex">首页</BreadcrumbItem>
            <BreadcrumbItem>上传BP</BreadcrumbItem>
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
                  <Input v-model="username" placeholder="请输入项目名称" :maxlength="11" style="width: 500px" />
                  <p style="color:gray;float:left;margin-left:20px;">(请输入2-20个字)</p>
                </div>
                <div class="input-cell">
                  <span style="color:red">*</span>
                  <label>项目简介：</label>
                  <Input v-model="email" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入项目简介(30字内)" :maxlength="30" style="width: 500px;margin-top: 2px;" />
                </div>
                <div class="input-cell" style="height: 280px;">
                  <span style="color:red">*</span>
                  <label>项目展示小图：</label>
                  <p class="tipword">(支持格式：jpg、png，尺寸：290*236，大小在300kb之内)</p>
                  <div>
                    <template v-if="smallPIC.status === 'finished'">
                      <img :src="smallPIC.url">
                      <div class="demo-upload-list-cover">
                        <icon type="ios-trash-outline" @click.native="smallRemove(smallPIC)"></icon>
                      </div>
                    </template>
                    <template v-else>
                      <i-progress v-if="smallPIC.showProgress" :percent="smallPIC.percentage" hide-info></i-progress>
                    </template>
                  </div><br>
                  <upload
                    ref="upload"
                    :before-upload="handleUpload"
                    :show-upload-list="false"
                    :on-success="smallSuccess"
                    :format="['jpg','png']"
                    :max-size="300"
                    :on-format-error="smallFormatError"
                    :on-exceeded-size="smallMaxSize"
                    multiple
                    with-credentials
                    type="drag"
                    action='https://t.govlan.com:8443/bp/file/upload'
                    :data="{'Cookie': Cookie}"
                    style="display: inline-block;width:290px;height:236px;margin-left:10px;margin-top:10px;">
                    <div style="width: 290px;height:236px;line-height: 236px;">
                      <icon type="md-add" size="60"></icon>
                    </div>
                  </upload>
                  <p style="color:gray;margin-top: 118px;text-align: left;">(尺寸：290*236)</p>
                </div>
                <div class="input-cell" style="height:420px;">
                  <span style="color:red">*</span>
                  <label>项目封面：</label>
                  <p class="tipword">(支持格式：jpg、png，尺寸：670*377，大小在300kb之内)</p>
                  <div>
                    <template v-if="topPIC.status === 'finished'">
                      <img :src="topPIC.url">
                      <div class="demo-upload-list-cover">
                        <icon type="ios-trash-outline" @click.native="topRemove(topPIC)"></icon>
                      </div>
                    </template>
                    <template v-else>
                      <i-progress v-if="topPIC.showProgress" :percent="topPIC.percentage" hide-info></i-progress>
                    </template>
                  </div><br>
                  <upload
                    ref="upload"
                    :show-upload-list="false"
                    :on-success="topSuccess"
                    :format="['jpg','png']"
                    :max-size="300"
                    :on-format-error="topFormatError"
                    :on-exceeded-size="topMaxSize"
                    multiple
                    type="drag"
                    action='api/file/upload'
                    style="display: inline-block;width:670px;height:377px;margin-left:10px;margin-top:10px;">
                    <div style="width: 670px;height:377px;line-height: 377px;">
                      <icon type="md-add" size="60"></icon>
                    </div>
                  </upload>
                  <p style="color:gray;margin-top: 189px;text-align: left;">(尺寸：670*377)</p>
                </div>
                <div class="input-cell">
                  <span style="color:red">*</span>
                  <label>上传BP演讲视频/音频：</label>
                  <p class="tipword">(支持格式：视频为mp4，音频为mp3，大小在500M之内)</p><br>
                  <upload
                    ref="upload"
                    :show-upload-list="false"
                    :on-success="musicSuccess"
                    :format="['mp3','mp4']"
                    :max-size="512000"
                    :on-format-error="musicFormatError"
                    :on-exceeded-size="musicMaxSize"
                    action='api/file/upload'
                    style="display: inline-block;margin-left:10px;margin-top:10px;">
                    <Button type="error" icon="ios-cloud-upload-outline">上传视频/音频</Button>
                  </upload>
                </div>
                <div class="input-cell">
                  <span style="color:red">*</span>
                  <label>项目详情：</label>
                  <p class="tipword">(为保证良好的阅读体验，建议上传宽度为750px，大小在2M之内图片)</p>
                  <div class="components-container" style="width:100%">
                    <div class="editor-container" style="width:100%">
                      <UE :defaultMsg='defaultMsg' :config='config' :id='ue' ref="ue" style="width:100%"></UE>
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
                  <Input v-model="projectName" placeholder="请输入公司或团队名称" style="width: 500px" />
                </div>
                <div class="input-cell">
                  <span style="color:red">*</span>
                  <label>团队成员：</label><br>
                  <div v-for="(item,index) in teamList" :key="index" style="overflow:hidden;width:100%; height: auto; margin: 10px;display: flex;flex-direction:row;">
                    <div class="headpic">
                      <img :src="item.headpic" alt="">
                    </div>
                    <div class="memberInfo">
                      <div style="display: flex; flex-direction: row;">
                        <div class="input-cell" style="display: flex; flex-direction: row;flex: 1;padding-right: 4px;">
                          <span style="color:red;">*</span>
                          <span style="width: 80px;">姓名：</span>
                          <Input v-model="item.name" placeholder="请输入团队成员姓名" />
                        </div>
                        <div class="input-cell" style="float:right; display: flex; flex-direction: row;flex: 1;padding-left: 4px;">
                          <span style="color:red;">*</span>
                          <span style="width: 80px;">角色：</span>
                          <Input v-model="item.actor" placeholder="请输入在公司职位或团队中角色" />
                        </div>
                      </div>
                      <div class="input-cell" style="display: flex; flex-direction: row;">
                        <span style="color:red">*</span>
                        <span style="width: 68px;">介绍：</span>
                        <Input v-model="item.introduction" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入项目简介(150字内)" :maxlength="30" style="flex: 1; margin-top: 2px;" />
                      </div>
                    </div>
                    <div @click="delMember(index)" style="margin-left: 20px;cursor:pointer;">
                      <img src="../assets/del.png" alt="">
                    </div>
                  </div>
                  <Button class="submitBtn" @click="addMember">添加成员</Button>
                </div>
              </div>

              <div class="title"  @click="panel(3)">
                <span style="margin-left: 20px;">PPT</span>
                <img v-if="!modal3" style="position:absolute;height:50px;top:0;left:200px;" src="../assets/down.png" alt="">
                <img v-if="modal3" style="position:absolute;height:50px;top:0;left:200px;" src="../assets/up.png" alt="">
              </div>
              <div class="container" v-if="modal3">
                <div class="input-cell">
                  <span style="color:red;">*</span>
                  <label>ppt：</label>
                  <p class="tipword">(格式：pptx，大小建议在500MB内)</p><br>
                  <upload
                    ref="upload"
                    :show-upload-list="false"
                    :on-success="pptSuccess"
                    :format="['pptx']"
                    :max-size="512000"
                    :on-format-error="pptFormatError"
                    :on-exceeded-size="pptMaxSize"
                    action='api/file/upload'
                    style="display: inline-block;margin-left:10px;margin-top:10px;">
                    <Button type="error" icon="ios-cloud-upload-outline">上传PPT</Button>
                  </upload>
                </div>
              </div>
              <div class="container">
                <Button class="cancelBtn" @click="cancel">取消</Button>
                <Button class="saveBtn" @click="save">存为草稿</Button>
                <Button class="submitBtn" @click="submit">提交审核</Button>
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
import UE from "./ue/ue";
export default {
  components: { UE },
  data() {
    return {
      Cookie: localStorage.Cookie,
      id: "",
      username: "",
      email: "",
      team: "",
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
      teamList: [
        {
          headpic: "../../static/head.png",
          name: "",
          actor: "",
          introduction: ""
        }
      ],
      defaultMsg:'',
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 350
      },
      ue: "ue",
      UEcontent:'',
      file: ''
    };
  },
  methods: {
    handleUpload (file) { // 保存需要上传的文件
        this.smallPIC = file
        console.log(this.smallPIC)
        // this.uploadFile()
        return false;
    },
    uploadFile () {
      // 上传文件
      var formdata = new FormData();
      formdata.append('file', this.smallPIC);
      this.$https.post("/bp/file/upload", formdata).then((res) => {
        console.log(res)
      })
    },
    smallRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    smallSuccess(res, file) {
      debugger
      file.url =
        "https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar";
      file.name = "7eb99afb9d5f317c912f08b5212fd69a";
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

    topRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    topSuccess(res, file) {
      file.url =
        "https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar";
      file.name = "7eb99afb9d5f317c912f08b5212fd69a";
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
        desc: "文件" + file.name + "太大, 请选择不超过500MB的文件"
      });
    },
    musicSuccess(res, file) {
      file.url =
        "https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar";
      file.name = "7eb99afb9d5f317c912f08b5212fd69a";
    },
    musicMaxSize(file) {
      this.$Notice.warning({
        title: "超出文件大小限制！",
        desc: "文件" + file.name + "太大, 请选择不超过500MB的文件"
      });
    },
    pptSuccess(res, file) {
      file.url =
        "https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar";
      file.name = "7eb99afb9d5f317c912f08b5212fd69a";
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
    save() {},
    submit() {
      this.UEcontent = this.$refs.ue.getUEContentTxt();
    },
    logout() {},
    addMember() {
      this.teamList.push({
        headpic: "../../static/head.png",
        name: "",
        actor: "",
        introduction: ""
      });
    },
    delMember(index) {
      this.teamList.splice(index, 1);
    }
  },
  updated() {},
  mounted() {
    this.id = this.$route.params.BPId;
    this.Cookie = localStorage.Cookie;
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
  background: #f5f7f9;
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
.cancelBtn {
  width: 200px;
  margin-top: 30px;
  font-size: 18px;
}
.saveBtn {
  width: 200px;
  margin-top: 30px;
  font-size: 18px;
  margin-left: 10px;
}
.submitBtn {
  width: 200px;
  margin-top: 30px;
  border: 1px solid #c63a47;
  color: #c63a47;
  font-size: 18px;
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
.headpic img {
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

</style>