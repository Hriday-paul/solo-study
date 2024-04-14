import { PulseLoader } from "react-spinners";


const TabLoading = () => {
    return (
        <div className="h-28 flex justify-center items-center ">
            <PulseLoader
                color="#ffffff"
                size={8}
                speedMultiplier={0.8}
            />
        </div>
    );
};

export default TabLoading;