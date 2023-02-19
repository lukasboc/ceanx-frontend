import * as troiConnectionsApi from "../../apis/troiConnections"
import {isString} from "@vuepic/vue-datepicker/src/VueDatePicker/utils/type-guard";

// initial state
const state = () => ({
    allTroiConnections:[],
    troiConnection: null,
    troiConnectionMessage:'',
    troiErrorMessage:'',
    searchResult:[],
});

const getters = {
}

const actions = {
    async getAllTroiConnections({commit}) {
        const res = await troiConnectionsApi.getAllTroiConnections();
        switch (res.status) {
            case 200:
                commit('setTroiConnections', res.data);
                break;
            case 400:
                commit('setTroiConnections', []);
                break;
            case 500:
                break;
        }
    },
    async createTroiConnection({commit}, troiConnection) {
        const res = await troiConnectionsApi.createTroiConnection(troiConnection);
        switch (res.status) {
            case 201:
                commit('setTroiConnection', res.data);
                break;
            case 400:
                throw Error("badRequest");
            case 500:
                throw Error("internalServerError");
            default:
                throw Error("unknownError");
        }
    },
    async testTroiConnection({commit}, troiConnection) {
        const res = await troiConnectionsApi.testTroiConnection(troiConnection);
        switch (res.status) {
            case 200:
                if(typeof res.data == "boolean"){
                    commit('setTroiConnectionMessage', res.data);
                    commit('setTroiErrorMessage', '');
                    break;
                } else if (isString(res.data) && res.data.includes("404 page not found")) {
                    commit('setTroiConnectionMessage', '');
                    commit('setTroiErrorMessage', 'Eine Verbindung zum Host kann nicht hergestellt werden. Bitte vergewissere dich, dass die URL vollständig ist. Beispiel: https://demo.troi.de');
                    break;
                } else if (res.data.statusCode === 401) {
                    commit('setTroiConnectionMessage', '');
                    commit('setTroiErrorMessage', 'Die eingegebenen Benuterdaten scheinen nicht zu stimmen.');
                    break;
                }
                throw Error("unknownError")
            case 500:
                commit('setTroiConnectionMessage', '');
                commit('setTroiErrorMessage', 'Die Verbindung zum Host kann nicht hergestellt werden. Bitte beachte, dass bei Cloud-Instanzen die TLD .net und nicht .de verwendet werden muss.');
                throw Error("internalServerError");
            default:
                throw Error("unknownError");
        }
    },
    async getTroiConnectionById({commit}, id) {
        const res = await troiConnectionsApi.getTroiConnectionById(id);
        switch (res.status) {
            case 200:
                commit('setTroiConnection', res.data);
                break;
            case 400:
                throw Error("badRequest");
            case 500:
                throw Error("internalServerError");
            default:
                throw Error("unknownError");
        }
    },
    async getTroiResult({commit}, searchParams) {
        const res = await troiConnectionsApi.getTroiResult(searchParams);
        switch (res.status) {
            case 200:
                if(res.data[0] === 401){
                    commit('setTroiResult', []);
                    console.error('Authentication not successfull.')
                    throw Error("badRequest");
                }
                commit('setTroiResult', res.data);
                break;
            case 201:
                commit('setTroiResult', res.data);
                break;
            case 400:
                commit('setTroiResult', '');
                throw Error("badRequest");
            case 500:
                throw Error("internalServerError");
            default:
                throw Error("unknownError");
        }
    },
    async deleteConnection({commit}, id) {
        const res = await troiConnectionsApi.deleteTroiConnection(id);
        switch (res.status) {
            case 200:
                break;
            case 400:
                throw Error("badRequest");
            case 500:
                throw Error("internalServerError");
            default:
                throw Error("unknownError");
        }
    },
}

const mutations = {
    setTroiConnections(state, jiraConnections) {
        state.allTroiConnections = jiraConnections;
    },
    setTroiConnection(state, jiraConnection) {
        state.troiConnection = jiraConnection;
    },
    setTroiConnectionMessage(state, jiraConnection) {
        state.troiConnectionMessage = jiraConnection;
    },
    setTroiErrorMessage(state, errormessage) {
        state.troiErrorMessage = errormessage;
    },
    setTroiResult(state, result) {
        state.searchResult = result;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}