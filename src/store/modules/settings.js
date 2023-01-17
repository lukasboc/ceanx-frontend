import * as settingsApi from "../../apis/settings"

// initial state
const state = () => ({
    allJiraConnections:[],
    costEstimation: null,
    registerAllowed:false
});

const getters = {
}

const actions = {
    async getAllJiraConnections({commit}) {
        const res = await settingsApi.getAllJiraConnections();
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
        const res = await settingsApi.createJiraConnection(jiraConnection);
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
    async getJiraConnectionById({commit}, id) {
        const res = await settingsApi.getJiraConnectionById(id);
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
    async getRegisterAllowed({commit}) {
        const res = await settingsApi.getRegisterAllowed();
        switch (res.status) {
            case 200:
                commit('setRegisterAllowed', res.data);
                break;
            case 400:
                throw Error("badRequest");
            case 500:
                throw Error("internalServerError");
            default:
                throw Error("unknownError");
        }
    },
    async toggleRegisterAllowed({commit}, config) {

        const res = await settingsApi.toggleRegisterAllowed(config);
        switch (res.status) {
            case 200:
                commit('setRegisterAllowed', res.data);
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
    setJiraConnection(state, jiraConnection) {
        state.jiraConnection = jiraConnection;
    },
    setRegisterAllowed(state, allowed) {
        state.registerAllowed = allowed;
    },

    setDefaultInvoiceSender(state, defaultInvoiceSender) {
        state.defaultInvoiceSender = defaultInvoiceSender;
    },
    setDefaultInvoiceInformation(state, defaultInvoiceInformation) {
        state.defaultInvoiceInformation = defaultInvoiceInformation;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}