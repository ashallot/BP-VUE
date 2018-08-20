<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

.edui-box {
    float: left !important;
}

.edui-default .edui-label {
    cursor: default !important;
    width: 100% !important;
}

.edui-for-fullscreen {
    float: right !important;
}

textarea.ivu-input {
  font-size: 12px !important;
}

.ivu-table th {
  height: 40px;
  white-space: nowrap;
  overflow: hidden;
  color: #FFFFFF !important;
  background-color: #be3b46 !important;
}

.ivu-table-wrapper {
  position: relative;
  border: 0px solid #dcdee2 !important;
  border-bottom: 0;
  border-right: 0;
}

.ivu-table:after {
  content: '';
  width: 0px !important;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  background-color: #dddee1;
  z-index: 3;
}
.ivu-table:before {
  content: '';
  width: 100%;
  height: 0px !important;
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: #dddee1;
  z-index: 1;
}

.ivu-page-item-active {
  border-color: #be3b46 !important;
  background-color: #be3b46 !important;
  color: #FFFFFF !important;
}

.ivu-page-item-active a, .ivu-page-item-active:hover a {
  color: #FFFFFF !important;
}

.ivu-page-item:hover {
  border: 1px solid #be3b46 !important;
}

.ivu-spin-dot {
  position: relative;
  display: block;
  border-radius: 50%;
  background-color: #be3b46 !important;
  width: 20px;
  height: 20px;
  animation: ani-spin-bounce 1s 0s ease-in-out infinite;
}

.ivu-page-options-elevator {
  font-size: 12px !important;
}

.ivu-page-total {
  font-size: 12px !important;
}

.ivu-upload-drag {
  background: #fef7f7 !important;
  border: 0px solid #dcdee2 !important;
  border-radius: 0px !important;
  text-align: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: border-color .2s ease;
}

.upload-head .ivu-upload-drag {
  border-radius: 50px !important;
}

</style>
