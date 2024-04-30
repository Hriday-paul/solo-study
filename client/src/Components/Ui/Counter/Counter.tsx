import { useState, useEffect, useCallback, useReducer, useRef } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { MdOutlineAccessTime } from "react-icons/md";
import { RiErrorWarningLine } from "react-icons/ri";
import { IoPause, IoStop, IoPlay } from "react-icons/io5";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
import { RxCross2 } from "react-icons/rx";
import { useAddStudyTimeMutation } from "../../../Redux/Feature/Api/BaseApi";

interface initialStateType {
    displayShort: boolean;
    count: { hour: number; minute: number; second: number };
    initCount: { hour: number; minute: number; second: number };
    breakCount: { hour: number; minute: number; second: number };
    initBreakCount: { hour: number; minute: number; second: number };
    modal: boolean;
}

const initialState: initialStateType = {
    displayShort: false,
    count: { hour: 1, minute: 0, second: 0 },
    initCount: { hour: 1, minute: 0, second: 0 },
    breakCount: { hour: 0, minute: 10, second: 0 },
    initBreakCount: { hour: 0, minute: 10, second: 0 },
    modal: false
}

type actionType = {
    type: string;
    status?: boolean;
    allCountTimes?: { hour: number; minute: number; second: number };
    allBreakTimes?: { hour: number; minute: number; second: number };
};

const reducer = (currentState: initialStateType, action: actionType): initialStateType => {
    switch (action.type) {
        case 'setDisplayShort':
            return { ...currentState, displayShort: action.status || !currentState.displayShort };
        case 'setCount':
            return { ...currentState, count: action.allCountTimes || currentState.count };
        case 'setInitCount':
            return { ...currentState, count: action.allCountTimes || currentState.count, initCount: action.allCountTimes || currentState.count };
        case 'setBreakCount':
            return { ...currentState, breakCount: action.allBreakTimes || currentState.breakCount };
        case 'setInitBreakCount':
            return { ...currentState, breakCount: action.allBreakTimes || currentState.breakCount, initBreakCount: action.allBreakTimes || currentState.breakCount };
        case 'setModal':
            return { ...currentState, modal: !currentState.modal };
        default:
            return currentState;
    }
}

