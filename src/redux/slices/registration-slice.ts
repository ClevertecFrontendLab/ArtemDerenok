/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
    step: number,
    loading: boolean,
    error: boolean,
    error400: boolean,
}

const initialState: IInitialState = {
    step: 1,
    loading: false,
    error: false,
    error400: false,
}

const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {
        changeStep: (state) => {
            if (state.step === 4) {
                state.step = 1;
            } else {
                state.step += 1;
            }
        },
        setErrorReg: (state) => {
            state.error = true;
        },
        resetErrorReg: (state) => {
            state.error = false;
        },
        setError400Reg: (state) => {
            state.error400 = true;
        },
        resetError400Reg: (state) => {
            state.error400 = false
        },
        setLoadingStatusReg: (state) => {
            state.loading = true;
        },
        resetLoadingStatusReg: (state) => {
            state.loading = false;
        }
    }
})

const { actions, reducer } = registrationSlice;

export const registrationReducer = reducer;

export const { changeStep, setErrorReg, resetErrorReg, setError400Reg, resetError400Reg, setLoadingStatusReg, resetLoadingStatusReg } = actions;
