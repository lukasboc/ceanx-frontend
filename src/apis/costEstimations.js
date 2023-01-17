import Api from "./Api";

const END_POINT = (import.meta.env.VITE_PROJECT_URL ? import.meta.env.VITE_PROJECT_URL : "") + "/cost_estimations";

const getAll = () => Api.get(END_POINT + "/all");

const getLatestEstimations = () => Api.get(END_POINT + "/latest");

const createCostEstimation = (costEstimation) => Api.post(END_POINT + "/new", costEstimation);

const editCostEstimation = (costEstimation) => Api.post(END_POINT + "/edit", costEstimation);

const duplicateCostEstimation = (costEstimation) => Api.post(END_POINT + "/duplicate", costEstimation);

const getCostEstimationById = (id) => Api.get(END_POINT + "/" + id);

const deleteCostEstimation = (id) => Api.delete(END_POINT + "/" + id);


export {
    getAll,
    createCostEstimation,
    duplicateCostEstimation,
    editCostEstimation,
    getLatestEstimations,
    getCostEstimationById,
    deleteCostEstimation,
}