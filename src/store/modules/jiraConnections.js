import * as jiraConnectionsApi from "../../apis/jiraConnections"
import {isString} from "@vuepic/vue-datepicker/src/VueDatePicker/utils/type-guard";

// initial state
const state = () => ({
    allJiraConnections:[],
    jiraConnection: null,
    jiraConnectionMessage:'',
    jiraErrorMessage:'',
    searchResult:[],
});

const getters = {
}

const actions = {
    async getAllJiraConnections({commit}) {
        const res = await jiraConnectionsApi.getAllJiraConnections();
        switch (res.status) {
            case 200:
                commit('setJiraConnections', res.data);
                break;
            case 400:
                commit('setJiraConnections', []);
                break;
            case 500:
                break;
        }
    },
    async createJiraConnection({commit}, jiraConnection) {
        const res = await jiraConnectionsApi.createJiraConnection(jiraConnection);
        switch (res.status) {
            case 201:
                commit('setJiraConnection', res.data);
                break;
            case 400:
                throw Error("badRequest");
            case 500:
                throw Error("internalServerError");
            default:
                throw Error("unknownError");
        }
    },
    async testJiraConnection({commit}, jiraConnection) {
        const res = await jiraConnectionsApi.testJiraConnection(jiraConnection);
        switch (res.status) {
            case 200:
                //please don't ask.
                if(isString(res.data) && res.data.includes('Basic authentication with passwords is deprecated')){
                    commit('setJiraConnectionMessage', '');
                    commit('setJiraErrorMessage', 'Die Anmeldedaten scheinen nicht zu stimmen. Bitte stell sicher, dass du einen korrekten API-Key und eine korrekte E-Mail Adresse gewählt hast.');
                    break;
                } else if (isString(res.data) && res.data.includes("Client must be authenticated to access this resource")){
                    commit('setJiraConnectionMessage', '');
                    commit('setJiraErrorMessage', 'Es scheint, als hätte der Benutzer kein Zugriffsrecht auf den Host. Bitte prüfe die E-Mail Adresse.');
                    break;
                } else if(res.data.hasOwnProperty('errorMessages') && res.data.errorMessages[0].includes('Administer permissions')){
                    commit('setJiraConnectionMessage', '');
                    commit('setJiraErrorMessage', 'Dieser Benutzer hat keinen Admin-Zugang. Bitte nutze einen anderen für die Verbindung.');
                    break;
                }
                commit('setJiraConnectionMessage', res.data);
                commit('setJiraErrorMessage', '');
                break;
            case 401:
                commit('setJiraConnectionMessage', '');
                commit('setJiraErrorMessage', res.data);
                break;
            case 403:
                commit('setJiraConnectionMessage', '');
                commit('setJiraErrorMessage', res.data);
                throw Error("noAdministerPermissions");
            case 500:
                commit('setJiraConnectionMessage', '');
                commit('setJiraErrorMessage', 'Die Verbindung zum Host kann nicht hergestellt werden. Bitte beachte, dass bei Cloud-Instanzen die TLD .net und nicht .de verwendet werden muss.');
                throw Error("internalServerError");
            default:
                throw Error("unknownError");
        }
    },
    async getJiraConnectionById({commit}, id) {
        const res = await jiraConnectionsApi.getJiraConnectionById(id);
        switch (res.status) {
            case 200:
                commit('setJiraConnection', res.data);
                break;
            case 400:
                throw Error("badRequest");
            case 500:
                throw Error("internalServerError");
            default:
                throw Error("unknownError");
        }
    },
    async getJiraResult({commit}, searchParams) {
        const res = await jiraConnectionsApi.getJiraResults(searchParams);
        switch (res.status) {
            case 200:
                commit('setJiraResult', res.data);
                break;
            case 201:
                commit('setJiraResult', res.data);
                break;
            case 400:
                commit('setJiraResult', '');
                throw Error("badRequest");
            case 500:
                throw Error("internalServerError");
            default:
                throw Error("unknownError");
        }
    },
    async deleteConnection({commit}, id) {
        const res = await jiraConnectionsApi.deleteJiraConnection(id);
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
    setJiraConnections(state, jiraConnections) {
        state.allJiraConnections = jiraConnections;
    },
    setJiraResult(state, result) {
        state.searchResult = result;
    },
    setJiraConnection(state, jiraConnection) {
        state.jiraConnection = jiraConnection;
    },
    setJiraConnectionMessage(state, jiraConnection) {
        state.jiraConnectionMessage = jiraConnection;
    },
    setJiraErrorMessage(state, errormessage) {
        state.jiraErrorMessage = errormessage;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}