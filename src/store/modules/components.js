import * as componentsApi from "../../apis/components"

// initial state
const state = () => ({
    components:[],
    component:null
});

const getters = {
}

const actions = {
    async getComponents({commit}) {
        const res = await componentsApi.getComponents();
        switch (res.status) {
            case 200:
                commit('setComponents', res.data);
                break;
            case 400:
                commit('setComponents', []);
                break;
            case 500:
                break;
        }
    },
    async createComponent({commit}, component) {
        const res = await componentsApi.createComponent(component);
        switch (res.status) {
            case 201:
                commit('setComponent', res.data);
                break;
            case 400:
                throw Error("badRequest");
            case 500:
                throw Error("internalServerError");
            default:
                throw Error("unknownError");
        }
    },
    async deleteComponent({commit}, id) {
        const res = await componentsApi.deleteComponent(id);
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
    setComponents(state, components) {
        state.components = components;
    },
    setComponent(state, component) {
        state.component = component;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}