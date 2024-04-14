import { RiErrorWarningLine } from "react-icons/ri";
import { IoStatsChart } from "react-icons/io5";
import { LuAlarmClock } from "react-icons/lu";
import StepChart from "../../Ui/StepChart/StepChart";
import StatusDrawer from "../StatusDrawer/StatusDrawer";
import { useGetStatisTicsQuery } from "../../../Redux/Feature/Api/BaseApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
import TabLoading from "../../Ui/TabLoading/TabLoading";
import VideoError from "../../Ui/VideoError/VideoError";


const StatisticsTab = () => {
    const { email } = useSelector((state: RootState) => state.user);
    const { data, isLoading, isError } = useGetStatisTicsQuery({ day: 5, email });

    // console.log(data?.counts);

    return (
        <div>
            <div className="flex flex-row justify-between items-center w-full">
                <div className="flex items-center gap-x-1">
                    <IoStatsChart className="text-xs font-medium"></IoStatsChart>
                    <h4 className="text-gray-200 text-xs font-medium">Statistics</h4>
                </div>
                <RiErrorWarningLine className="text-xs" />
            </div>

            {
                isLoading ? <TabLoading /> : isError ? <VideoError /> :
                    <div>
                        <div className="my-4 p-3 bg-[#201C1B] rounded-lg flex flex-row gap-x-3 items-center ">
                            <LuAlarmClock className="text-2xl text-white" />
                            <div>
                                <h4 className="text-xs font-medium text-white text-center mb-1">{`Today's study time`}</h4>
                                <h5 className="text-sm font-bold text-white text-center">{Math.floor(data?.todayStudy || 0 / 60)}h {Math.round(data?.todayStudy || 0 % 60)}min</h5>
                            </div>
                        </div>
                        <div className="my-4 bg-[#201C1B] rounded-lg min-h-20">
                            {data?.counts && <StepChart initWidth={180} data={data?.counts} />}
                        </div>

                        {/* <StatusDrawer data={states.studyTimes} /> */}
                        {data?.counts && <StatusDrawer data={data.counts} />}
                    </div>
            }
        </div>
    );
};

export default StatisticsTab;