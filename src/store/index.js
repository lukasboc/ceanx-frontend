import { createStore, createLogger } from "vuex";
import costEstimations from "./modules/costEstimations";
import costEstimationPositions from "./modules/costEstimationPositions";
import users from "./modules/users";
import settings from "./modules/settings";
import jiraConnections from "./modules/jiraConnections";
import troiConnections from "./modules/troiConnections";
import components from "./modules/components";

export default createStore({
    modules: {
        costEstimations,
        costEstimationPositions,
        jiraConnections,
        troiConnections,
        components,
        users,
        settings,
    },
    strict: import.meta.env.DEV,
    plugins: import.meta.env.DEV ? [createLogger()] : []
})