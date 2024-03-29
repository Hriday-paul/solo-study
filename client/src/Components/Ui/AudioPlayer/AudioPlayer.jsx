import { useRef, useState } from "react";
import { Slider } from "antd";
import { HiOutlineSpeakerWave, HiOutlineSpeakerXMark } from "react-icons/hi2";

const AudioPlayer = ({ src }) => {
    const audioRef = useRef(null);
    const [volume, setVolume] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const changeSound = (value) => {
        if (audioRef.current.paused) {
            audioRef.current.play();
        }
        audioRef.current.volume = value / 100
        setVolume(value / 100);
    }

    const soundChangeEnter = (value) => {
        if (value == 0) {
            setIsPlaying(false)
        }
        else {
            setIsPlaying(true)
        }
    }

    const handlePlay = () => {
        setIsPlaying(true);
        audioRef.current.play();
        audioRef.current.volume = volume;
    };

    const handlePause = () => {
        setIsPlaying(false);
        audioRef.current.pause();
    };

    return (
        <div className="flex flex-row items-center gap-x-2">
            <audio ref={audioRef} src={src} />
            {
                isPlaying ? <HiOutlineSpeakerWave onClick={handlePause} className="text-base cursor-pointer text-white"></HiOutlineSpeakerWave> : <HiOutlineSpeakerXMark onClick={handlePlay} className="text-base cursor-pointer text-white" />
            }
            <Slider className="w-full" onChangeComplete={soundChangeEnter} defaultValue={volume * 100} onChange={changeSound}></Slider>

        </div>
    );
};

export default AudioPlayer;