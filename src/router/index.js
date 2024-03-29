import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/pages/Index/Index'
import Home from '@/pages/Index/Home'
import Account from '@/pages/Index/Account'
import Statistics from '@/pages/Index/Statistics'
import Mine from '@/pages/Index/Mine'
import SignIn from '@/pages/SignIn'
import SignUp from '@/pages/SignUp'
import Forgot from '@/pages/Forgot'
import Test from '@/pages/Test'
import PageNotFound from '@/pages/PageNotFound'
import AdminIndex from '@/pages/Admin'
import AdminHome from '@/pages/Admin/Home'
import UserManagement from '@/pages/Admin/UserManagement'
import RoleManagement from '@/pages/Admin/RoleManagement'
import PermissionManagement from '@/pages/Admin/PermissionManagement'
import BillTypeManagement from '@/pages/Admin/BillTypeManagement'
import FeedbackManagement from '@/pages/Admin/FeedbackManagement'
import Druid from '@/pages/Admin/Druid'
import Sentinel from '@/pages/Admin/Sentinel'
import Portainer from '@/pages/Admin/Portainer'
import Swagger from '@/pages/Admin/Swagger'

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
                path: '/account',
                name: 'Account',
                component: Account,
                meta: {
                    requireAuth: true
                }
            },
            {
                path: '/statistics',
                name: 'Statistics',
                component: Statistics,
                meta: {
                    requireAuth: true
                }
            },
            {
                path: '/mine',
                name: 'Mine',
                component: Mine,
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
                path: '/admin/billType',
                name: 'BillTypeManagement',
                component: BillTypeManagement,
                meta: {
                    requireAuth: true
                }
            },
            {
                path: '/admin/feedback',
                name: 'FeedbackManagement',
                component: FeedbackManagement,
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
                path: '/admin/sentinel',
                name: 'Sentinel',
                component: Sentinel,
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
            {
                path: '/admin/portainer',
                name: 'Portainer',
                component: Portainer,
                meta: {
                    requireAuth: true
                }
            },
        ]
    },
    {
        path: '/signIn',
        name: 'SignIn',
        component: SignIn
    },
    {
        path: '/signUp',
        name: 'SignUp',
        component: SignUp
    },
    {
        path: '/forgot',
        name: 'Forgot',
        component: Forgot
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
