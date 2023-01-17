import Api from "./Api";

const END_POINT = (import.meta.env.VITE_PROJECT_URL ? import.meta.env.VITE_PROJECT_URL : "") + "/setting";

const getAllJiraConnections = () => Api.get(END_POINT + "/all");

const getRegisterAllowed = () => Api.get(END_POINT + "/register_allowed");

const toggleRegisterAllowed = (config) => Api.post(END_POINT + "/toggle_registration", config);

const createJiraConnection = (jiraConnection) => Api.post(END_POINT + "/new", jiraConnection);

const getJiraConnectionById = (id) => Api.get(END_POINT + "/" + id);


export {
    getRegisterAllowed,
    toggleRegisterAllowed,
    getAllJiraConnections,
    createJiraConnection,
    getJiraConnectionById
}