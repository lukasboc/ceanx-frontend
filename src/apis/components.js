import Api from "./Api";

const END_POINT = (import.meta.env.VITE_PROJECT_URL ? import.meta.env.VITE_PROJECT_URL : "") + "/components";

const getComponents = () => Api.get(END_POINT + "/all");

const createComponent = (component) => Api.post(END_POINT + "/new", component);

const deleteComponent = (id) => Api.delete(END_POINT + "/" + id);


export {
    getComponents,
    createComponent,
    deleteComponent
}