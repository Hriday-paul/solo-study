import { useEffect, useReducer } from "react";
import { RiErrorWarningLine, RiMusic2Fill } from "react-icons/ri";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import VideoError from "../../Ui/VideoError/VideoError";
import AudioPlayer from "../../Ui/AudioPlayer/AudioPlayer";

const initialData = {
    audioList: [],
    loading: true,
    error: ""
}
const reducer = (current, action) => {
    switch (action.type) {
        case 'success':
            return {
                audioList: action.data,
                loading: false,
                error: ''
            }
        case 'error':
            return {
                audioList: [],
                loading: false,
                error: 'error found'
            }
        default: return current
    }
}

const AudioTab = () => {
    const [fetchState, dispatch] = useReducer(reducer, initialData);
    const axiosPublic = UseAxiosPublic();

    useEffect(() => {
        axiosPublic.get('/audios')
            .then(({ data }) => {
                dispatch({ type: 'success', data })
            })
            .catch(() => {
                dispatch({ type: 'error' })
            })
    }, [])

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
                    fetchState.loading ? 'Loading' : fetchState.error ? <VideoError /> :
                        <div className="flex flex-col gap-y-1">
                            {
                                fetchState?.audioList.map((audio) => {
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