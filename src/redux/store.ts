import { configureStore } from '@reduxjs/toolkit';

import { bookReducer } from './slices/book-slice';
import { booksReducer } from './slices/books-slice';
import { categoriesReducer } from './slices/categories-slice';
import { userReducer } from './slices/user-slice';


export const store = configureStore({
    reducer: {
        booksReducer,
        categoriesReducer,
        bookReducer,
        userReducer
    },
    devTools: process.env.NODE_ENV !== 'production',
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
