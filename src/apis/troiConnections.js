import Api from "./Api";

const END_POINT = (import.meta.env.VITE_PROJECT_URL ? import.meta.env.VITE_PROJECT_URL : "") + "/troi_connections";

const getAllTroiConnections = () => Api.get(END_POINT + "/all");

const createTroiConnection = (troiConnection) => Api.post(END_POINT + "/new", troiConnection);

const testTroiConnection = (troiConnection) => Api.post(END_POINT + "/test", troiConnection);

const getTroiConnectionById = (id) => Api.get(END_POINT + "/" + id);

const getTroiResult = (searchParams) => Api.post(END_POINT + "/search", searchParams);

const deleteTroiConnection = (id) => Api.delete(END_POINT + "/" + id);


export {
    getAllTroiConnections,
    createTroiConnection,
    testTroiConnection,
    getTroiConnectionById,
    getTroiResult,
    deleteTroiConnection
}