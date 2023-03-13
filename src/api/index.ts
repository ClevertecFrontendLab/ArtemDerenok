import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://strapi.cleverland.by',
    timeout: 20000,
})

export const setToken = () => {

    axiosInstance.interceptors.request.use((config) => {
        const copyConfig = config;
        const token = localStorage.getItem('jwt')

        if (token) {
            copyConfig.headers.Authorization = `Bearer ${token}`;
        }

        return copyConfig;
    })
}
