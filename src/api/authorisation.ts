import { axiosInstance } from '.';

export const getLogin = async (body: any) => {
    const response = await axiosInstance.post('/api/auth/local', body);
    const data = await response.data;

    return data;
}
