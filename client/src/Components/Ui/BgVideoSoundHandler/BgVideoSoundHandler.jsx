import { Slider } from "antd";
import { HiOutlineSpeakerWave, HiOutlineSpeakerXMark } from "react-icons/hi2";
import { BgHandlerContext } from "../../../ContextHandler/BgHandle/BgHandle";
import { useContext } from "react";


const BgVideoSoundHandler = () => {
    const { bgVideoSound, setBgVideoSound, mute_UnMute, isMute } = useContext(BgHandlerContext);

    const onChange = (checked) => {
        setBgVideoSound(checked);
    };

    return (
        <div className="flex flex-row gap-x-2 items-center">
            {
                !isMute ? <HiOutlineSpeakerWave onClick={mute_UnMute} className="text-lg cursor-pointer text-white"></HiOutlineSpeakerWave> : <HiOutlineSpeakerXMark onClick={mute_UnMute} className="text-lg cursor-pointer text-white" />
            }
            <Slider onChange={onChange} defaultValue={bgVideoSound} className="w-full" />
        </div>
    );
};

export default BgVideoSoundHandler;