import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: localStorage.getItem("token"),
        userInfo: JSON.parse(sessionStorage.getItem("userInfo")),
        config: JSON.parse(localStorage.getItem("config"))
    },
    mutations: {
        setToken: (state, token) => {
            state.token = token;
            localStorage.setItem("token", token);
        },
        setUserInfo: (state, userInfo) => {
            state.userInfo = userInfo;
            sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
        },
        setConfig: (state, config) => {
            state.config = config;
            localStorage.setItem("config", JSON.stringify(config));
        },
        clean: (state) => {
            state.token = null;
            state.userInfo = null;
            localStorage.removeItem("token");
            sessionStorage.removeItem("userInfo");
        }
    },
    getters: {
        getUserInfo: state => {
            return state.userInfo;
        },
        getToken: state => {
            return state.token;
        },
        getConfig: state => {
            return state.config;
        }
    },
    actions: {},
    modules: {}
})
