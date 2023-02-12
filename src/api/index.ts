import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'https://strapi.cleverland.by',
    timeout: 5000,
})
