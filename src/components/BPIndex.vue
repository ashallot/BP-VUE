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
                  <div style="float:right;margin-right: 5px;">{{ userName }}</div>
                  <div style="height:60px;"><img style="margin-top: 5px;" src="../assets/head.png" alt=""></div>
                </div>
            </Menu>
        </Header>
        <Content class="content-box">
          <Breadcrumb :style="{margin: '20px 0','text-align': 'left'}">
            您当前位置：
            <BreadcrumbItem to="/BPIndex">首页</BreadcrumbItem>
            <BreadcrumbItem>BP列表</BreadcrumbItem>
          </Breadcrumb>
          <Card class="card-box">
            <div style="min-height: 720px;">
              <div class="blank" v-if="listdata.length == 0">
                <img src="../assets/blank.png" alt=""><br>
                <p style="color: #999999;">您还没上传过BP哦~</p><br>
                <Button size="large" class="btn-upload-now" @click="upload">立即上传</Button>
              </div>
              <div class="container" v-if="listdata.length > 0">
                <div class="top">
                  <Input v-model="keyword" size="default" placeholder="请输入关键字后回车搜索" style="width: 500px;"
                   @keyup.enter.native="handleSearch()">
                    <Icon type="ios-search" slot="prefix"></Icon>
                  </Input>
                  <span style="margin-left: 20px; margin-right: 20px;">BP状态</span>
                  <Select v-model="bpStatus" style="width:200px" @on-change="selectChange" >
                    <Option v-for="item in bpStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                  <Button size="large" class="uploadBtn" @click="upload">上传BP</Button>
                </div>
                <Table border style="margin-top:20px;" :columns="columns" :data="listdata"></Table>
                <Page style="margin-top:20px;text-align:right" :total="pageTotal" :current="pageNum"
                 show-elevator show-total placement="top" @on-change="handlePage"></Page>
              </div>
            </div>
          </Card>
          <Modal
            v-model="modal1"
            title="删除"
            @on-ok="del"
            @on-cancel="cancel">
            <p>是否删除此BP？</p>
          </Modal>
          <Modal v-model="modal2" width="360">
            <p slot="header" style="color:#f60;text-align:center">
              <Icon type="ios-information-circle"></Icon>
              <span>提示</span>
            </p>
            <div style="text-align:center">
                <p>{{content}}</p>
            </div>
            <div slot="footer" style="text-align: center;">
                <Button type="primary" @click="confirm">确认</Button>
            </div>
          </Modal>
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
      userName: localStorage.userName,
      data: '',
      keyword: "",
      type: "全部",
      pageTotal: 10,
      pageNum: 1,
      pageSize: 10,
      bpStatus: '0',
      bpStatusList: [
        {
          value: '0',
          label: '全部'
        },
        {
          value: '1',
          label: '草稿'
        },
        {
          value: '2',
          label: '待审核'
        },
        {
          value: '3',
          label: '上架中'
        },
        {
          value: '4',
          label: '未通过'
        },
        {
          value: '5',
          label: '已下架'
        }
      ],
      columns: [
        {
          title: "项目名称",
          key: "projectName",
        },
        {
          title: "团队名称",
          key: "companyName"
        },
        {
          title: "状态",
          key: "bpStatus",
          render: (h, params) =>{
              let _this = this;
              let texts = '';
              if(params.row.bpStatus == 1){
                  texts = "草稿"
              }else if (params.row.bpStatus == 2) {
                  texts = "待审核"
              }else if (params.row.bpStatus == 3) {
                  texts = "上架中"
              }else if (params.row.bpStatus == 4) {
                  texts = "未通过"
              }else if (params.row.bpStatus == 5) {
                  texts = "已下架" 
              }
              return h('div', {  
                  props: {
                      },
                  },texts)
              }
        },
        {
          title: "生成邀请码",
          key: "inviteCode",
          render: (h, params) =>{
              let _this = this;
              let texts = "——";
            
              return h('div', {  
                  props: {
                      },
                  },texts)
              }
        },
          {
          title: "查看人数",
          key: "views",
          render: (h, params) =>{
              let _this = this;
              let texts = "";
              if(params.row.views == ''){
                  texts = "——"
              } else {
                texts = params.row.views;
              }
              return h('div', {  
                  props: {
                      },
                  },texts)
              }
        },
        {
          title: "创建时间",
          key: "formatCreateAt"
        },
        {
          title: "操作",
          key: "bpStatus",
          align: "center",
          width:250,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px",
                    float:'left',
                    display:params.row.bpStatus == 2 || params.row.bpStatus == 3 ?'none':"block"
                  },
                  on: {
                    click: () => {
                      this.edit(params.index);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                    float:'left',
                    display:params.row.bpStatus == 3?'none':"block"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "删除"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px",
                    float:'left',
                    display:params.row.bpStatus != 2?'none':"block"
                  },
                  on: {
                    click: () => {
                      this.progress(params.index);
                    }
                  }
                },
                "查看进度"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px",
                    float:'left',
                    display:params.row.bpStatus != 4?'none':"block"
                  },
                  on: {
                    click: () => {
                      this.reason(params.index);
                    }
                  }
                },
                "查看原因"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                    float:'left',
                    display:params.row.bpStatus != 3?'none':"block"
                  },
                  on: {
                    click: () => {
                      this.creat(params.index);
                    }
                  }
                },
                "生成邀请码"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                    float:'left',
                    display:params.row.bpStatus != 5?'none':"block"
                  },
                  on: {
                    click: () => {
                      this.upTo(params.index);
                    }
                  }
                },
                "上架"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                    float:'left',
                    display:params.row.bpStatus != 3?'none':"block"
                  },
                  on: {
                    click: () => {
                      this.downTo(params.index);
                    }
                  }
                },
                "下架"
              )
            ]);
          }
        }
      ],
      listdata: [],
      modal1:false,
      modal2:false,
      choise:'',
      content:''
    };
  },
  methods: {
    del(){
      this.$https.get('/bp/businessPlan/deleteBusinessPlan', {  
        params:{
          id: this.choise.id
        }
      }, {
        headers: {
          Cookie: localStorage.Cookie,
          'Content-Type': 'application/json'
        }
      }).then(res => {
        console.log(res.data)
        this.getBPList();
        this.choise = ''
      });
    },
    cancel(){
      this.modal1 = false;
    },
    confirm(){
      this.modal2 = false;
    },
    downTo(index){
      this.typechange(this.listdata[index].id)
    },
    upTo(index){
      this.typechange(this.listdata[index].id)
    },
    typechange(id){
      this.$https.post('/bp/businessPlan/updateBusinessPlan', {
        bpStatus: 2,
        id:id
      }, {
        headers: {
          Cookie: localStorage.Cookie,
          'Content-Type': 'application/json'
        }
      }).then(res => {
        this.getBPList();
      });
    },
    creat(index){
      this.$Modal.info({
          title: '提示',
          content: '<p>' + '该功能即将上线，敬请期待' + '</p>',
          onOk: () => {
              
          },
          onCancel: () => {
              
          }
      });
      // this.modal2 = true;
      // this.content = '该功能即将上线，敬请期待';
    },
    reason(index){
      this.$Modal.info({
          title: '提示',
          content: '<p>' + '因' + this.listdata[index].failReason + '，该BP未通过审核，请按要求编辑后，重新提交审核' + '</p>',
          onOk: () => {
              
          },
          onCancel: () => {
              
          }
      });
      // this.modal2 = true;
      // this.content = '因'+this.listdata[index].failReason+'，该BP未通过审核，请按要求编辑后，重新提交审核';
    },
    progress(index){
      this.$Modal.info({
          title: '提示',
          content: '<p>' + '我们将于7个工作日内完成审核' + '</p>',
          onOk: () => {
              
          },
          onCancel: () => {
              
          }
      });
      // this.modal2 = true;
      // this.content = '我们将于7个工作日内完成审核';
    },
    edit(index){
      this.$router.push({ path: "/BPMgr/"+ this.listdata[index].id});
    },
    remove(index) {
      const that = this
      // this.listdata.splice(index, 1);
      this.choise = this.listdata[index];
      this.$Modal.confirm({
          title: '提示',
          content: '<p>' + '您确定要删除“' + this.listdata[index].projectName + '”项目吗？</p>',
          onOk: () => {
              that.del()
          },
          onCancel: () => {
              
          }
      });
      // this.modal1 =true;
    },
    handlePage(value){
      this.pageNum = value;
      this.getBPList();
    },
    handleSearch() {
      this.getBPList();
    },
    selectChange(event) {
      console.log(event)
      this.bpStatus = event;
      // http
      this.getBPList();
    },
    upload() {
      this.$router.push({ path: "/BPMgr/0" });
    },
    logout() {
      // http
      localStorage.removeItem('Cookie');
      this.$router.push({path: '/login'})
    },
    getBPList() {
      this.$https.get('/bp/businessPlan/queryBusinessPlan', {  
          params:{
            pageSize: this.pageSize,
            pageNum:this.pageNum,
            keywords:this.keyword,
            bpStatus:this.bpStatus,
            admin:'admin'
          }
        }, {
          headers: {
            Cookie: localStorage.Cookie,
            'Content-Type': 'application/json'
          }
        }).then(res => {
          console.log(res.data)
          if (res.data.code == 200) {
            this.data = res.data.data.businessPlans;
            this.listdata = this.data.list;
            this.pageTotal = this.data.total;
            this.pageNum = this.data.pageNum;
          } else {
            this.$Message.error('数据获取失败！请稍后再试！')
          }
        });
    }
  },
  mounted() {
    this.getBPList()
  }
};
</script>

<style scoped>
.ivu-input-prefix i,
.ivu-input-suffix i {
  line-height: 36px !important;
}
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

.btn-upload-now {
  background-color: #c63a47;
  color: white;
}

.uploadBtn {
  background-color: #c63a47;
  color: white;
  /* font-size: 16px; */
  margin-left: 20px;
  /* height: 30px; */
  /* line-height: 30px; */
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
.container {
  padding: 10px;
}
.top {
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.content-box {
  min-height: calc(100vh - 64px);
  min-width: 1200px;
  padding: 0px calc((100vw - 1200px) / 2);
}

.blank {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-box {
  margin-bottom: 60px;
}
</style>