import * as costEstimationsApi from "../../apis/costEstimations"
import * as costEstimationPositionsApi from "../../apis/costEstimationPositions"

// initial state
const state = () => ({
    all: [],
    costEstimation: null,
    costEstimationMessage: null,
    costEstimationSuccess: '',
    costEstimationPositionErrorMessage:'',
    costEstimationPosition:null,
    searchResult:[],
    jiraSearchString:'',
    troiSearchString:'',
    ceanXSearchString:''
});

const getters = {

}

const actions = {
    async getAllForCostEstimation({commit}, id) {
        const res = await costEstimationPositionsApi.getAllByCostEstimationId(id);
        switch (res.status) {
            case 200:
                commit('setEstimationPositions', res.data);
                break;
            case 400:
                commit('setEstimationPositions', []);
                break;
            case 500:
                break;
        }
    },
    async createCostEstimationPosition({commit}, costEstimation) {
        const res = await costEstimationPositionsApi.createCostEstimationPosition(costEstimation);
        switch (res.status) {
            case 201:
                commit('setCostEstimationPosition', res.data);
                break;
            case 400:
                throw Error("badRequest");
            case 500:
                throw Error("internalServerError");
            default:
                throw Error("unknownError");
        }
    },
    async editCostEstimationPosition({commit}, costEstimation) {
        const res = await costEstimationPositionsApi.editCostEstimationPosition(costEstimation);
        switch (res.status) {
            case 200:
                commit('setCostEstimationPosition', res.data);
                commit('setCostEstimationPositionSuccess', 'Die Änderungen wurden gespeichert.');
                break;
            case 201:
                commit('setCostEstimationPosition', res.data);
                commit('setCostEstimationPositionSuccess', 'Die Änderungen wurden gespeichert.');
                break;
            case 401:
                commit('setCostEstimationPosition', '');
                commit('setCostEstimationPositionSuccess', '');
                commit('setCostEstimationPositionErrorMessage', '401 - Ein Fehler ist aufgetreten.');
                throw Error("unauthorized");
            case 500:
                commit('setCostEstimationPosition', '');
                commit('setCostEstimationPositionSuccess', '');
                commit('setCostEstimationPositionErrorMessage', '500 - Ein Fehler ist aufgetreten.');
                throw Error("internalServerError");
            default:
                commit('setCostEstimationPosition', '');
                commit('setCostEstimationPositionSuccess', '');
                commit('setCostEstimationPositionErrorMessage', 'Ein Fehler ist aufgetreten.');
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
    async getCostEstimationPositionById({commit}, id) {
        const res = await costEstimationPositionsApi.getCostEstimationPositionById(id);
        switch (res.status) {
            case 200:
                commit('setCostEstimationPosition', res.data);
                break;
            case 400:
                throw Error("badRequest");
            case 500:
                throw Error("internalServerError");
            default:
                throw Error("unknownError");
        }
    },
    async deletePosition({commit}, id) {
        const res = await costEstimationPositionsApi.deletePosition(id);
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
    async editGroupNames({commit}, params) {
        const res = await costEstimationPositionsApi.editGroupNames(params);
        switch (res.status) {
            case 200:
                break;
            case 201:
                break;
            case 401:
                throw Error("unauthorized");
            case 500:
                throw Error("internalServerError");
            default:
                throw Error("unknownError");
        }
    },
    async getSearchResult({commit}, searchParams) {
        const res = await costEstimationPositionsApi.getSearchResult(searchParams);
        switch (res.status) {
            case 200:
                commit('setSearchResult', res.data);
                break;
            case 201:
                commit('setSearchResult', res.data);
                break;
            case 400:
                commit('setSearchResult', '');
                throw Error("badRequest");
            case 500:
                throw Error("internalServerError");
            default:
                throw Error("unknownError");
        }
    },
}

const mutations = {
    setEstimationPositions(state, estimationPositions) {
        state.all = estimationPositions;
    },
    setCostEstimationPosition(state, costEstimation) {
        state.costEstimationPosition = costEstimation;
    },
    setCostEstimation(state, costEstimation) {
        state.costEstimation = costEstimation;
    },
    setCostEstimationMessage(state, message){
        state.costEstimationMessage = message
    },
    setCostEstimationPositionErrorMessage(state, message){
        state.costEstimationPositionErrorMessage = message
    },
    setCostEstimationSuccess(state, message){
        state.costEstimationSuccess = message
    },
    setSearchResult(state, result) {
        state.searchResult = result;
    },
    setJiraSearchString(state,string){
        state.jiraSearchString = string;
    },
    setTroiSearchString(state,string){
        state.troiSearchString = string;
    },
    setCeanXSearchString(state,string){
        state.ceanXSearchString = string;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