const Counter = ({ showHideTimer }: { showHideTimer: () => void }) => {
    const {email} = useSelector((state: RootState) => state.user)
    const [states, dispatch] = useReducer(reducer, initialState);
    const [addStudyTime] = useAddStudyTimeMutation();
    const [isRunning, setIsRunning] = useState({
        focusTime: false,
        breakTime: false,
    });
    const statesRef = useRef(states);
    let usesStudyTime: number = 0;
    let usesBreakTime: number = 0;

    const postStudyTime = (studyTime: number, breakTime: number): void => {
        const date = `${new Date().getFullYear()}-${(new Date().getMonth() + 1)}-${new Date().getDate()}`
        if (breakTime > 0 || studyTime > 0) {
            addStudyTime({ email, date, studyTime, breakTime })
        }
    }

    // // update study & break time in server, when user reload browser or close tab. This code is work when study time and break time is not 0
    useEffect(() => {
        const unloadFun = (e: any) => {
            e.preventDefault();
            const initMinute: number = (statesRef.current.initCount.hour * 60) + (statesRef.current.initCount.minute) + (statesRef.current.initCount.second / 60);

            const useLessTime: number = (statesRef.current.count.hour * 60) + (statesRef.current.count.minute) + (statesRef.current.count.second / 60);

            const initBreakMinute: number = (statesRef.current.initBreakCount.hour * 60) + (statesRef.current.initBreakCount.minute) + (statesRef.current.initBreakCount.second / 60);

            const useLessBreakMin: number = (statesRef.current.breakCount.hour * 60) + (statesRef.current.breakCount.minute) + (statesRef.current.breakCount.second / 60);

            let breakMin: number = 0;
            if (initBreakMinute != useLessBreakMin) {
                breakMin = initBreakMinute - useLessBreakMin;
            }

            const studyTime: number = initMinute - useLessTime;

            postStudyTime((studyTime - usesStudyTime), (breakMin - usesBreakTime));

            // eslint-disable-next-line react-hooks/exhaustive-deps
            usesStudyTime += studyTime;
            // eslint-disable-next-line react-hooks/exhaustive-deps
            usesBreakTime += breakMin;

            return e.returnValue = '';
        }
        window.addEventListener('beforeunload', unloadFun);
        return () => window.removeEventListener('beforeunload', unloadFun);
    }, []);

    useEffect(() => {
        let intervalId: any;
        if (isRunning.focusTime || isRunning.breakTime) {
            statesRef.current = states;

            dispatch({ type: 'setDisplayShort', status: true });

            intervalId = setInterval(() => {

                type countType = { hour: number, minute: number, second: number }

                const newCount: countType = { ...states.count };
                let totalSeconds: number = newCount.hour * 3600 + newCount.minute * 60 + newCount.second;

                const breakCount: countType = { ...states.breakCount };
                let totalBreakSeconds: number = breakCount.hour * 3600 + breakCount.minute * 60 + breakCount.second;


                if (totalSeconds > 0 && isRunning.focusTime) {
                    totalSeconds--;
                    newCount.hour = Math.floor(totalSeconds / 3600);
                    newCount.minute = Math.floor((totalSeconds % 3600) / 60);
                    newCount.second = totalSeconds % 60;
                    dispatch({ type: 'setCount', allCountTimes: newCount });
                    if (totalSeconds == 0) {
                        const studyMinute = statesRef.current.initCount.hour * 60;
                        // update study time in server, when timer is finish
                        postStudyTime(studyMinute, 0);
                        setIsRunning({ focusTime: false, breakTime: true });
                    }
                }

                else if (totalSeconds <= 0 && totalBreakSeconds > 0 && isRunning.breakTime) {
                    totalBreakSeconds--;
                    breakCount.hour = Math.floor(totalBreakSeconds / 3600);
                    breakCount.minute = Math.floor((totalBreakSeconds % 3600) / 60);
                    breakCount.second = totalBreakSeconds % 60;
                    dispatch({ type: 'setBreakCount', allBreakTimes: breakCount });
                    if (totalBreakSeconds == 0) {
                        // update break time in server, when break time is finish
                        const breakMinute = statesRef.current.initBreakCount.hour * 60;
                        postStudyTime(0, breakMinute);

                    }
                }

                else {
                    setIsRunning({
                        focusTime: false,
                        breakTime: false,
                    }); // Stop timer when time is up
                }

            }, 1000);
        }
        else {
            clearInterval(intervalId);
        }

        return () => clearInterval(intervalId); // Cleanup interval on component unmount and state change
    }, [isRunning, states.count, states.breakCount]);

    // start times
    const handleStart = useCallback(() => {
        setIsRunning({ focusTime: true, breakTime: false });
    }, []);

    // pause times
    const handlePause = () => {
        setIsRunning({ focusTime: false, breakTime: false });
    };

    // start times, when timer pause mode
    const handleplayPause = () => {
        setIsRunning({ focusTime: true, breakTime: false });
    }

    // reset timer, 
    const handleReset = () => {

        const initMinute: number = (statesRef.current.initCount.hour * 60) + (statesRef.current.initCount.minute) + (statesRef.current.initCount.second / 60);

        const useLessTime: number = (statesRef.current.count.hour * 60) + (statesRef.current.count.minute) + (statesRef.current.count.second / 60);

        const initBreakMinute: number = (statesRef.current.initBreakCount.hour * 60) + (statesRef.current.initBreakCount.minute) + (statesRef.current.initBreakCount.second / 60);

        const useLessBreakMin: number = (statesRef.current.breakCount.hour * 60) + (statesRef.current.breakCount.minute) + (statesRef.current.breakCount.second / 60);

        let breakMin: number = 0;
        if (initBreakMinute != useLessBreakMin) {
            breakMin = initBreakMinute - useLessBreakMin;
        }

        const studyTime: number = initMinute - useLessTime;

        postStudyTime(studyTime, breakMin);

        dispatch({ type: 'setDisplayShort', status: false })
        dispatch({ type: 'setInitCount', allCountTimes: { hour: 1, minute: 0, second: 0 } })
        dispatch({ type: 'setBreakCount', allBreakTimes: { hour: 0, minute: 1, second: 0 } })
        setIsRunning({
            focusTime: false,
            breakTime: false,
        });
    };

    // increment study time counter hour, minute & second
    const countIncrement = useCallback(() => {
        const incrementedMinute = states.count.minute + 5 < 60 ? states.count.minute + 5 : 0;
        const incrementedHour = states.count.minute + 5 >= 60 ? states.count.hour + 1 : states.count.hour;
        // increment study time count timer by 5 when, hour less then 2
        if (!(states.count.hour == 2 && states.count.minute == 0)) {
            dispatch({ type: 'setInitCount', allCountTimes: { ...states.count, hour: incrementedHour, minute: incrementedMinute } })
        }
    }, [states.count])

    // increment break time counter hour, minute & second
    const breakCountIncrement = useCallback(() => {
        const incrementedMinute = states.breakCount.minute + 1 < 60 ? states.breakCount.minute + 1 : 0;
        const incrementedHour = states.breakCount.minute + 1 >= 60 ? states.breakCount.hour + 1 : states.breakCount.hour;
        // increment break timer by 1 when, hour less then 1
        if (!(states.breakCount.hour == 1 && states.breakCount.minute == 0)) {
            dispatch({ type: 'setInitBreakCount', allBreakTimes: { ...states.breakCount, hour: incrementedHour, minute: incrementedMinute } })
        }
    }, [states.breakCount])

    // decrement study time counter hour, minute & second
    const countDecrement = useCallback(() => {
        const decrementedMinute = (states.count.minute - 5 == 0) ? 0 : (states.count.minute - 5 < 0) ? 55 : states.count.minute - 5;

        const decrementedHour = (states.count.minute - 5 == 0) ? states.count.hour : (states.count.minute - 5 < 0) ? states.count.hour - 1 : states.count.hour;
        // decrement study timer by 5 when, hour & minute grater then 0
        if (!(states.count.hour == 0 && states.count.minute == 5)) {
            dispatch({ type: 'setInitCount', allCountTimes: { ...states.count, hour: decrementedHour, minute: decrementedMinute } })
        }
    }, [states.count])

    // decrement break time counter hour, minute & second
    const breakCountDecrement = useCallback(() => {
        const decrementedMinute = (states.breakCount.minute - 1 == 0) ? 0 : (states.breakCount.minute - 1 < 0) ? 59 : states.breakCount.minute - 1;

        const decrementedHour = (states.breakCount.minute - 1 == 0) ? states.breakCount.hour : (states.breakCount.minute - 1 < 0) ? states.breakCount.hour - 1 : states.breakCount.hour;

        // decrement break timer by 1 when, hour & minute grater then 0
        if (!(states.breakCount.hour == 0 && states.breakCount.minute == 1)) {
            dispatch({ type: 'setInitBreakCount', allBreakTimes: { ...states.breakCount, hour: decrementedHour, minute: decrementedMinute } })
        }
    }, [states.breakCount])

    return (
        <div>
            <div className="flex flex-row justify-between items-center mb-3">
                <div className="flex items-center gap-x-2">
                    <MdOutlineAccessTime className="text-sm"></MdOutlineAccessTime>
                    <h4 className="text-gray-200 text-sm">Personal timer</h4>
                </div>
                <div className="flex gap-x-3 items-center">
                    <RiErrorWarningLine className="text-sm" />
                    <RxCross2 onClick={showHideTimer} className="text-sm cursor-pointer" />
                </div>
            </div>

            {/* timer */}
            {
                !states.displayShort ?
                    <div>
                        <div className="w-full">
                            <div className="mb-1 text-center text-xs">
                                Focus time (min)
                            </div>
                            <div className="flex justify-between">
                                <button onClick={countDecrement} className="hover:opacity-80"><FaMinus className="text-white text-base" /></button>
                                <div className="rounded-xl bg-[#0C0403] px-3">
                                    <span className="text-[2rem] font-bold leading-[38px] tracking-[2px] text-white">
                                        {(states.count.hour < 10 ? '0' + states.count.hour : states.count.hour) + ':'}
                                        {(states.count.minute < 10 ? '0' + states.count.minute : states.count.minute) + ':'}
                                        {states.count.second < 10 ? '0' + states.count.second : states.count.second}
                                    </span>
                                </div>
                                <button onClick={countIncrement} className="hover:opacity-80"><FaPlus className="text-white text-base" /></button>
                            </div>
                        </div>

                        <div className="w-full mt-2">
                            <div className="mb-1 text-center text-xs">
                                Break time (min)
                            </div>
                            <div className="flex justify-between">
                                <button onClick={breakCountDecrement} className="hover:opacity-80"><FaMinus className="text-white text-base" /></button>
                                <div className="rounded-xl bg-[#0C0403] px-3">
                                    <span className="text-[2rem] font-bold leading-[38px] tracking-[2px] text-white">
                                        {(states.breakCount.hour < 10 ? '0' + states.breakCount.hour : states.breakCount.hour) + ':'}
                                        {(states.breakCount.minute < 10 ? '0' + states.breakCount.minute : states.breakCount.minute) + ':'}
                                        {states.breakCount.second < 10 ? '0' + states.breakCount.second : states.breakCount.second}
                                    </span>
                                </div>
                                <button onClick={breakCountIncrement} className="hover:opacity-80"><FaPlus className="text-white text-base" /></button>
                            </div>
                        </div>

                        <button onClick={handleStart} className="p-2 bg-transparent border border-gray-200 rounded-lg text-center w-full mt-5 hover:bg-gray-200 hover:text-black font-medium">
                            Start Timer
                        </button>

                    </div>
                    :
                    isRunning.breakTime ?
                        <div className="flex flex-row justify-between items-center">
                            <h4 className="mb-1 text-center text-xs">
                                Break time is running
                            </h4>
                            <span className="text-2xl font-bold leading-[38px] tracking-[2px] text-white">
                                {(states.breakCount.hour < 10 ? '0' + states.breakCount.hour : states.breakCount.hour) + ':'}
                                {(states.breakCount.minute < 10 ? '0' + states.breakCount.minute : states.breakCount.minute) + ':'}
                                {states.breakCount.second < 10 ? '0' + states.breakCount.second : states.breakCount.second}
                            </span>

                        </div>
                        :
                        <div className="flex flex-row justify-between items-center">
                            <span className="text-2xl font-bold leading-[38px] tracking-[2px] text-white">
                                {(states.count.hour < 10 ? '0' + states.count.hour : states.count.hour) + ':'}
                                {(states.count.minute < 10 ? '0' + states.count.minute : states.count.minute) + ':'}
                                {states.count.second < 10 ? '0' + states.count.second : states.count.second}
                            </span>
                            <div className="flex items-center">
                                <button onClick={handleReset} className="p-2 hover:bg-[#4e4749] duration-75 rounded"><IoStop className="text-base text-white" /></button>
                                {
                                    isRunning.focusTime ? <button onClick={handlePause} className="p-2 hover:bg-[#4e4749] duration-75 rounded"><IoPause className="text-base text-white" /></button> :

                                        <button onClick={handleplayPause} className="p-2 hover:bg-[#4e4749] duration-75 rounded"><IoPlay className="text-base text-white" /></button>
                                }

                            </div>
                        </div>
            }

        </div>
    );
};

export default Counter;
