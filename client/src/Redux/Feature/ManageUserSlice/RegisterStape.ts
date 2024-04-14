import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

type stepType = {
    step: number,
    stepList: { title: string }[]
}

const initStep: stepType = {
    step: 0,
    stepList: [
        {
            title: 'Create',
        },
        {
            title: 'Education',
        },
        {
            title: 'Study Time',
        },
        {
            title: 'Welcome',
        },
    ]
};

const registrStape = createSlice({
    name: 'step',
    initialState: initStep,
    reducers: {
        updateStep: (state, action: PayloadAction<number>) => {
            state.step = action.payload
        }
    },
})

export const { updateStep } = registrStape.actions

export default registrStape.reducer