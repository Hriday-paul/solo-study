import { GoGoal } from "react-icons/go";
import { RiErrorWarningLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { FiPlus } from "react-icons/fi";
import { useContext, useEffect, useReducer } from "react";
import UseAxiosPublic from '../../../Hooks/UseAxiosPublic'
import { AuthContext } from "../../../ContextHandler/Authonicate/Authonicate";
import { FaRegCircle } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";

const initState = {
    loading: true,
    runingTask: [],
    completeTask: [],
    error: ""
}

const reducer = (current, action) => {
    switch (action.type) {
        case 'success':
            return {
                loading: false,
                runingTask: action.runingTask,
                completeTask: action.completeTask,
                error: ''
            }
        case 'error':
            return {
                loading: false,
                runingTask: [],
                completeTask: [],
                error: 'Something wrong'
            }
        default: return current
    }
}

const SessionGoal = () => {
    const [states, dispatch] = useReducer(reducer, initState);
    const axiosPublic = UseAxiosPublic();
    const { userInfo } = useContext(AuthContext);

    const fetchData = () => {
        const date = `${new Date().getFullYear()}-${(new Date().getMonth() + 1)}-${new Date().getDate()}`
        axiosPublic.get(`/getTodayTask?email=${'hridoychandrapaul.10@gmail.com'}&date=${date}`)
            .then(({ data }) => {
                dispatch({ type: 'success', runingTask: data?.runingTask || [], completeTask: data?.completeTask })
            })
            .catch(() => {
                dispatch({ type: 'error' })
            })
    }

    useEffect(() => {
        fetchData();
    }, []);

    const insertGoal = (e) => {
        e.preventDefault();
        const formData = e.target;
        if (formData.name.value) {
            const date = `${new Date().getFullYear()}-${(new Date().getMonth() + 1)}-${new Date().getDate()}`
            const name = formData.name.value;
            axiosPublic.post('/addGoal', {status : 'runing', email : `hridoychandrapaul.10@gmail.com`, date, name})
            .then(()=>{
                fetchData();
                formData.reset();
            })
        }
    }

    const deleteTask = (id) => {
        axiosPublic.delete(`/deleteTask/${id}`)
            .then(() => {
                fetchData();
            })
    }

    const updateStatus = (id) => {
        axiosPublic.put(`/updateStudyGoal/${id}`, { status: 'complete' })
            .then(() => {
                fetchData();
            })
    }


    return (
        <div>
            <div className="flex flex-row justify-between items-center mb-3">
                <div className="flex items-center gap-x-2">
                    <GoGoal className="text-sm"></GoGoal>
                    <h4 className="text-gray-200 text-sm">Session Goals</h4>
                </div>

                <div className="flex gap-x-3 items-center">
                    <RiErrorWarningLine className="text-sm" />
                    <RxCross2 className="text-sm cursor-pointer" />
                </div>
            </div>
            <form onSubmit={insertGoal} className="flex gap-x-3 justify-between">
                <input type="text" name="name" id='name' className="text-white border border-gray-200 bg-transparent py-2 px-2.5 rounded-2xl outline-0 focus:outline-0 w-full" placeholder="type a goal..." />
                <button type="submit" className="p-2 rounded-lg bg-[#1a1818] border border-gray-500">
                    <FiPlus className="text-base text-white" />
                </button>
            </form>
            <div className="p-3 bg-[#1a1818] mt-5 rounded-lg bg-opacity-80 flex flex-row items-center justify-center">
                <div className="border-r border-r-gray-300 w-1/2">
                    <h4 className="text-center text-3xl font-bold">{states?.runingTask?.length}</h4>
                    <p className="text-sm text-center">Open</p>
                </div>
                <div className="w-1/2">
                    <h4 className="text-center text-3xl font-bold text-green-600">{states?.completeTask.length}</h4>
                    <p className="text-sm text-center">Complete</p>
                </div>
            </div>
            <div >
                {
                    states.loading ? 'loading' : states.error ? 'error' :
                        states?.runingTask?.map((runTask) => {
                            return <div key={runTask._id} className="p-2 bg-[#1a1818]  rounded-lg bg-opacity-80 mt-2 flex flex-row items-center justify-between">
                                <div onClick={() => updateStatus(runTask._id)} className="flex flex-row gap-x-2 items-center cursor-pointer truncate w-3/4">
                                    <FaRegCircle className="text-lg"></FaRegCircle>
                                    <h3 className="text-sm truncate">{runTask.name}</h3>
                                </div>
                                <RxCross2 onClick={() => deleteTask(runTask._id)} className="text-xs cursor-pointer w-1/7" />
                            </div>
                        })
                }
            </div>
            <div >
                {
                    states.loading ? 'loading' : states.error ? 'error' :
                        states?.completeTask?.map((comTask) => {
                            return <div key={comTask._id} className="p-2 bg-[#1a1818]  rounded-lg bg-opacity-80 mt-2 flex flex-row items-center justify-between">
                                <div className="flex flex-row gap-x-2 items-center truncate">
                                    <FaRegCheckCircle className="text-lg text-green-400"></FaRegCheckCircle>
                                    <h3 className="text-sm truncate">{comTask.name}</h3>
                                </div>
                            </div>
                        })
                }
            </div>
        </div>
    );
};

export default SessionGoal;