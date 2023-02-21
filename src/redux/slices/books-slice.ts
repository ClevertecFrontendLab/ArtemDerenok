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
    [key: string]: IBook[]
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
        'Бизнес': [],
        'Психология': [],
        'Родителям': [],
        'Нон-фикшн': [],
        'Художественная литература': [],
        'Программирование': [],
        'Хобби': [],
        'Дизайн': [],
        'Детские': [],
        'Другое': [],
    }
}

type TMapCategories = {
    [key: string]: string;
};

export const mapCategories: TMapCategories = {
    all: 'all',
    business: 'Бизнес',
    psychology: 'Психология',
    parents: 'Родителям',
    'non-fiction': 'Нон-фикшн',
    fiction: 'Художественная литература',
    programming: 'Программирование',
    hobby: 'Хобби',
    design: 'Дизайн',
    childish: 'Детские',
    other: 'Другое',
};

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
                    state.categoriesCount[elem2].push(elem1);
                })
            });
        },
        filterByDescBooks: (state, actions) => {
            if (actions.payload === 'all') {
                state.books.sort((a, b) => Number(b.rating) - Number(a.rating))
            } else {
                state.categoriesCount[actions.payload].sort((a, b) => Number(b.rating) - Number(a.rating))
            }
        },
        filterByIncrBooks: (state, actions) => {
            if (actions.payload === 'all') {
                state.books.sort((a, b) => Number(a.rating) - Number(b.rating))
            } else {
                state.categoriesCount[actions.payload].sort((a, b) => Number(a.rating) - Number(b.rating))
            }
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

export const { setBooks, resestErrorStatusBooks, filterCategories, filterByDescBooks, filterByIncrBooks } = actions;
