import { RiErrorWarningLine } from "react-icons/ri";

const VideoError = () => {
    return (
        <div className="flex justify-center items-center min-h-28">
            <div className="">
                <RiErrorWarningLine className="text-lg text-white mx-auto"/>
                <h5 className="text-xs text-white text-center">Something wrong !</h5>
            </div>
        </div>
    );
};

export default VideoError;