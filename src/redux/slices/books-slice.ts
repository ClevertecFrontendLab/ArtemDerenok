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
        url: string | null,
    },
    categories: string[],
    id: number,
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
    histories: null | IHistories[]
}

type TCategories = {
    [key: string]: {
        path: string,
        name: string,
        books: IBook[],
    },
}

interface IInitialState {
    books: IBook[],
    loading: boolean,
    error: boolean,
    categoriesCount: TCategories;
}

const initialState: IInitialState = {
    books: [],
    loading: false,
    error: false,
    categoriesCount: {
        'Бизнес': {
            path: 'business',
            name: 'Бизнес',
            books: [],
        },
        'Психология': {
            name: 'Психология',
            path: 'psychology',
            books: [],
        },
        'Родителям': {
            name: 'Родителям',
            path: 'parents',
            books: [],
        },
        'Нон-фикшн': {
            name: 'Нон-фикшн',
            path: 'non-fiction',
            books: [],
        },
        'Художественная литература': {
            name: 'Художественная литература',
            path: 'fiction',
            books: [],
        },
        'Программирование': {
            name: 'Программирование',
            path: 'programming',
            books: [],
        },
        'Хобби': {
            name: 'Хобби',
            path: 'hobby',
            books: [],
        },
        'Дизайн': {
            name: 'Дизайн',
            path: 'design',
            books: [],
        },
        'Детские': {
            name: 'Детские',
            path: 'childish',
            books: [],
        },
        'Другое': {
            name: 'Другое',
            path: 'other',
            books: [],
        },
    }
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
        },
        resestErrorStatusBooks: (state) => {
            state.error = false;
        },
        filterCategories: (state) => {
            state.books.forEach((elem1) => {
                elem1.categories.forEach((elem2) => {
                    state.categoriesCount[elem2].books.push(elem1);
                })
            });
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

export const { setBooks, resestErrorStatusBooks, filterCategories } = actions;
