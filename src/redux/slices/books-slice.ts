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
    currentBooks: IBook[],
    isFailSearchResult: boolean,
}

interface ISearchAction {
    category: string,
    value: string,
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
    },
    currentBooks: [],
    isFailSearchResult: false,
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
        filterByDescBooks: (state) => {
            state.currentBooks.sort((a, b) => Number(b.rating) - Number(a.rating))
        },
        filterByIncrBooks: (state) => {
            state.currentBooks.sort((a, b) => Number(a.rating) - Number(b.rating))
        },
        setCurrentBooks: (state, action) => {
            if (action.payload === 'all') {
                state.currentBooks = state.books;
            } else {
                state.currentBooks = state.categoriesCount[mapCategories[action.payload]];
            }
        },
        searchBook: (state, action: PayloadAction<ISearchAction>) => {
            if (action.payload.category === 'all') {

                if (action.payload.value === '') {
                    state.currentBooks = state.books;
                } else {
                    state.currentBooks = state.books.filter((elem) => elem.title.toLowerCase().indexOf(action.payload.value.toLowerCase()) > -1)
                }

            } else if (action.payload.value === '') {
                state.currentBooks = state.categoriesCount[mapCategories[action.payload.category]];
            } else {
                state.currentBooks = state.categoriesCount[mapCategories[action.payload.category]].filter((elem) => elem.title.toLowerCase().indexOf(action.payload.value.toLowerCase()) > -1)
            }
            if (state.currentBooks.length === 0) {
                state.isFailSearchResult = true;
            } else {
                state.isFailSearchResult = false;
            }
        },
        resetFailSearch: (state, action) => {
            state.isFailSearchResult = false;
            if (action.payload === 'all') {
                state.currentBooks = state.books
            } else {
                state.currentBooks = state.categoriesCount[mapCategories[action.payload]];
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

export const { setBooks, resestErrorStatusBooks, filterCategories, filterByDescBooks, filterByIncrBooks, setCurrentBooks, searchBook, resetFailSearch } = actions;
