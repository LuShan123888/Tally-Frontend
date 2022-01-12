import axios from 'axios'
import Element from 'element-ui'
import router from '../router'
import store from '../store'

// 全局请求带上token
axios.interceptors.request.use((config) => {
    if (['/account/login'].indexOf(config.url) === -1) {
        const token = store.getters.getToken
        if (token) {
            config.headers.Authorization = store.getters.getToken
        }
    }
    return config
})

// 拦截未登录的请求和错误响应
axios.interceptors.response.use(
    response => {
        console.log("=================")
        console.log(response)
        console.log("=================")
        const code = response.data.code;
        const message = response.data.message;
        if (code !== 200) {
            Element.Message.error(message == null || message === '' ? '服务器错误' : message, {duration: 3 * 1000})
        }
        return response;
    },
    error => {
        console.log("=================")
        console.log(error)
        console.log("=================")
        const status = error.response.status;
        const message = error.response.data.message;
        switch (status) {
            case 401:
                store.commit("clear")
                router.push("/login")
                Element.Message.error(message == null || message === '' ? '未登陆' : message, {duration: 3 * 1000})
                return Promise.reject(error.response)
            case 403:
                Element.Message.error(message == null || message === '' ? '无访问权限' : message, {duration: 3 * 1000})
                return Promise.reject(error.response)
            case 404:
                Element.Message.error(message == null || message === '' ? '请求资源不存在' : message, {duration: 3 * 1000})
                return Promise.reject(error.response)
            case 500:
                Element.Message.error(message == null || message === '' ? '服务器错误' : message, {duration: 3 * 1000})
                return Promise.reject(error.response)
            default:
                Element.Message.error(message == null || message === '' ? '未知错误' : message, {duration: 3 * 1000})
                return Promise.reject(error.response)
        }
    }
)