import { GoGoal } from "react-icons/go";
import { RiErrorWarningLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { FiPlus } from "react-icons/fi";
import { FaRegCircle } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
import { useAddGoalMutation, useDeleteGoalMutation, useGetTargetGoalQuery, useUpdateGoalMutation } from "../../../Redux/Feature/Api/BaseApi";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";
import VideoError from "../VideoError/VideoError";


const SessionGoal = ({showHideGoal}: {showHideGoal : ()=>void}) => {
    
    const { email } = useSelector((state: RootState) => state.user);
    const todayDate: string = `${new Date().getFullYear()}-${(new Date().getMonth() + 1)}-${new Date().getDate()}`
    const { data, isLoading, isError } = useGetTargetGoalQuery({ email, date: todayDate });
    const [addGoal, { isLoading: insertLoading, isError: insertError }] = useAddGoalMutation();
    const [updateGoal, { isLoading: updateLoading, isError: updateError }] = useUpdateGoalMutation();
    const [deleteGoal, { isLoading: deleteLoading, isError: deletError }] = useDeleteGoalMutation()


    const insertGoal = (e: any) => {
        e.preventDefault();
        const formData = e.target;
        if (formData.name.value) {
            const date = `${new Date().getFullYear()}-${(new Date().getMonth() + 1)}-${new Date().getDate()}`
            const name: string = formData.name.value || '';
            const data = { status: 'runing', email, date, name }
            addGoal(data)
        }
    }

    const deleteTask = (id: string) => {
        deleteGoal(id)
    }

    const updateStatus = (id: string) => {
        updateGoal(id)
    }

    if (insertError || updateError || deletError) {
        console.log(insertError, updateError, deletError);
        toast.error('Something worng, try again !')
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
                    <RxCross2 onClick={showHideGoal} className="text-sm cursor-pointer" />
                </div>
            </div>
            <form onSubmit={insertGoal} className="flex gap-x-3 justify-between">
                <input type="text" name="name" id='name' className="text-white border border-gray-200 bg-transparent py-2 px-2.5 rounded-2xl outline-0 focus:outline-0 w-full" placeholder="type a goal..." />
                {(insertLoading || updateLoading || deleteLoading || isLoading) ? <button disabled={true} type="submit" className="p-2 rounded-lg bg-[#1a1818] border border-gray-500 cursor-not-allowed">
                    <div className="px-1">
                        <ClipLoader
                            color="#ffffff"
                            size={10}
                        />
                    </div>
                </button> :
                    <button type="submit" className="p-2 rounded-lg bg-[#1a1818] border border-gray-500">
                        <FiPlus className="text-base text-white" />
                    </button>
                }
            </form>
            <div className="p-3 bg-[#1a1818] mt-5 rounded-lg bg-opacity-80 flex flex-row items-center justify-center">
                <div className="border-r border-r-gray-300 w-1/2">
                    <h4 className="text-center text-3xl font-bold">{data?.runingTask?.length}</h4>
                    <p className="text-sm text-center">Open</p>
                </div>
                <div className="w-1/2">
                    <h4 className="text-center text-3xl font-bold text-green-600">{data?.completeTask.length}</h4>
                    <p className="text-sm text-center">Complete</p>
                </div>
            </div>
            {
                isError ? <VideoError/> :
                    <div className="max-h-64 overflow-y-auto">
                        <div >
                            {
                                isLoading ? 'loading' :
                                    data?.runingTask?.map((runTask) => {
                                        return <div key={runTask._id} className="p-2 bg-[#1a1818]  rounded-lg bg-opacity-80 mt-2 flex flex-row items-center justify-between">
                                            <div onClick={() => updateStatus(runTask._id || '')} className="flex flex-row gap-x-2 items-center cursor-pointer truncate w-3/4">
                                                <FaRegCircle className="text-lg"></FaRegCircle>
                                                <h3 className="text-sm truncate">{runTask.name}</h3>
                                            </div>
                                            <RxCross2 onClick={() => deleteTask(runTask._id || '')} className="text-xs cursor-pointer w-1/7" />
                                        </div>
                                    })
                            }
                        </div>
                        <div >
                            {
                                isLoading ? 'loading' :
                                    data?.completeTask?.map((comTask) => {
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
            }

        </div>


    );
};

export default SessionGoal;