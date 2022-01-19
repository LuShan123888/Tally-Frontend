import axios from 'axios'
import Element from 'element-ui'
import router from '../router'
import store from '../store'
import Global from "@/common/Global";

axios.defaults.baseURL = Global.url.api;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.put['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.delete['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';


// 请求拦截器
axios.interceptors.request.use((config) => {
    if ([Global.url.api + '/account/signIn', Global.url.api + '/account/signUp', Global.url.api + '/account/signOut'].indexOf(config.url) === -1) {
        const token = store.getters.getToken
        if (token) {
            config.headers.Authorization = store.getters.getToken
        }
    }
    return config
})

// 响应拦截器
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
        if (error.response === undefined) {
            Element.Message.error("服务器无响应");
        }
        const status = error.response.status;
        const message = error.response.data.message;
        const data = error.response.data.data;
        Element.Message.error(!data ? message : message + "：" + data);
        switch (status) {
            case 401:
                // store.commit("clean");
                router.push({name: "Login"});
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