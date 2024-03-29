import { createContext, useState } from "react";

export const BgHandlerContext = createContext(null);

const BgHandle = ({ children }) => {
    const [currentVideo, setCurrentVideo] = useState(null);
    const [bgVideoSound, setBgVideoSound] = useState(20);
    const [isMute, setMute] = useState(true);
    const [motivText, setMotivText] = useState('নীরবে পরিশ্রম করো। তোমার সাফল্য শোরগোল করবেই।')

    async function setNewVideo(videoId) {
        //const videoId = getYouTubeVideoId(url);
        if (currentVideo && typeof currentVideo.cueVideoById === 'function') {
            const playerVars = {
                'autoplay': 1,
                'mute': 1,
                'controls': 0,
                'autohide': 1,
                'origin': 'http://localhost:5173'// Set the origin if required
            };
            const newVideo = await currentVideo.cueVideoById({ videoId, playerVars });
            setCurrentVideo(newVideo)
        } else {
            console.error('Player not initialized or cueVideoById method not available');
        }
    }

    const changeVideo = async (vId) => {
        await setNewVideo(vId);
        setTimeout(() => {
            if (currentVideo) {
                currentVideo.playVideo();
            } else {
                console.error('Video player not available.');
            }
        }, 500);
    }

    const mute_UnMute = () => {
        if (currentVideo) {
            if (currentVideo.isMuted()) {
                currentVideo.unMute();
                setMute(false)
            } else {
                currentVideo.mute();
                setMute(true)
            }
        }
    }

    const allInfo = {
        bgVideoSound,
        setBgVideoSound,
        setCurrentVideo,
        currentVideo,
        changeVideo,
        mute_UnMute,
        isMute,
        setMute,
        motivText,
        setMotivText
    }

    return (
        <BgHandlerContext.Provider value={allInfo}>
            {children}
        </BgHandlerContext.Provider>
    );
};

export default BgHandle;