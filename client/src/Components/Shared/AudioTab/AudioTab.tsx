import { RiErrorWarningLine, RiMusic2Fill } from "react-icons/ri";
import VideoError from "../../Ui/VideoError/VideoError";
import AudioPlayer from "../../Ui/AudioPlayer/AudioPlayer";
import { useGetAudiosQuery } from "../../../Redux/Feature/Api/BaseApi";
import TabLoading from "../../Ui/TabLoading/TabLoading";


const AudioTab = () => {
    const {data : audioList, isLoading, isError} = useGetAudiosQuery();

    return (
        <div>
            <div className="flex flex-row justify-between items-center w-full">
                <div className="flex items-center gap-x-1">
                    <RiMusic2Fill className="text-xs font-medium"></RiMusic2Fill>
                    <h4 className="text-gray-200 text-xs font-medium">Audio</h4>
                </div>
                <RiErrorWarningLine className="text-xs" />
            </div>
            <div className="my-3 max-h-72 overflow-y-auto audio-scroll">
                {
                    isLoading ? <TabLoading /> : isError ? <VideoError /> :
                        <div className="flex flex-col gap-y-1">
                            {
                                audioList?.map((audio) => {
                                    return <div key={audio?._id}>
                                        <h3 className="text-white">{audio.name}</h3>
                                        <AudioPlayer src={audio.audioUrl} />
                                    </div>
                                })
                            }
                        </div>
                }
            </div>
        </div>
    );
};

export default AudioTab;