import { Slider } from "antd";
import { useContext } from "react";
import { HiOutlineSpeakerWave, HiOutlineSpeakerXMark } from "react-icons/hi2";
import { BgHandlerContext } from "../../../ContextHandler/BgHandler/BgHandle";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../Redux/Store";
import { changeVideoSound } from "../../../Redux/Feature/BgVideoSoundSlice/BgVideoSoundSlice";


const BgVideoSoundHandler = () => {
    const bgVideoSound = useSelector((state: RootState) => state.currentBgSound);
    const dispatch = useDispatch<AppDispatch>();
    const { mute_UnMute, isMute } = useContext(BgHandlerContext) || {};

    const onChange = (value : number) => {
        dispatch(changeVideoSound(value))
    };

    return (
        <div className="flex flex-row gap-x-2 items-center">
            {
                !isMute ? <HiOutlineSpeakerWave onClick={mute_UnMute} className="text-lg cursor-pointer text-white"></HiOutlineSpeakerWave> : <HiOutlineSpeakerXMark onClick={mute_UnMute} className="text-lg cursor-pointer text-white" />
            }
            <Slider onChange={onChange} defaultValue={bgVideoSound.currentSound} className="w-full" />
        </div>
    );
};

export default BgVideoSoundHandler;