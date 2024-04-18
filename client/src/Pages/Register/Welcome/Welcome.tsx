import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { AppDispatch, RootState } from "../../../Redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { updateStep } from "../../../Redux/Feature/ManageUserSlice/RegisterStape";
import { creatUser, signUpError, signUpRequest } from "../../../Redux/Feature/ManageUserSlice/UserSlice";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../../firebase.init";
import toast, { Toaster } from "react-hot-toast";

const Welcome = () => {
    const navig = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { step } = useSelector((state: RootState) => state.registerStape);
    const userInfo = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (step === 0) {
            navig('/register');
        }
        else if(step === 2){
            navig('/register/studyTime')
        }
    }, [navig, step])

    const nextPage = async () => {
        dispatch(signUpRequest())

        createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
            .then(({ user }) => {
                const finalEmail = user.email ? user.email : ''
                const finalname = user.displayName ? user.displayName : ''
                dispatch(creatUser({ name: finalname, email: finalEmail, password: userInfo.password, dailyStudyTime: userInfo.dailyStudyTime, education: userInfo.education }))
            })
            .catch(() => {
                toast.error('Email already exist, enter valid email!')
                dispatch(signUpError());
            })
    };

    const prevPage = () => {
        if (userInfo.isError) {
            dispatch(updateStep(0))
        }
        else{
            dispatch(updateStep(2))
        }
    }

    if (userInfo.isSuccess) {
        navig('/study-room')
    }


    return (
        <div>
            <div className="p-10 pb-5">
                <div className="flex flex-col md:flex-row justify-between gap-x-5 items-center border-b border-b-gray-300 mb-2 md:pb-5 lg:pb-0">
                    <div className="md:w-1/2">
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-700 mb-2">Perfect, nice to meet you! 😎
                            Welcome to Study Together!</h2>
                        <div className="h-20 md:h-24 lg:h-32 flex flex-col items-center justify-center ">
                            <Spin spinning={userInfo.isLoading} size="large" />
                            <p className={`text-sm text-gray-600 ${userInfo.isLoading ? '' : 'hidden'}`}>Wait few seconds...</p>
                            {
                                userInfo.isError && <p className="text-red-500 font-medium text-base lg:text-lg">Something wrong, try again to set valid information. 😰</p>
                            }
                        </div>
                    </div>
                    <div className="md:w-1/2">
                        <img src="https://res.cloudinary.com/devlj6p7h/image/upload/v1711789965/test/y7ihzellpcqpbq5tdlu4.jpg" alt="study-img" />
                    </div>
                </div>
                <div className="flex flex-row justify-between items-center">
                    <div>

                    </div>
                    <div className="flex gap-x-5 items-center">
                        <button onClick={prevPage} className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-blue-700 hover:text-white whitespace-no-wrap border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 duration-200" data-rounded="rounded-md" data-primary="blue-600" data-primary-reset="{}">
                            Back
                        </button>

                        <button disabled={userInfo.isLoading} onClick={nextPage} className={`inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${userInfo.isLoading ? 'opacity-50 border-blue-100 cursor-not-allowed' : ''}`} data-rounded="rounded-md" data-primary="blue-600" data-primary-reset="{}">
                            Finish
                        </button>
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default Welcome;