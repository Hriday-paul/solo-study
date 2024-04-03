import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StepsContext } from "../../../ContextHandler/RegisterSteps/RegisterSteps";
import { Spin } from "antd";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import toast, { Toaster } from 'react-hot-toast';

const Welcome = () => {
    const [loading, setLoading] = useState(true);
    const navig = useNavigate();
    const { stepCount, registrationInfo } = useContext(StepsContext);
    const axiosPublic = UseAxiosPublic();

    useEffect(() => {
        if (stepCount == 3) {
            axiosPublic.put('/addUser', registrationInfo)
                .then(() => {
                    setLoading(false);
                })
                .catch(() => {
                    toast.error('Something wrong, try again !')
                    navig('/register')
                })
        } else {
            navig('/register')
        }
    }, [])

    const nextPage = () => {
        navig('/study-room')
    };

    

    return (
        <div>
            <div className="p-10 pb-5">
                <div className="flex flex-col md:flex-row justify-between gap-x-5 items-center border-b border-b-gray-300 mb-2 md:pb-5 lg:pb-0">
                    <div className="md:w-1/2">
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-700 mb-2">Perfect, nice to meet you! 😎
                            Welcome to Study Together!</h2>
                        <div className="h-20 md:h-24 lg:h-32 flex flex-col items-center justify-center ">
                            <Spin spinning={loading} size="large" />
                            <p className={`text-sm text-gray-600 ${loading ? '' : 'hidden'}`}>Wait few seconds...</p>

                        </div>
                    </div>
                    <div className="md:w-1/2">
                        <img src="https://res.cloudinary.com/devlj6p7h/image/upload/v1711789965/test/y7ihzellpcqpbq5tdlu4.jpg" alt="study-img" />
                    </div>
                </div>
                <div className="flex flex-row justify-between items-center">
                    <div>

                    </div>
                    <div>

                        <button disabled={loading} onClick={nextPage} className={`inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-50 border-blue-100 cursor-not-allowed' : ''}`} data-rounded="rounded-md" data-primary="blue-600" data-primary-reset="{}">
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