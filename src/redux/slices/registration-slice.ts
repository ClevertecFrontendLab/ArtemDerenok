/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
    step: number,
}

const initialState: IInitialState = {
    step: 1,
}

const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {
        changeStep: (state) => {
            if (state.step === 3) {
                state.step = 1;
            } else {
                state.step += 1;
            }
        }
    }
})

const { actions, reducer } = registrationSlice;

export const registrationReducer = reducer;

export const { changeStep } = actions;
