import { useState, useEffect, useCallback, useReducer, useRef, useContext } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { MdOutlineAccessTime } from "react-icons/md";
import { RiErrorWarningLine } from "react-icons/ri";
import { IoPause, IoStop, IoPlay } from "react-icons/io5";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import { AuthContext } from "../../../ContextHandler/Authonicate/Authonicate";

const initialState = {
    displayShort: false,
    count: { hour: 1, minute: 0, second: 0 },
    initCount: { hour: 1, minute: 0, second: 0 },
    breakCount: { hour: 0, minute: 10, second: 0 },
    initBreakCount: { hour: 0, minute: 10, second: 0 },
    modal: false
}

const reducer = (currentstate, action) => {
    switch (action.type) {
        case 'setDisplayShort':
            return { ...currentstate, displayShort: action.status };
        case 'setCount':
            return { ...currentstate, count: action.allCountTimes, };
        case 'setInitCount':
            return { ...currentstate, count: action.allCountTimes, initCount: action.allCountTimes };
        case 'setBreakCount':
            return { ...currentstate, breakCount: action.allBreakTimes, };
        case 'setInitBreakCount':
            return { ...currentstate, breakCount: action.allBreakTimes, initBreakCount: action.allBreakTimes }
        case 'setModal':
            return { ...currentstate, modal: !currentstate.modal, };
    }
}

