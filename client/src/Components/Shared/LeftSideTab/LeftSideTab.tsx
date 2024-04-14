import { useReducer } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../Redux/Store";
import Counter from "../../Ui/Counter/Counter";
import SessionGoal from "../../Ui/SessionGoal/SessionGoal";

type initType = {
    personalTimerVisible: boolean;
    sessionGoalVisible: boolean;
}
const initialState: initType = {
    personalTimerVisible: true,
    sessionGoalVisible: false
}
const reducer = (currentState: initType, action: string) => {
    if (action == 'setPersonalTimer') {
        return { ...currentState, personalTimerVisible: !currentState.personalTimerVisible }
    }
    else if (action == 'setSessionGoal') {
        return { ...currentState, sessionGoalVisible: !currentState.sessionGoalVisible }
    }
    else {
        return currentState
    }
}

const LeftSideTab = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const userInfo = useSelector((state: RootState) => state.user);
    const navig = useNavigate();

    const clickPersonalTimer = () => {
        if (!(userInfo.email && userInfo.name)) {
            navig('/register')
        }
        else {
            dispatch('setPersonalTimer');
        }
    }

    const clicksessionGoal = () => {
        if (!(userInfo.email && userInfo.name)) {
            navig('/register')
        }
        else {
            dispatch('setSessionGoal')
        }
    }

    return (
        <div className="relative z-30 mt-8 flex text-xs text-white">
            <div onClick={clickPersonalTimer}>
                <div className="flex flex-row items-start justify-center hover:cursor-pointer bg-opacity-90 hover:bg-opacity-70 min-w-[112px] h-full py-2 px-3 bg-[#282322] rounded-lg transition-opacity duration-250 ease-in-out">
                    Personal timer
                </div>
            </div>
            <div onClick={clicksessionGoal} className="ml-5">
                <div className="flex flex-row items-start justify-center hover:cursor-pointer bg-opacity-90 hover:bg-opacity-70 min-w-[112px] h-full py-2 px-3 bg-[#282322] rounded-lg transition-opacity duration-250 ease-in-out">
                    Session goals
                </div>
            </div>

            <div className="draggable-container absolute top-[calc(48px+16px)] z-10">
                <div className={`${state.personalTimerVisible ? '' : 'hidden'}`}>
                    <div className="transition-opacity duration-250 ease-in-out w-[268px] backdrop-blur bg-[#282322] bg-opacity-80 p-6 pr-2 rounded-2xl mb-3 ">
                        <div className="path--fill-current mr-4 flex items-center justify-between">
                            <div className="w-full">
                                <Counter showHideTimer={clickPersonalTimer} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${state.sessionGoalVisible ? '' : 'hidden'}`}>
                    <div className="transition-opacity duration-250 ease-in-out w-[268px] backdrop-blur bg-[#282322] bg-opacity-80 p-6 pr-2 rounded-2xl mb-3 ">
                        <div className="path--fill-current mr-4 flex items-center justify-between">
                            <div className="w-full">
                                <SessionGoal showHideGoal={clicksessionGoal}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeftSideTab;