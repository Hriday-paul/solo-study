import { RiErrorWarningLine } from "react-icons/ri";
import { IoStatsChart } from "react-icons/io5";
import { LuAlarmClock } from "react-icons/lu";
import StepChart from "../../Ui/StepChart/StepChart";
import StatusDrawer from "../StatusDrawer/StatusDrawer";
import { useContext, useEffect, useReducer } from "react";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import { AuthContext } from "../../../ContextHandler/Authonicate/Authonicate";

const initialState = {
    loading: true,
    studyTimes: [],
    todayStudyTime : 0,
    error: ''
}

const reducer = (currentState, action) => {
    switch (action.type) {
        case 'success':
            return {
                loading: false,
                studyTimes: action?.data.counts,
                todayStudyTime : action?.data.todayStudy,
                error: ''
            }
        case 'error':
            return {
                loading: false,
                studyTimes: [],
                todayStudyTime : 0,
                error: 'Something wents wrong'
            }
        default:
            return currentState
    }
}

const StatisticsTab = () => {
    const [states, dispatch] = useReducer(reducer, initialState);
    const axiosPublic = UseAxiosPublic();
    const { userInfo } = useContext(AuthContext);

    const fetchData = () => {
        axiosPublic.get(`/previousDaysStudy/5?email=${'hridoychandrapaul.10@gmail.com'}`)
            .then(({ data }) => {
                dispatch({ type: 'success', data })
            })
            .catch(() => {
                dispatch({ type: 'error' })
            })
    }

    useEffect(() => {
        fetchData();
    }, [])

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
                    <h5 className="text-sm font-bold text-white text-center">{Math.floor(states?.todayStudyTime / 60)}h {Math.round(states?.todayStudyTime % 60)}min</h5>
                </div>
            </div>
            <div className="my-4 bg-[#201C1B] rounded-lg">
                <StepChart initWidth={180} data={states.studyTimes}/>
            </div>

            <StatusDrawer data={states.studyTimes}/>
        </div>
    );
};

export default StatisticsTab;