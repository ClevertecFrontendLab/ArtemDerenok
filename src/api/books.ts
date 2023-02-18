import { axiosInstance } from '.';

const path = '/api/books';

export const getAllBooks = async () => {
    const response = await axiosInstance.get(path);
    const data = await response.data;

    return data;
}

export const getBookById = async (id: number) => {
    const response = await axiosInstance.get(`${path}/${id}`)
    const data = await response.data;

    return data;
}