const Counter = () => {
    const axiosPublic = UseAxiosPublic();
    const { userInfo } = useContext(AuthContext)
    const [states, dispatch] = useReducer(reducer, initialState);
    const [isRunning, setIsRunning] = useState({
        focusTime: false,
        breakTime: false,
    });
    const statesRef = useRef(states);

    useEffect(() => {
        const unloadFun = (e) => {
            e.preventDefault();
            const initMinute = (statesRef.current.initCount.hour * 60) + (statesRef.current.initCount.minute) + (statesRef.current.initCount.second / 60);

            const useLessTime = (statesRef.current.count.hour * 60) + (statesRef.current.count.minute) + (statesRef.current.count.second / 60);

            const initBreakMinute = (statesRef.current.initBreakCount.hour * 60) + (statesRef.current.initBreakCount.minute) + (statesRef.current.initBreakCount.second / 60);

            const useLessBreakMin = (statesRef.current.breakCount.hour * 60) + (statesRef.current.breakCount.minute) + (statesRef.current.breakCount.second / 60);

            let breakMin = 0;
            if (initBreakMinute != useLessBreakMin) {
                breakMin = Math.ceil(initBreakMinute - useLessBreakMin);
            }

            const studyTime = Math.ceil(initMinute - useLessTime);

            if (breakMin != 0 || studyTime != 0) {
                axiosPublic.put('/updateStudy', {
                    email: userInfo.email,
                    date: `${new Date().getFullYear()}-${(new Date().getMonth() + 1)}-${new Date().getDate()}`,
                    studyTime,
                    breakTime: breakMin
                })
            }
            return e.returnValue = ''
        }

        window.addEventListener('beforeunload', unloadFun);
        return () => window.removeEventListener('beforeunload', unloadFun);
    }, [])

    useEffect(() => {
        let intervalId;
        if (isRunning.focusTime) {
            statesRef.current = states;
            // setDisplayShort(true);
            dispatch({ type: 'setDisplayShort', status: true })
            intervalId = setInterval(() => {
                let newCount = { ...states.count };
                let totalSeconds = newCount.hour * 3600 + newCount.minute * 60 + newCount.second;

                if (totalSeconds > 0) {
                    totalSeconds--;
                    newCount.hour = Math.floor(totalSeconds / 3600);
                    newCount.minute = Math.floor((totalSeconds % 3600) / 60);
                    newCount.second = totalSeconds % 60;
                } else {
                    setIsRunning({
                        focusTime: false,
                        breakTime: true,
                    }); // Stop timer when time is up
                }
                dispatch({ type: 'setCount', allCountTimes: newCount })
            }, 1000);
        } else {
            clearInterval(intervalId);
        }

        return () => clearInterval(intervalId); // Cleanup interval on component unmount and state change
    }, [isRunning, states.count]);

    const handleStartStop = useCallback(() => {
        setIsRunning(prevCountState => {
            return { focusTime: !prevCountState.focusTime, breakTime: !prevCountState.breakTime }
        });
    }, []);

    const handleReset = () => {
        // setDisplayShort(false);
        dispatch({ type: 'setDisplayShort', status: false })
        // setCount({ hour: 1, minute: 0, second: 0 });
        dispatch({ type: 'setInitCount', allCountTimes: { hour: 1, minute: 0, second: 0 } })
        setIsRunning({
            focusTime: false,
            breakTime: false,
        });
    };

    const countIncrement = useCallback(() => {
        const incrementedMinute = states.count.minute + 5 < 60 ? states.count.minute + 5 : 0;
        const incrementedHour = states.count.minute + 5 >= 60 ? states.count.hour + 1 : states.count.hour;
        if (!(states.count.hour == 2 && states.count.minute == 0)) {
            // setCount({ ...count, hour: incrementedHour, minute: incrementedMinute })
            dispatch({ type: 'setInitCount', allCountTimes: { ...states.count, hour: incrementedHour, minute: incrementedMinute } })
        }
    }, [states.count])

    const breakCountIncrement = useCallback(() => {
        const incrementedMinute = states.breakCount.minute + 1 < 60 ? states.breakCount.minute + 1 : 0;
        const incrementedHour = states.breakCount.minute + 1 >= 60 ? states.breakCount.hour + 1 : states.breakCount.hour;
        if (!(states.breakCount.hour == 1 && states.breakCount.minute == 0)) {
            // setBreakCount({ ...breakCount, hour: incrementedHour, minute: incrementedMinute })
            dispatch({ type: 'setInitBreakCount', allBreakTimes: { ...states.breakCount, hour: incrementedHour, minute: incrementedMinute } })
        }
    }, [states.breakCount])

    const countDecrement = useCallback(() => {
        const decrementedMinute = (states.count.minute - 5 == 0) ? 0 : (states.count.minute - 5 < 0) ? 55 : states.count.minute - 5;

        const decrementedHour = (states.count.minute - 5 == 0) ? states.count.hour : (states.count.minute - 5 < 0) ? states.count.hour - 1 : states.count.hour;

        if (!(states.count.hour == 0 && states.count.minute == 10)) {
            // setCount({ ...count, hour: decrementedHour, minute: decrementedMinute })
            dispatch({ type: 'setInitCount', allCountTimes: { ...states.count, hour: decrementedHour, minute: decrementedMinute } })
        }
    }, [states.count])

    const breakCountDecrement = useCallback(() => {
        const decrementedMinute = (states.breakCount.minute - 1 == 0) ? 0 : (states.breakCount.minute - 1 < 0) ? 59 : states.breakCount.minute - 1;

        const decrementedHour = (states.breakCount.minute - 1 == 0) ? states.breakCount.hour : (states.breakCount.minute - 1 < 0) ? states.breakCount.hour - 1 : states.breakCount.hour;

        if (!(states.breakCount.hour == 0 && states.breakCount.minute == 1)) {
            // setBreakCount({ ...breakCount, hour: decrementedHour, minute: decrementedMinute })
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
                <RiErrorWarningLine className="text-sm" />
            </div>

            {/* timer */}
            {
                !states.displayShort ? <div>
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

                    <button onClick={handleStartStop} className="p-2 bg-transparent border border-gray-200 rounded-lg text-center w-full mt-5 hover:bg-gray-200 hover:text-black font-medium">
                        Start Timer
                    </button>

                </div> :

                    <div className="flex flex-row justify-between items-center">
                        <span className="text-2xl font-bold leading-[38px] tracking-[2px] text-white">
                            {(states.count.hour < 10 ? '0' + states.count.hour : states.count.hour) + ':'}
                            {(states.count.minute < 10 ? '0' + states.count.minute : states.count.minute) + ':'}
                            {states.count.second < 10 ? '0' + states.count.second : states.count.second}
                        </span>
                        <div className="flex items-center">
                            <button onClick={handleReset} className="p-2 hover:bg-[#4e4749] duration-75 rounded"><IoStop className="text-base text-white" /></button>
                            {
                                isRunning.focusTime ? <button onClick={handleStartStop} className="p-2 hover:bg-[#4e4749] duration-75 rounded"><IoPause className="text-base text-white" /></button> :

                                    <button onClick={handleStartStop} className="p-2 hover:bg-[#4e4749] duration-75 rounded"><IoPlay className="text-base text-white" /></button>
                            }

                        </div>
                    </div>
            }

        </div>
    );
};

export default Counter;
