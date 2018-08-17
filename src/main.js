// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import VueResource from "vue-resource"
import axios from 'axios'

import '../static/UE/ueditor.config.js'
import '../static/UE/ueditor.all.min.js'
import '../static/UE/lang/zh-cn/zh-cn.js'
import '../static/UE/ueditor.parse.min.js'

Vue.config.productionTip = false
Vue.use(iView);
Vue.use(VueResource)
if (process.env.NODE_ENV === 'production') {
    axios.defaults.baseURL = 'https://t.govlan.com:8443'
}
axios.defaults.timeout = 60000
axios.defaults.withCredentials = true

axios.interceptors.request.use((config) => {
    if (config.url.indexOf('sendSms') == -1) {
        config.headers = {
            'Content-Type': 'application/ld+json',
            'set-cookie': localStorage.Cookie,
            'Cookie': localStorage.Cookie
        }
    } else {
        config.headers = {
            'Content-Type': 'application/ld+json'
        }
    }
    // if (config.method === 'post') {
    //         config.headers = {
    //         'Content-Type': 'application/ld+json',
    //         'set-cookie': localStorage.Cookie,
    //         'Cookie': localStorage.Cookie
    //     }
    // }
    return config
}, (error) => {
    return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
    // Do something with response data
    if (process.env.NODE_ENV === 'development') {
        // consolFe.log(response)
    }
    iView.LoadingBar.finish()
    return response
}, function (error) {
    // Do something with response error
    var response = error.response
    console.log(error)
    // 需要登录
    if (response.status === 401) {

    } else if (response.status === 400) {

    } else if (response.status === 500) {
        iView.Message.error('网络服务器忙~请稍后再试！')
    }
    iView.LoadingBar.finish()
    return error
})

Vue.prototype.$https = axios

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})