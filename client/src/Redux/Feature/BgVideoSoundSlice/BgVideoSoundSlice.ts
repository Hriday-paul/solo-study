import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initSound : {currentSound : number} = {
    currentSound : 20
};

const bgVideoSoundSlice = createSlice({
    name : 'bgVideoSound',
    initialState : initSound,
    reducers : {
        changeVideoSound : (state, action : PayloadAction<number>)=>{
            state.currentSound = action.payload;
        }
    }
})

export const {changeVideoSound} = bgVideoSoundSlice.actions
export default bgVideoSoundSlice.reducer