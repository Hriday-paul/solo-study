import { useState } from "react";
import { Drawer } from 'antd';
import TodayStudyHistory from "../../Ui/TodayStudyHistory/TodayStudyHistory";
import GoalHistory from "../../Ui/GoalHistory/GoalHistory";
import LineChart from "../../Ui/LineChart/LineChart";

const StatusDrawer = ({data} : {data : {[key : string] : number}}) => {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <button onClick={showDrawer} className="mb-2 p-3 bg-[#1a1615] hover:bg-[#161412] rounded-lg w-full text-center">
                See more
            </button>
            <Drawer style={{ backgroundColor: '#1A1615', color: 'white' }} width={30000} title="Your personal study statistics" onClose={onClose} open={open}>
                <div className="flex flex-col gap-5 lg:flex-row">
                    <div className="w-full lg:w-2/5">
                        <div className="bg-[#0c0b0a] p-5 shadow-lg">
                            <h3 className="text-sm">Goal History</h3>
                            <GoalHistory />
                        </div>
                    </div>
                    <div className="w-full lg:w-3/5 flex flex-col md:flex-row gap-5">
                        <div className="bg-[#0c0b0a] p-5 shadow-lg">
                            <h3 className="text-sm">Activity By Day</h3>
                            <LineChart data={data} initWidth={0}/>
                        </div>
                        <div className="bg-[#0c0b0a] p-5 shadow-lg">
                            <h3 className="text-sm">Today study activity</h3>
                            <TodayStudyHistory />
                        </div>
                    </div>
                </div>
            </Drawer>
        </div>
        
    );
};

export default StatusDrawer;