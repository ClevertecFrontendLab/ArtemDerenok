/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getAllBooks } from '../../api/books';

interface IHistories {
    id: number,
    userId: number
}

interface IBook {
    issueYear: string,
    rating: number | null,
    title: string,
    authors: string[],
    image: {
        url: string
    },
    categories: string[],
    id: number,
    booking: null | {
        id: number,
        order: boolean,
        dataOrder: string,
        customerId: number,
        customerFirstName: string,
        customerLastName: string,
    },
    delivery: null | {
        id: number,
        handed: true,
        dataHandedFrom: string,
        dataHandedTo: string,
        recipientId: number,
        recipientFirstName: string,
        recipientLastName: string,
    },
    histories: null | IHistories[]
}

interface IInitialState {
    books: IBook[],
    loading: boolean,
    error: boolean,
}

const initialState: IInitialState = {
    books: [],
    loading: false,
    error: false,
}

export const getBooksThunk = createAsyncThunk(
    'books/getBooks',
    () => getAllBooks()
)


const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        setBooks: (state, actions: PayloadAction<IBook[]>) => {
            state.books = actions.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getBooksThunk.pending, (state) => {
            state.loading = true;
            state.error = false;
        });
        builder.addCase(getBooksThunk.fulfilled, (state, action: PayloadAction<IBook[]>) => {
            state.loading = false;
            state.books = action.payload;
        });
        builder.addCase(getBooksThunk.rejected, (state) => {
            state.loading = false;
            state.error = true;
        })
    }
})

const { actions, reducer } = booksSlice;

export const booksReducer = reducer;
