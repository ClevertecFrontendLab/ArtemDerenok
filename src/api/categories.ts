import { axiosInstance } from '.';

const path = 'api/categories';

export const getCategories = async () => {
    const response = await axiosInstance.get(path);
    const data = await response.data;

    return data;
}
