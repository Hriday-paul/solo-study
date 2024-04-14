import { Link, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import { addUserDetails } from "../../../Redux/Feature/ManageUserSlice/UserSlice";
import { AppDispatch, RootState } from "../../../Redux/Store";
import { useEffect } from 'react';
import { updateStep } from '../../../Redux/Feature/ManageUserSlice/RegisterStape';

type Inputs = {
    name: string,
    email: string
    password: string
}

const CreatAccount = () => {
    const navig = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const userInfo = useSelector((state: RootState) => state.user);
    const { step } = useSelector((state: RootState) => state.registerStape);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    useEffect(() => {
        if (userInfo.email && step === 1) {
            navig('/register/education')
        }
    }, [userInfo, navig, step])


    const handleRegister: SubmitHandler<Inputs> = (data) => {
        dispatch(addUserDetails({ name: data.name, email: data.email, password: data.password }));
        dispatch(updateStep(1))
    }


    return (
        <div className="p-10 pb-5">
            <form onSubmit={handleSubmit(handleRegister)}>
                <div className='flex flex-col md:flex-row justify-between gap-x-5 items-center border-b border-b-gray-300 mb-2 md:pb-5 '>
                    <div className="md:w-1/2">
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-700 mb-2">Creat a new account with email & password</h2>
                        <div className="mt-5 lg:mt-5">
                            <div className="space-y-3">
                                <div>
                                    <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-900">Full name <span className="text-red-500">*</span></label>
                                    <input id="name" type="text" placeholder="name..." className={`w-full py-2 px-3 rounded-lg bg-white text-gray-900 border outline-0 ${errors.name ? 'border border-red-500' : 'border border-gray-400 focus:border-blue-500'}`} {...register("name", { required: true })} />
                                    {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-900">Email <span className="text-red-500">*</span></label>
                                    <input id="email" type="email" placeholder="email..." className={`w-full py-2 px-3 rounded-lg bg-white text-gray-900 border outline-0 ${errors.email ? ' border-red-500' : ' border-gray-400 focus:border-blue-500'}`}  {...register("email", { required: true })} />
                                    {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
                                </div>

                                <div>
                                    <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-900">Password <span className="text-red-500">*</span></label>
                                    <input id="password" type="password" placeholder="password..." className={`w-full py-2 px-3 rounded-lg bg-white text-gray-900 border outline-0 ${errors.password ? ' border-red-500' : ' border-gray-400  focus:border-blue-500 '}`} {...register("password", { required: true, pattern: /(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/, minLength: 6 })} />
                                    {errors.password && <p className="text-red-500 text-sm">use minimum 1 capital, 1 number and 1 special character & 6 length</p>}
                                </div>

                                <div className="col-span-1 md:col-span-2 my-2">
                                    <p className="text-sm font-light text-gray-900 mt-3">
                                        Already have an account? <Link to="/login" className="font-medium text-gray-800 hover:underline">Login here</Link>
                                    </p>
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
                        <button className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" data-rounded="rounded-md" data-primary="blue-600" data-primary-reset="{}">
                            Next
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreatAccount;