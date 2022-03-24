import axios from 'axios'
import Element from 'element-ui'
import router from '@/router'
import store from '@/store'
import Global from "@/common/Global";

axios.defaults.baseURL = Global.url.api;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.put['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.delete['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';


// 请求拦截器
axios.interceptors.request.use((config) => {
    if ([Global.url.api + '/user/signIn', Global.url.api + '/user/signUp', Global.url.api + '/user/signOut', Global.url.api + '/user/changePassword']
        .indexOf(config.url) === -1) {
        let token = store.getters.getToken;
        if (token) {
            config.headers.Authorization = store.getters.getToken;
        }
    }
    return config;
})

// 响应拦截器
axios.interceptors.response.use(
    response => {
        // console.log("==========response==========");
        // console.log(response);
        // console.log("==========end==========");
        let code = response.data.code;
        let message = response.data.message;
        let data = response.data.data;
        if (code && code !== 200) {
            Element.Notification({
                title: message,
                message: data,
                type: "error",
                duration: 2000,
            });
        }
        return response;
    },
    error => {
        // console.log("==========response==========")
        // console.log(error)
        // console.log("==========end==========")
        if (error.response === undefined) {
            Element.Notification({
                title: "服务器无响应",
                message: null,
                type: "error",
                duration: 2000,
            });
            return Promise.reject(error.response);
        }
        let status = error.response.status;
        let message = error.response.data.message;
        let data = error.response.data.data ? error.response.data.data : error.response.data;
        Element.Notification({
            title: message,
            message: data,
            type: "error",
            duration: 2000,
        });
        switch (status) {
            case 401:
                router.push({name: "SignIn"}).then(() => {
                    store.commit("clean");
                });
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