import axios from "axios";

const axiosConnection = axios.create({
    baseURL: "http://localhost:8081",
    headers: {
        "Content-type":"application/json",
        "Accept": "application/json",
    }
})

export default axiosConnection;