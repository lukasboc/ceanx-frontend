import Api from "./Api";

const END_POINT = (import.meta.env.VITE_PROJECT_URL ? import.meta.env.VITE_PROJECT_URL : "") + "/cost_estimation_positions";

const createCostEstimationPosition = (costEstimationPosition) => Api.post(END_POINT + "/new", costEstimationPosition);

const editCostEstimationPosition = (costEstimationPosition) => Api.post(END_POINT + "/edit", costEstimationPosition);

const getAllByCostEstimationId = (id) => Api.get(END_POINT + "/cost_estimation/" + id);

const getSearchResult = (searchParams) => Api.post(END_POINT + "/search", searchParams);

const getCostEstimationPositionById = (id) => Api.get(END_POINT + "/" + id);

const editGroupNames = (params) => Api.post(END_POINT + "/rename_component", params);

const deletePosition = (id) => Api.delete(END_POINT + "/" + id);


export {
    createCostEstimationPosition,
    getAllByCostEstimationId,
    editCostEstimationPosition,
    getSearchResult,
    editGroupNames,
    deletePosition,
    getCostEstimationPositionById,
}