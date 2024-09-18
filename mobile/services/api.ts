import axios from "axios";

//http://localhost:3333/create
export const api = axios.create({
    baseURL: "http://192.168.68.120:3333",
})