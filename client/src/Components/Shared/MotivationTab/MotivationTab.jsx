import { useContext, useEffect, useReducer } from "react"
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic"
import { RiErrorWarningLine } from "react-icons/ri"
import VideoError from "../../Ui/VideoError/VideoError"
import { FaTextHeight } from "react-icons/fa6";
import { BgHandlerContext } from "../../../ContextHandler/BgHandle/BgHandle";

const initialData = {
    motivList: [],
    loading: true,
    error: ""
}
const reducer = (current, action) => {
    switch (action.type) {
        case 'success':
            return {
                motivList: action.data,
                loading: false,
                error: ''
            }
        case 'error':
            return {
                motivList: [],
                loading: false,
                error: 'error found'
            }
        default: return current
    }
}

const MotivationTab = () => {
    const [fetchState, dispatch] = useReducer(reducer, initialData);
    const axiosPublic = UseAxiosPublic();
    const {setMotivText} = useContext(BgHandlerContext)

    useEffect(() => {
        axiosPublic.get('/motivations')
            .then(({ data }) => {
                dispatch({ type: 'success', data })
            })
            .catch(() => {
                dispatch({ type: 'error' })
            })
    }, [])

    const setMotivationText = (txt)=>{
        setMotivText(txt)
    }

    return (
        <div>
            <div className="flex flex-row justify-between items-center w-full">
                <div className="flex items-center gap-x-1">
                    <FaTextHeight className="text-xs font-medium"></FaTextHeight>
                    <h4 className="text-gray-200 text-xs font-medium">Motivational Text</h4>
                </div>
                <RiErrorWarningLine className="text-xs" />
            </div>
            <div className="my-5 max-h-72 overflow-y-auto audio-scroll">
                {
                    fetchState.loading ? 'Loading...' : fetchState.error ? <VideoError /> :
                        <div className="flex flex-col gap-y-1">
                            {
                                fetchState?.motivList.map((motiv) => {
                                    return <div key={motiv?._id} onClick={()=>setMotivationText(motiv?.motivation)} className="bg-[#353434] p-2 rounded-md cursor-pointer">
                                        <h3 className="text-white text-xs">{motiv?.motivation}</h3>
                                       
                                    </div>
                                })
                            }
                        </div>
                }
            </div>
        </div>
    );
};

export default MotivationTab;