import axios from 'axios'
import Element from 'element-ui'
import router from '../router'
import store from '../store'

axios.defaults.baseURL = "http://127.0.0.1:8080";
axios.defaults.headers.common['Authorization'] = store.getters.getToken;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.put['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.delete['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';


// 全局请求带上token
// axios.interceptors.request.use((config) => {
//     if (['/account/login'].indexOf(config.url) === -1) {
//         const token = store.getters.getToken
//         if (token) {
//             config.headers.Authorization = store.getters.getToken
//         }
//     }
//     return config
// })

// 拦截未登录的请求和错误响应
axios.interceptors.response.use(
    response => {
        console.log("==========response==========")
        console.log(response)
        console.log("==========end==========")
        const code = response.data.code;
        const message = response.data.message;
        const data = response.data.data;
        if (code !== 200) {
            Element.Message.error(!data ? message : message + "：" + data);
        }
        return response;
    },
    error => {
        console.log("==========response==========")
        console.log(error)
        console.log("==========end==========")
        const status = error.response.status;
        const message = error.response.data.message;
        const data = error.response.data.data;
        Element.Message.error(!data ? message : message + "：" + data);
        switch (status) {
            case 401:
                store.commit("clean");
                router.push("/login");
                return Promise.reject(error.response);
            case 403:
                return Promise.reject(error.response);
            case 404:
                return Promise.reject(error.response);
            case 500:
                return Promise.reject(error.response);
            default:
                return Promise.reject(error.response);
        }
    }
)