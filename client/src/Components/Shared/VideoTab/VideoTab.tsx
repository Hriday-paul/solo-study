import { RiErrorWarningLine } from "react-icons/ri";
import { HiMiniPhoto } from "react-icons/hi2";
import VideoInnerTab from "../../Ui/VideoInnerTab/VideoInnerTab";


const VideoTab = () => {

    return (
        <div className="w-full">
            <div className="flex flex-row justify-between items-center">
                <div className="flex items-center gap-x-1">
                    <HiMiniPhoto className="text-xs font-medium"></HiMiniPhoto>
                    <h4 className="text-gray-200 text-xs font-medium">Background</h4>
                </div>
                <RiErrorWarningLine className="text-xs" />
            </div>
            <div className="my-3">
                <VideoInnerTab />
            </div>
            

        </div>
    );
};

export default VideoTab;