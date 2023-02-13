/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getCategories } from '../../api/categories';

interface ICategorie {
    name: string,
    path: string,
    id: number,
}


interface IInitialState {
    categories: ICategorie[],
    error: boolean,
    loading: boolean,
}

const initialState: IInitialState = {
    categories: [],
    error: false,
    loading: false,
}

export const getCategoriesThunk = createAsyncThunk(
    'categories/getCategories',
    () => getCategories()
)


export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories: (state, action: PayloadAction<ICategorie[]>) => {
            state.categories = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCategoriesThunk.pending, (state) => {
            state.loading = true;
            state.error = false;
        });
        builder.addCase(getCategoriesThunk.fulfilled, (state, action: PayloadAction<ICategorie[]>) => {
            state.loading = false;
            state.categories = action.payload;
        });
        builder.addCase(getCategoriesThunk.rejected, (state) => {
            state.loading = false;
            state.error = true;
        })
    }
});

const { actions, reducer, } = categoriesSlice;

export const categoriesReducer = reducer;
