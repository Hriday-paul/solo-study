import VideoError from "../../Ui/VideoError/VideoError"
import TabLoading from "../../Ui/TabLoading/TabLoading";
import { useDispatch } from "react-redux";
import { useGetMotivatedTextQuery } from "../../../Redux/Feature/Api/BaseApi";
import { AppDispatch } from "../../../Redux/Store";
import { changeMotivText } from "../../../Redux/Feature/MotivatedTextSlice/MotivatedTextSlice";


const MotivatedTextContent = ({ tabIndx }: { tabIndx: number }) => {
    console.log(tabIndx);
    const { data: textList, isLoading, isError } = useGetMotivatedTextQuery({lang : tabIndx == 0 ? 'bangla' : 'english'});
    const dispatch = useDispatch<AppDispatch>();

    const setMotivationText = (txt: string) => {
        dispatch(changeMotivText(txt))
    }

    return (
        <div>
            <div className="my-5 max-h-72 overflow-y-auto audio-scroll">
                {
                    isLoading ? <TabLoading /> : isError ? <VideoError /> :
                        <div className="flex flex-col gap-y-1">
                            {
                                textList?.map((motiv) => {
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

export default MotivatedTextContent;