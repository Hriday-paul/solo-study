import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../ContextHandler/Authonicate/Authonicate";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import { useForm } from "react-hook-form"
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
    const axiosPublic = UseAxiosPublic();
    const [loader, setLoader] = useState(false);
    const { loginUser, googleLogin, setLoading} = useContext(AuthContext);
    const navig = useNavigate();
    //const { state } = useLocation();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const handleRegister = (data) => {
        setLoader(true)
        loginUser(data.email, data.password)
            .then(() => {
                setLoading(false);
                reset();
                setLoader(false);
                navig('/study-room');
            })
            .catch(() => {
                setLoader(false);
                toast.error('Enter valid email & password !')
            })
    }

    const handleGoogleSign = () => {
        setLoader(true)
        googleLogin()
            .then(({ user }) => {
                const { email, displayName } = user;
                axiosPublic.put('/addUser', { 
                    email, 
                    name: displayName, 
                    password: '', 
                    dailyStudyTime: 5,
                    education : ''
                })
                    .then(() => {
                        reset();
                        setLoader(false);
                        navig('/');
                    })
                    .catch(() => {
                        setLoader(false);
                        toast.error('Something wents wrong, try again !')
                    })
            })
            .catch(() => {
                setLoader(false);
                toast.error('Something wents wrong, try again !')
            })
    }


    return (
        <div className="bg-[url('https://png.pngtree.com/thumb_back/fh260/background/20210115/pngtree-25d-business-job-recruitment-poster-background-image_518343.jpg')] bg-cover min-h-screen bg-no-repeat flex justify-center items-center">
            <div className="w-2/3 md:w-2/5 lg:w-1/4 border-t-8 border-t-[#2563EB] p-1 pt-0">
                <div className="p-5 pb-0 bg-white ">
                    <img className="h-16 lg:h-20 w-16 lg:w-20 mx-auto" src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png" alt="" />
                </div>
                <form onSubmit={handleSubmit(handleRegister)} className="space-y-3 bg-white p-5">

                    <div>
                        <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-900">Email <span className="text-red-500">*</span></label>
                        <input id="email" type="email" placeholder="email..." className={`w-full py-2 px-3 rounded-lg bg-white text-gray-900 border outline-0 ${errors.email ? ' border-red-500' : ' border-gray-400 focus:border-blue-500'}`}  {...register("email", { required: true })} />
                        {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-900">Password <span className="text-red-500">*</span></label>
                        <input id="password" type="password" placeholder="password..." className={`w-full py-2 px-3 rounded-lg bg-white text-gray-900 border outline-0 ${errors.password ? ' border-red-500' : ' border-gray-400  focus:border-blue-500 '}`} {...register("password", { required: true })} />
                        {errors.password && <p className="text-red-500 text-sm">Password is required</p>}
                    </div>

                    <div className="col-span-1 md:col-span-2 my-2">
                        <button type="submit" className="btn btn-info w-full bg-blue-500 text-white hover:bg-blue-600">
                            Login Now
                            {
                                loader && <span className="loading loading-spinner"></span>
                            }
                        </button>
                        <p className="text-sm text-gray-900 mt-3">
                            Dont have an account? <Link to="/register" className="font-medium text-gray-800 underline">Register now</Link>
                        </p>

                        <div className="flex flex-row justify-center items-center gap-x-3 mt-5">
                            <div className="p-2 border border-blue-500 inline-block rounded-full cursor-pointer" onClick={handleGoogleSign}>
                                <img src="https://tailus.io/sources/blocks/social/preview/images/google.svg" className="w-5 h-5" alt="google logo" />
                            </div>
                            <div className="p-2 border border-blue-500 inline-block rounded-full cursor-pointer" >
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/800px-GitHub_Invertocat_Logo.svg.png" className="w-5 h-5" alt="github logo" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <Toaster />
        </div>
    );
};

export default Login;