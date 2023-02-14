/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getBookById } from '../../api/books';


interface IImages {
    url: string | null,
}

interface IComment {
    id: number,
    rating: number,
    text: string,
    createdAt: string,
    user: {
        commentUserId: number,
        firstName: string,
        lastName: string,
        avatarUrl: string,
    }
}

interface IHistories {
    id: number,
    userId: number
}

interface IBook {
    id: number,
    title: string,
    rating: number | null,
    issueYear: string,
    description: string | null,
    publish: string,
    pages: string,
    cover: string,
    weight: string,
    format: string,
    ISBN: string,
    producer: string,
    authors: string[],
    images: IImages[],
    categories: string[]
    comments: IComment[] | null,
    booking: null | {
        id: number,
        order: boolean,
        dateOrder: string,
        customerId: number,
        customerFirstName: string,
        customerLastName: string,
    },
    delivery: null | {
        id: number,
        handed: true,
        dateHandedFrom: string,
        dateHandedTo: string,
        recipientId: number,
        recipientFirstName: string,
        recipientLastName: string,
    },
    histories: IHistories[]
}

const initialState = {
    book: {},
    loading: false,
    error: false,
}

export const getBookThunk = createAsyncThunk(
    'books/getBook',
    (id: number) => getBookById(id)
)

const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        setBook: (state, actions: PayloadAction<IBook>) => {
            state.book = actions.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getBookThunk.pending, (state) => {
            state.loading = true;
            state.error = false;
        });
        builder.addCase(getBookThunk.fulfilled, (state, action: PayloadAction<IBook[]>) => {
            state.loading = false;
            state.book = action.payload;
        });
        builder.addCase(getBookThunk.rejected, (state) => {
            state.error = true;
        })
    }
});

const { actions, reducer } = bookSlice;

export const bookReducer = reducer;
