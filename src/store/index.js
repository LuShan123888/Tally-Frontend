import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: localStorage.getItem("token"),
        userInfo: JSON.parse(sessionStorage.getItem("userInfo"))
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
        }
    },
    actions: {},
    modules: {}
})
