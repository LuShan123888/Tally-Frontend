import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../pages/Index/Index'
import Home from '../pages/Home/Home'
import Outcome from '../pages/Outcome/Outcome'
import Income from '../pages/Income/Income'
import AccountInfo from '../pages/AccountInfo/AccountInfo'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import Test from '../pages/Test/Test'
import NotFound from '../pages/404/404'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Index,
        children: [
            {
                path: '/',
                name: 'Home',
                component: Home,
                meta: {
                    requireAuth: true
                }
            },
            {
                path: '/outcome',
                name: 'Outcome',
                component: Outcome,
                meta: {
                    requireAuth: true
                }
            },
            {
                path: '/income',
                name: 'Income',
                component: Income,
                meta: {
                    requireAuth: true
                }
            },
            {
                path: '/accountInfo',
                name: 'AccountInfo',
                component: AccountInfo,
                meta: {
                    requireAuth: true
                }
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/test',
        name: 'Test',
        component: Test
    },
    {
        path: '/*',
        name: '404',
        component: NotFound
    }

]

const router = new VueRouter({
    routes,
    //切换路由后,滚动条回到顶部
    scrollBehavior(to, from, saveTop) {
        if (saveTop) {
            return saveTop;
        } else {
            return {x: 0, y: 0}
        }
    }
})

export default router
