import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initText : {text : string}  = {
    text : 'নীরবে পরিশ্রম করো। তোমার সাফল্য শোরগোল করবেই।'
}

const MotivatedTextSlice = createSlice({
    name : 'bgVideoSlice',
    initialState : initText,
    reducers : {
        changeMotivText : (state, action : PayloadAction<string>)=>{
            state.text = action.payload
        }
    }
})

export const {changeMotivText} = MotivatedTextSlice.actions

export default MotivatedTextSlice.reducer;