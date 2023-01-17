import * as costEstimationsApi from "../../apis/costEstimations"

// initial state
const state = () => ({
    all: [],
    costEstimation: null,
    costEstimationMessage: null,
    costEstimationSuccess: '',
    costEstimationErrorMessage: '',
    latest: [],
});

const actions = {
    async getAll({commit}) {
        const res = await costEstimationsApi.getAll();
        switch (res.status) {
            case 200:
                commit('setCostEstimations', res.data);
                break;
            case 400:
                commit('setCostEstimations', []);
                break;
            case 500:
                break;
        }
    },
    async getLatestEstimations({commit}) {
        const res = await costEstimationsApi.getLatestEstimations();
        switch (res.status) {
            case 200:
                commit('setLatestCostEstimations', res.data);
                break;
            case 400:
                commit('setLatestCostEstimations', []);
                break;
            case 500:
                commit('setLatestCostEstimations', []);
                break;
        }
    },
    async createCostEstimation({commit}, costEstimation) {
        const res = await costEstimationsApi.createCostEstimation(costEstimation);
        switch (res.status) {
            case 201:
                commit('setCostEstimation', res.data);
                break;
            case 400:
                throw Error("badRequest");
            case 500:
                throw Error("internalServerError");
            default:
                throw Error("unknownError");
        }
    },
    async getCostEstimationById({commit}, id) {
        const res = await costEstimationsApi.getCostEstimationById(id);
        switch (res.status) {
            case 200:
                commit('setCostEstimation', res.data);
                break;
            case 400:
                throw Error("badRequest");
            case 500:
                throw Error("internalServerError");
            default:
                throw Error("unknownError");
        }
    },
    async editCostEstimation({commit}, costEstimation) {
        const res = await costEstimationsApi.editCostEstimation(costEstimation);
        switch (res.status) {
            case 200:
                commit('setCostEstimation', res.data);
                commit('setCostEstimationSuccess', 'Die Änderungen wurden gespeichert.');
                break;
            case 201:
                commit('setCostEstimation', res.data);
                commit('setCostEstimationSuccess', 'Die Änderungen wurden gespeichert.');
                break;
            case 401:
                commit('setCostEstimationSuccess', '');
                commit('setCostEstimationErrorMessage', '401 - Ein Fehler ist aufgetreten.');
                throw Error("unauthorized");
            case 500:
                commit('setCostEstimationSuccess', '');
                commit('setCostEstimationErrorMessage', '500 - Ein Fehler ist aufgetreten.');
                throw Error("internalServerError");
            default:
                commit('setCostEstimationSuccess', '');
                commit('setCostEstimationErrorMessage', 'Ein Fehler ist aufgetreten.');
                throw Error("unknownError");
        }
    },
    async duplicateCostEstimation({commit}, costEstimation) {
        const res = await costEstimationsApi.duplicateCostEstimation(costEstimation);
        switch (res.status) {
            case 200:
                commit('setCostEstimation', res.data);
                break;
            case 201:
                commit('setCostEstimation', res.data);
                break;
            case 401:
                commit('setCostEstimationSuccess', '');
                throw Error("unauthorized");
            case 500:
                commit('setCostEstimationSuccess', '');
                throw Error("internalServerError");
            default:
                commit('setCostEstimationSuccess', '');
                throw Error("unknownError");
        }
    },
    async deleteCostEstimation({commit}, id) {
        const res = await costEstimationsApi.deleteCostEstimation(id);
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
    setCostEstimations(state, costEstimations) {
        state.all = costEstimations;
    },
    setCostEstimation(state, costEstimation) {
        state.costEstimation = costEstimation;
    },
    setCostEstimationMessage(state, message){
        state.costEstimationMessage = message
    },
    setCostEstimationErrorMessage(state, message){
        state.costEstimationErrorMessage = message
    },
    setCostEstimationSuccess(state, message){
        state.costEstimationSuccess = message
    },
    setLatestCostEstimations(state,latest){
        state.latest = latest
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
