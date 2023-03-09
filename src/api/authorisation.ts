import { axiosInstance } from '.';

export const getLogin = async (body: any) => {
    const response = await axiosInstance.post('/api/auth/local', body);
    const data = await response.data;

    return data;
}

export const setRegistration = async (body: any) => {
    const response = await axiosInstance.post('/api/auth/local/register', body);
    const data = await response.data;

    return data;
}

export const resetPassword = async (body: any) => {
    const response = await axiosInstance.post('/api/auth/forgot-password', body);
    const data = await response.data;

    return data;
}
