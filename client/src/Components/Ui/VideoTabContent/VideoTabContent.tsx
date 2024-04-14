import VideoLoading from "../VideoLoading/VideoLoading";
import VideoError from "../VideoError/VideoError";
import { useGetVideoByTabQuery } from "../../../Redux/Feature/Api/BaseApi";
import { useContext } from "react";
import { BgHandlerContext } from "../../../ContextHandler/BgHandler/BgHandle";
import BgVideoSoundHandler from "../BgVideoSoundHandler/BgVideoSoundHandler";


const VideoTabContent = ({ tabIndx }: { tabIndx: number }) => {
    const { changeVideo } = useContext(BgHandlerContext) || {};
    const { data, isLoading, isError } = useGetVideoByTabQuery(tabIndx);

    if (!changeVideo) {
        console.log('context is not found');
        return <div>Context is not available</div>;
    }

    const videoChanger = (vid : string)=>{
        changeVideo(vid);
    }

    return (
        <div>
            {
                isLoading ? <VideoLoading /> : isError ? <VideoError /> :
                    <div>
                        <div className="grid grid-cols-3 gap-3 my-3">
                            {
                                data?.map((item) => {
                                    return <div onClick={() => videoChanger(item?.video)} key={item._id} className="cursor-pointer">
                                        <img loading="lazy" className="rounded-lg" src={item?.thumb} alt="thumbnail image" />
                                    </div>
                                })
                            }
                        </div>
                        {
                            data && data.length > 0 && <BgVideoSoundHandler/>
                        }
                    </div>

            }
        </div>
    );
};

export default VideoTabContent;