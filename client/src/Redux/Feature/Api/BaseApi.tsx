import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface iVideoItem {
    _id: string;
    name: string;
    tabId: number;
    thumb: string;
    video: string;
}
type eachGoalType = {
    _id?: string;
    name: string;
    status: string;
    email: string;
    date: string;
}
type targetGoalType = {
    runingTask: eachGoalType[];
    completeTask: eachGoalType[];
}

type statisticReturnType = {
    counts: {
        [key: string]: number
    }
    todayStudy: number
}

const baseApi = createApi({
    reducerPath: 'api',
    tagTypes: ['goals', 'studyTime'],
    baseQuery: fetchBaseQuery({ baseUrl: 'https://study-tracker-gxks.onrender.com' }),
    endpoints: (builder) => ({
        getVideoByTab: builder.query<iVideoItem[], number>({
            query: (tab) => `/getVideoByTab/${tab}`,
        }),
        getAudios: builder.query<{ _id: string; name: string; audioUrl: string }[], void>({
            query: () => `/audios`,
        }),
        getMotivatedText: builder.query<{ _id: string; role: string; motivation: string, lang: string }[], {lang : string}>({
            query: ({lang}) => `/motivations/${lang}`,
        }),

        addUser: builder.mutation({
            query: (userInfo) => ({
                url: '/addUser',
                method: 'PUT',
                body: userInfo
            })
        }),
        // user goal related api
        getTargetGoal: builder.query<targetGoalType, { email: string; date: string }>({
            query: ({ email, date }) => `/getTodayTask?email=${email}&date=${date}`,
            providesTags: ['goals']
        }),
        addGoal: builder.mutation<any, { status: string; email: string; date: string; name: string }>({
            query: (goalInfo: eachGoalType) => ({
                url: '/addGoal',
                method: 'POST',
                body: goalInfo
            }),
            invalidatesTags: ['goals']
        }),
        updateGoal: builder.mutation<any, string>({
            query: (id: string) => ({
                url: `/updateStudyGoal/${id}`,
                method: 'PUT',
                body: { status: 'complete' }
            }),
            invalidatesTags: ['goals']
        }),
        deleteGoal: builder.mutation<any, string>({
            query: (id: string) => ({
                url: `/deleteTask/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['goals']
        }),


        // user statistics api
        getStatisTics: builder.query<statisticReturnType, { day: number, email: string }>({
            query: ({ day, email }) => `/previousDaysStudy/${day}?email=${email}`,
            providesTags: ['studyTime']
        }),
        getGoalHistoryByPrevdays: builder.query<eachGoalType[], string>({
            query: (email) => `/allGoal?email=${email}`,
            providesTags: ['goals'],
        }),
        getTodayStudyHistory: builder.query<number[], { email: string; date: string }>({
            query: ({ email, date }) => `/todayStudyHistory?email=${email}&date=${date}`,
            providesTags: ['studyTime']
        }),

        // add studyTime
        addStudyTime: builder.mutation<any, { email: string; date: string; studyTime: number; breakTime: number }>({
            query: ({ email, date, studyTime, breakTime }) => ({
                url: `/updateStudyTime`,
                method: 'PUT',
                body: { email, date, studyTime, breakTime }
            }),
            invalidatesTags: ['studyTime']
        }),
    })
})


export const { useGetVideoByTabQuery, useGetTargetGoalQuery, useAddGoalMutation, useUpdateGoalMutation, useDeleteGoalMutation, useGetAudiosQuery, useGetMotivatedTextQuery, useGetStatisTicsQuery, useGetGoalHistoryByPrevdaysQuery, useAddStudyTimeMutation, useGetTodayStudyHistoryQuery } = baseApi;
export default baseApi;