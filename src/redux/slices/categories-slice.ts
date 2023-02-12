/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getCategories } from '../../api/categories';

interface ICategorie {
    name: string,
    path: string,
    id: number,
}

interface IError {
    data: null,
    error: {
        status: number,
        name: string,
        message: string,
        details: object,
    }
}

interface IInitialState {
    categories: ICategorie[],
    error: null | IError,
    loading: boolean,
}

const initialState: IInitialState = {
    categories: [],
    error: null,
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
        builder.addCase(getCategoriesThunk.fulfilled, (state, action: PayloadAction<ICategorie[]>) => {
            state.categories = action.payload;
        })
    }
});

const { actions, reducer, } = categoriesSlice;

export const categoriesReducer = reducer;
