import { GoGoal } from "react-icons/go";
import { RiErrorWarningLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { FiPlus } from "react-icons/fi";

const SessionGoal = () => {
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
            <div className="flex gap-x-3 justify-between">
                <input type="text" className="text-white border border-gray-200 bg-transparent py-2 px-2.5 rounded-2xl outline-0 focus:outline-0 w-full" placeholder="type a goal..." />
                <button disabled className="p-2 cursor-not-allowed rounded-lg bg-[#1a1818] border border-gray-500">
                    <FiPlus className="text-base text-white" />
                </button>
            </div>
            <div className="p-3 bg-[#1a1818] mt-5 rounded-lg bg-opacity-80 flex flex-row items-center justify-center">
                <div className="border-r border-r-gray-300 w-1/2">
                    <h4 className="text-center text-3xl font-bold">2</h4>
                    <p className="text-sm text-center">Open</p>
                </div>
                <div className="w-1/2">
                    <h4 className="text-center text-3xl font-bold text-green-600">3</h4>
                    <p className="text-sm text-center">Complete</p>
                </div>
            </div>
        </div>
    );
};

export default SessionGoal;