import Api from "./Api";

const END_POINT = (import.meta.env.VITE_PROJECT_URL ? import.meta.env.VITE_PROJECT_URL : "") + "/jira_connections";

const getAllJiraConnections = () => Api.get(END_POINT + "/all");

const createJiraConnection = (jiraConnection) => Api.post(END_POINT + "/new", jiraConnection);

const testJiraConnection = (jiraConnection) => Api.post(END_POINT + "/test", jiraConnection);

const getJiraConnectionById = (id) => Api.get(END_POINT + "/" + id);

const getJiraResults = (searchParams) => Api.post(END_POINT + "/search", searchParams);

const deleteJiraConnection = (id) => Api.delete(END_POINT + "/" + id);


export {
    getAllJiraConnections,
    createJiraConnection,
    testJiraConnection,
    getJiraConnectionById,
    getJiraResults,
    deleteJiraConnection,
}