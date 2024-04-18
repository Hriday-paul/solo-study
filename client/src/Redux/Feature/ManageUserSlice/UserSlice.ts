import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { uploadServerUser } from './HandleUser';
// import type { PayloadAction } from '@reduxjs/toolkit'

interface IuserProp {
    name: string;
    email: string;
    password: string;
    education: string;
    dailyStudyTime: number;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    error: string | undefined
}

type creatType = {
    name: string;
    email: string;
    password: string;
    education: string;
    dailyStudyTime: number;
}
type returnType = {
    name: string,
    email: string,
}

const initState: IuserProp = {
    name: '',
    email: '',
    password: '',
    education: '',
    dailyStudyTime: 5,
    isLoading: false,
    isError: false,
    isSuccess: false,
    error: ''
};


const creatUser = createAsyncThunk<returnType, creatType>('user/creat', async ({ name, email, password, education, dailyStudyTime }: creatType) => {

    await uploadServerUser({ name, email, password, education, dailyStudyTime });

    return { name, email}
});

const loginWithGoogle = createAsyncThunk<returnType, creatType>('/user/signInGoogle', async ({ name, email, password, education , dailyStudyTime}: creatType) => {

    await uploadServerUser({ name, email, password, education, dailyStudyTime});

    return { name, email }
})

const UserSlice = createSlice({
    name: 'user',
    initialState: initState,
    reducers: {
        addUserDetails: (state, { payload }) => {
            state.name = payload.name;
            state.email = payload.email;
            state.password = payload.password;
            state.education = '';
            state.dailyStudyTime = 5;
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.error = '';
        },
        updateStudyTime: (state, { payload }) => {
            state.dailyStudyTime = payload.dailyStudyTime
        },
        updateEducatioin: (state, { payload }) => {
            state.education = payload.education
        },
        signUpRequest: (state) => {
            state.isLoading = true
            state.isError = false
            state.error = ''
            state.isSuccess = false
        },
        signUpSuccessFull: (state, { payload }) => {
            state.name = payload.name;
            state.email = payload.email;
            state.isLoading = false
            state.isError = false
            state.error = '';
            state.isSuccess = true
        },
        signUpError: (state) => {
            state.isLoading = false
            state.isError = true
            state.error = 'Something wrong';
            state.isSuccess = false;
            state.name = '';
            state.email = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(creatUser.pending, (state) => {
                state.name = '';
                state.email = '';
                state.password = '';
                state.isLoading = true;
                state.isError = false;
                state.error = '';
                state.isSuccess = false;
            })
            .addCase(creatUser.fulfilled, (state, { payload }) => {
                state.name = payload.name
                state.email = payload.email
                state.password = ''
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.error = ''
            })
            .addCase(creatUser.rejected, (state, action) => {
                state.name = '',
                    state.email = '',
                    state.password = '',
                    state.isSuccess = false
                state.isLoading = false,
                    state.isError = true,
                    state.error = action.error.message
            })
            .addCase(loginWithGoogle.pending, (state) => {
                state.name = ''
                state.email = ''
                state.password = ''
                state.isLoading = true
                state.isError = false
                state.error = ''
                state.isSuccess = false
            })
            .addCase(loginWithGoogle.fulfilled, (state, { payload }) => {
                state.name = payload.name
                state.email = payload.email
                state.password = ''
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.error = ''
            })
            .addCase(loginWithGoogle.rejected, (state, action) => {
                state.name = '';
                state.email = '';
                state.password = '';
                state.isSuccess = false;
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
            })
    }
})

export const { updateStudyTime, updateEducatioin, addUserDetails, signUpRequest, signUpSuccessFull, signUpError } = UserSlice.actions

export { creatUser, loginWithGoogle }

export default UserSlice.reducer;