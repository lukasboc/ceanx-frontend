import Api from "./Api";
import Csrf from "./Csrf";

const END_POINT = (import.meta.env.VITE_PROJECT_URL ? import.meta.env.VITE_PROJECT_URL : "") + "/users";

const getUser = () => Api.get( "/api/user");

const getLatestUsers = () => Api.get( END_POINT + "/latest");

const logout = () => Api.post( "/logout");

const sendVerification = (payload) => Api.post( "/email/verification-notification", payload);

const login = (form) => Api.post("/login", form);

const updatePassword = (payload) => Api.put("/user/password", payload);

export default {
    async register(form) {
        await Csrf.getCookie();
        return Api.post("/register", form);
    },
    auth() {
        return Api.get("/api/user");
    }
};
export {
    getUser,
    logout,
    getLatestUsers,
    login,
    sendVerification,
    updatePassword
}