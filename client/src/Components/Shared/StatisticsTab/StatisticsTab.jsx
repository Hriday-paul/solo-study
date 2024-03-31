import { RiErrorWarningLine } from "react-icons/ri";
import { IoStatsChart } from "react-icons/io5";
import { LuAlarmClock } from "react-icons/lu";
import StepChart from "../../Ui/StepChart/StepChart";

const StatisticsTab = () => {
    return (
        <div>
            <div className="flex flex-row justify-between items-center w-full">
                <div className="flex items-center gap-x-1">
                    <IoStatsChart className="text-xs font-medium"></IoStatsChart>
                    <h4 className="text-gray-200 text-xs font-medium">Statistics</h4>
                </div>
                <RiErrorWarningLine className="text-xs" />
            </div>
            <div className="my-4 p-3 bg-[#201C1B] rounded-lg flex flex-row gap-x-3 items-center ">
                <LuAlarmClock className="text-2xl text-white" />
                <div>
                    <h4 className="text-xs font-medium text-white text-center mb-1">{`Today's study time`}</h4>
                    <h5 className="text-sm font-bold text-white text-center">40 h</h5>
                </div>
            </div>
            <div className="my-4 bg-[#201C1B] rounded-lg">
                <StepChart />
            </div>
            <button className="mb-2 p-3 bg-[#1a1615] hover:bg-[#161412] rounded-lg w-full text-center">
                See more
            </button>
        </div>
    );
};

export default StatisticsTab;