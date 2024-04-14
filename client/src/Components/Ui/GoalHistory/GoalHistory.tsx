import { useSelector } from "react-redux"
import { RootState } from "../../../Redux/Store"
import { useGetGoalHistoryByPrevdaysQuery } from "../../../Redux/Feature/Api/BaseApi";
import TabLoading from "../TabLoading/TabLoading";
import VideoError from "../VideoError/VideoError";

const GoalHistory = () => {
    const {email} = useSelector((state : RootState)=>state.user)
    const {data, isLoading, isError} = useGetGoalHistoryByPrevdaysQuery(email);

    return (
        <div>
            <div>
                {
                    isLoading ? <TabLoading/> : isError ? <VideoError /> :
                        <div className="max-h-[calc(100vh-170px)] overflow-auto">
                            {
                                (data?.length || 0) <= 0 ? 'Data not found ): ' :
                                    <div className="overflow-x-auto bg-transparent">
                                        <table className="table">
                                            {/* head */}
                                            <thead>
                                                <tr className="border-[#494846]"> 
                                                    <th>Name</th>
                                                    <th>Date</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* row 1 */}
                                                {
                                                    data?.map((goal) => {
                                                        return <tr key={goal?._id} className="border-[#494846]">
                                                            
                                                            <td className="font-serif">
                                                                {goal?.name}
                                                            </td>
                                                           
                                                            <td>
                                                                {goal?.date}
                                                            </td>
                                                            <td>
                                                                {goal?.status}
                                                            </td>
                                                        </tr>
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                            }
                        </div>
                }
            </div>
        </div>
    );
};

export default GoalHistory;