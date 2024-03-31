import { useContext } from "react";
import { AuthContext } from "../../../ContextHandler/Authonicate/Authonicate";
import { StepsContext } from "../../../ContextHandler/RegisterSteps/RegisterSteps";
import { useNavigate } from 'react-router-dom'

const CreatAccount = () => {
    const { userInfo, googleLogin, githubLoagin } = useContext(AuthContext);
    const { setStepCount, setRegistrationInfo } = useContext(StepsContext);
    const navig = useNavigate();

    const handleGoogleSign = () => {
        googleLogin()
            .then(({ user }) => {
                setRegistrationInfo(prevInfo => {
                    return {
                        ...prevInfo,
                        name: user?.displayName || '',
                        email: user?.email || ''
                    }
                })
            })
    }

    const nextPage = () => {
        if (userInfo) {
            setRegistrationInfo(prevInfo => {
                return {
                    ...prevInfo,
                    name: userInfo?.displayName || '',
                    email: userInfo?.email || ''
                }
            })
            setStepCount(1)
            navig('/register/education')
        }
    }

    const handleGithubLogin = () => {
        githubLoagin()
    }

    return (
        <div className="p-10 pb-5">
            <div className="flex flex-col md:flex-row justify-between gap-x-5 items-center border-b border-b-gray-300 mb-2 md:pb-5 ">
                <div className="md:w-1/2">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-700 mb-2">Sign In with your Google or Github Account </h2>
                    <div className="mt-5 lg:mt-10">
                        <div className="group w-full flex justify-center items-center mt-5 h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100 cursor-pointer" onClick={handleGoogleSign}>
                            <div className="relative flex justify-between items-center space-x-7">
                                <img src="https://tailus.io/sources/blocks/social/preview/images/google.svg" className="absolute left-0 w-4 md:w-3 lg:w-5" alt="google logo" />
                                <span className=" sm:text-base md:text-sm lg:text-base font-bold text-gray-700 transition duration-300 group-hover:text-blue-600">Continue with Google</span>
                            </div>
                        </div>

                        <div className="group w-full flex justify-center items-center mt-3 lg:mt-5 h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100 cursor-pointer" onClick={handleGithubLogin}>
                            <div className="relative flex justify-between items-center space-x-7">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/800px-GitHub_Invertocat_Logo.svg.png" className="absolute left-0 w-4 md:w-3 lg:w-5" alt="google logo" />
                                <span className=" sm:text-base md:text-sm lg:text-base font-bold text-gray-700 transition duration-300 group-hover:text-blue-600">Continue with Github</span>
                            </div>
                        </div>
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
                    <button onClick={nextPage} className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" data-rounded="rounded-md" data-primary="blue-600" data-primary-reset="{}">
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreatAccount;