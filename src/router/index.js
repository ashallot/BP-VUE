import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import userInfo from '@/components/userInfo'
import BPMgr from '@/components/BPMgr'
import BPIndex from '@/components/BPIndex'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/userInfo',
            name: 'userInfo',
            component: userInfo,
        },
        {
            path: '/BPMgr/:BPId',
            name: 'BPMgr',
            component: BPMgr,
        },
        {
            path: '/BPIndex',
            name: 'BPIndex',
            component: BPIndex,
        }
    ]
})