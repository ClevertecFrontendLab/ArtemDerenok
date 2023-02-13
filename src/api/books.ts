import { axiosInstance } from '.';

const path = '/api/books';

export const getAllBooks = async () => {
    const response = await axiosInstance.get(path);
    const data = await response.data;

    return data;
}
