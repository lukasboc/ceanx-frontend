import * as userApi from "../../apis/User"
import Csrf from "../../apis/Csrf";
import Api from "../../apis/Api";

// initial state
const state = () => ({
    user: null,
    loggedIn: false,
    loginError: '',
    changePasswordSuccess: false,
    changePasswordError: false,
    latestUsers:[],
});

const getters = {

}

const actions = {
    async getUser({commit}) {
        try {
            const res = await userApi.getUser();
            switch (res.status) {
                case 200:
                    commit('login', res.data);
                    break;
                case 401:
                    commit('logout');
                    break;
                case 500:
                    break;
            }
        } catch (error){
            console.log(error)
            commit('logout');
        }
    },
    async logout({commit}){
        try {
            await Csrf.getCookie();
            const res = await userApi.logout();
            switch (res.status) {
                case 204:
                    commit('logout', res.data);
                    break;
                case 401:
                    break;
                case 500:
                    break;
            }
        } catch (error){
            commit('logout');
        }
    },
    async getLatestUsers({commit}) {
        const res = await userApi.getLatestUsers();
        switch (res.status) {
            case 200:
                commit('setLatestUsers', res.data);
                break;
            case 400:
                commit('setLatestUsers', []);
                break;
            case 500:
                commit('setLatestUsers', []);
                break;
        }
    },
    async login({commit}, credentials){
        try {
            await Csrf.getCookie();
            const res = await userApi.login(credentials);
            console.log(res)
            switch (res.status) {
                case 204:
                    commit('login', res.data);
                    commit('loginError', '');
                    break;
                case 401:
                    break;
                case 500:
                    break;
            }
        } catch (error){
            commit('loginError', 'Die eingegebenen Benutzerdaten scheinen nicht korrekt gewesen zu sein. Versuche es bitte erneut.');
            commit('logout');
        }
    },
    async updatePassword({commit}, payload){
        try {
            await Csrf.getCookie();
            const res = await userApi.updatePassword(payload);
            switch (res.status) {
                case 200:
                    commit('changePasswordSuccess', true);
                    commit('changePasswordError', false);
                    break;
            }
        } catch (error){
            commit('changePasswordSuccess', false);
            commit('changePasswordError', true);
        }
    },
    async sendVerification({commit}, userId){
        try {
            await Csrf.getCookie();
            const res = await userApi.sendVerification(userId);
            console.log(res)
            switch (res.status) {
                case 204:
                    console.log('gesendet');
                    console.log(res)
                    break;
                case 401:
                    break;
                case 500:
                    break;
            }
        } catch (error){
            commit('logout');
        }
    }
}

const mutations = {
    login(state, user) {
        state.user = user;
        state.loggedIn = true;
    },
    logout(state){
        document.cookie = 'XSRF-TOKEN=;max-age=0';
        state.loggedIn = false;
        state.user = null;
    },
    loginError(state, message){
        state.loginError = message
    },
    changePasswordSuccess(state, changePasswordSuccess){
        state.changePasswordSuccess = changePasswordSuccess
    },
    changePasswordError(state, changePasswordError){
        state.changePasswordError = changePasswordError
    },
    setLatestUsers(state, users){
        state.latestUsers = users
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
