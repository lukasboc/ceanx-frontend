import axios from "axios";
import Cookie from "js-cookie";

let Api = axios.create({
    //baseURL: 'http://localhost:8000',
    baseURL: import.meta.env.VITE_BACKEND_BASE,
    headers: {
        "Content-Type": "application/json",
        'X-CSRF-TOKEN'    : Cookie.get("XSRF-TOKEN"),
        'X-Requested-With': 'XMLHttpRequest',
    },
    /*headers: {
        "Content-Type": "application/json"
    }*/
    withCredentials: true
});

export default Api;