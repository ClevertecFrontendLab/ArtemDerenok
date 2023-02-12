import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

interface IInitialState {
    books: string[],
}

const initialState: IInitialState = {
    books: ['1', '2'],
}


const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {}
})

const { actions, reducer } = booksSlice;

export const booksReducer = reducer;
