import { configureStore } from '@reduxjs/toolkit';

import { booksReducer } from './slices/book-slice';
import { categoriesReducer } from './slices/categories-slice';


export const store = configureStore({
    reducer: {
        booksReducer,
        categoriesReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
