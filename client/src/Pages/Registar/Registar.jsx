import { Steps } from "antd";
import { useContext } from "react";
import { StepsContext } from "../../ContextHandler/RegisterSteps/RegisterSteps";
import { Outlet } from "react-router-dom";


const Registar = () => {
    const {stepCount, stepItems} = useContext(StepsContext);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-400 to-blue-300 p-5">
            <div className="max-w-7xl mx-auto ">
                <div className="flex flex-col lg:flex-row gap-y-5 justify-between items-center md:w-4/5 mx-auto my-5">
                    <div className="lg:w-1/2 ">
                        <h2 className="text-white text-2xl lg:text-3xl font-medium md:font-bold mb-2">Welcome to Study Tracker! Tell us about yourself!</h2>
                        <p className="text-white text-sm md:text-base lg:text-lg font-medium">Tell us about yourself, so that we can track you personalized study  later on!</p>
                    </div>
                    <div className="lg:w-1/2 lg:pl-8">
                        <Steps
                        direction="horizontal"
                            current={stepCount}
                            size="small"
                            items={stepItems}
                        />
                    </div>
                </div>
                <div className="md:w-4/5 bg-white rounded-lg min-h-60 mx-auto">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default Registar;