import axios from "axios";
import Cookie from "js-cookie";

let Api = axios.create({
    //baseURL: 'http://localhost:8000',
    baseURL: 'https://backend.ceanx.lubomedia.de',
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