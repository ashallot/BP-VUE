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
            <BreadcrumbItem>BP列表</BreadcrumbItem>
          </Breadcrumb>
          <Card class="card-box">
            <div style="min-height: 720px;">
              <div class="blank" v-if="data == ''">
                <img src="../assets/blank.png" alt=""><br>
                <p style="color: gray;">您还没上传过BP哦~</p><br>
                <Button size="large" class="uploadBtn" @click="upload">立即上传</Button>
              </div>
              <div class="container" v-if="data != ''">
                <div class="top">
                  <Input v-model="keyword" size="default" placeholder="请输入关键字后回车搜索" style="width: 500px;"
                   @keyup.enter.native="handleSearch()">
                    <Icon type="ios-search" slot="prefix"></Icon>
                  </Input>
                  <span style="margin-left: 20px; margin-right: 20px;">BP状态</span>
                  <Select v-model="bpStatus" style="width:200px">
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
      data: "1",
      keyword: "",
      type: "全部",
      pageTotal:15,
      pageNum:1,
      bpStatus: '',
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
          label: '未通过'
        },
        {
          value: '4',
          label: '上架中'
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
          key: "projectIntroduce"
        },
        {
          title: "状态",
          key: "projectDetail"
        },
        {
          title: "生成邀请码",
          key: "inviteCode"
        },
        {
          title: "创建时间",
          key: "createAt"
        },
        {
          title: "操作",
          key: "action",
          width: 400,
          align: "center",
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
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.show(params.index);
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
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      listdata: [
        
      ]
    };
  },
  methods: {
    remove(index) {
      this.listdata.splice(index, 1);
    },
    handlePage(value){
      console.log(value)
    },
    handleSearch() {
      console.log(this.keyword);
      // this.$http.post('url',{
      //   keyword:this.keyword
      // },{
      //   emulateJSON:true
      // }).then(function(response){
      //   this.data = response.data;
      // },function(response){
      //   console.log(response)
      // });
    },
    choiseType(type) {
      this.type = type;
      // http
      // this.$http.post('url',{
      //   type:this.type
      // },{
      //   emulateJSON:true
      // }).then(function(response){
      //   this.data = response.data;
      // },function(response){
      //   console.log(response)
      // });
    },
    upload() {
      this.$router.push({ path: "/BPMgr/0" });
    },
    logout() {},
    getBPList() {
      this.$http.get("url").then(
        function(response) {
          this.data = response.data.list;
        },
        function(response) {
          console.log(response);
        }
      );
    }
  },
  mounted() {
    // this.getBPList()
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

.card-box {
  margin-bottom: 60px;
}
</style>