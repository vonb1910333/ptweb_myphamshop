import axios from "axios";
// khai bao url
export default axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});