import { useContext, useEffect, useReducer } from "react";
import UseAxiosPublic from '../../../Hooks/UseAxiosPublic'
import VideoLoading from "../VideoLoading/VideoLoading";
import VideoError from "../VideoError/VideoError";
import { BgHandlerContext } from "../../../ContextHandler/BgHandle/BgHandle";
import BgVideoSoundHandler from "../BgVideoSoundHandler/BgVideoSoundHandler";

const initilaData = {
    loading: true,
    data: [],
    error: ''
}
const reducer = (currentState, action) => {
    switch (action.type) {
        case 'success':
            return {
                loading: false,
                data: action.data,
                error: ''
            }
        case 'error':
            return {
                loading: false,
                data: [],
                error: 'Error found'
            }
        default: return currentState
    }
}

const VideoTabContent = ({ tabIndx }) => {
    const { changeVideo } = useContext(BgHandlerContext);
    const [fetchingState, dispatch] = useReducer(reducer, initilaData);
    const axiosPublic = UseAxiosPublic();

    useEffect(() => {
        axiosPublic.get(`/getVideoByTab/${tabIndx}`)
            .then(({ data }) => {
                dispatch({ type: 'success', data })
            })
            .catch(() => {
                dispatch({ type: 'error' })
            })
    }, [])

    return (
        <div>
            {
                fetchingState?.loading ? <VideoLoading /> : fetchingState?.error ? <VideoError /> :
                    <div>
                        <div className="grid grid-cols-3 gap-3 my-3">
                            {
                                fetchingState?.data?.map((item) => {
                                    return <div onClick={() => changeVideo(item?.video)} key={item._id} className="cursor-pointer">
                                        <img loading="lazy" className="rounded-lg" src={item?.thumb} alt="thumbnail image" />
                                    </div>
                                })
                            }
                        </div>
                        {
                            fetchingState?.data.length > 0 && <BgVideoSoundHandler/>
                        }
                    </div>

            }
        </div>
    );
};

export default VideoTabContent;