// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import VueResource from "vue-resource"

import '../static/UE/ueditor.config.js'
import '../static/UE/ueditor.all.min.js'
import '../static/UE/lang/zh-cn/zh-cn.js'
import '../static/UE/ueditor.parse.min.js'

Vue.config.productionTip = false
Vue.use(iView);
Vue.use(VueResource)

Vue.http.interceptors.push((request, next) => {
    request.credentials = true; // 接口每次请求会跨域携带cookie
    request.method = 'POST'; // 请求方式（get,post）
    request.headers.set('Cookie', 'JSESSIONID=57159BC8AD5443CA1879ACDF26650ED3') // 请求headers携带参数
    confirm.log(request.headers)
    next(function(response) {
        return response;

    });
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})