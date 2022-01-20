import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../pages/Index/Index'
import Home from '../pages/Index/Home'
import Outcome from '../pages/Index/Outcome'
import Income from '../pages/Index/Income'
import AccountInfo from '../pages/Index/AccountInfo'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import Test from '../pages/Test'
import PageNotFound from '../pages/PageNotFound'
import AdminIndex from '../pages/Admin'
import AdminHome from '../pages/Admin/Home'
import UserManagement from '../pages/Admin/UserManagement'
import RoleManagement from '../pages/Admin/RoleManagement'
import PermissionManagement from '../pages/Admin/PermissionManagement'
import Druid from '../pages/Admin/Druid'
import Swagger from '../pages/Admin/Swagger'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Index,
        children: [
            {
                path: '/home',
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
        path: '/admin',
        name: 'AdminIndex',
        component: AdminIndex,
        children: [
            {
                path: '/admin/home',
                name: 'AdminHome',
                component: AdminHome,
                meta: {
                    requireAuth: true
                }
            },
            {
                path: '/admin/userManagement',
                name: 'UserManagement',
                component: UserManagement,
                meta: {
                    requireAuth: true
                }
            },
            {
                path: '/admin/role',
                name: 'RoleManagement',
                component: RoleManagement,
                meta: {
                    requireAuth: true
                }
            },
            {
                path: '/admin/permission',
                name: 'PermissionManagement',
                component: PermissionManagement,
                meta: {
                    requireAuth: true
                }
            },
            {
                path: '/admin/feedback',
                name: 'AdminPermission',
                component: AdminHome,
                meta: {
                    requireAuth: true
                }
            },
            {
                path: '/admin/druid',
                name: 'Druid',
                component: Druid,
                meta: {
                    requireAuth: true
                }
            },
            {
                path: '/admin/swagger',
                name: 'Swagger',
                component: Swagger,
                meta: {
                    requireAuth: true
                }
            },
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
        name: 'PageNotFound',
        component: PageNotFound
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
