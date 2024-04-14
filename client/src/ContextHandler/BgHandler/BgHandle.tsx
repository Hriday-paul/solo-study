import React, { createContext, useState } from "react";

interface BgContextProps {
    setCurrentVideo: React.Dispatch<React.SetStateAction<any>>;
    currentVideo: any;
    changeVideo: (value: string) => void;
    mute_UnMute: () => void;
    isMute: boolean;
    setMute: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BgHandlerContext = createContext<BgContextProps | null>(null);

type BgHandleProps = {
    children: React.ReactNode;
};

const BgHandle = ({ children }: BgHandleProps) => {
    const [currentVideo, setCurrentVideo] = useState<any>(null);
    const [isMute, setMute] = useState<boolean>(true);

    async function setNewVideo(videoId: string) {
        // Your setNewVideo implementation
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

    const changeVideo = async (vId: string) => {
        // Your changeVideo implementation
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
        // Your mute_UnMute implementation
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

    const allInfo: BgContextProps = {
        setCurrentVideo,
        currentVideo,
        changeVideo,
        mute_UnMute,
        isMute,
        setMute,
    };

    return (
        <BgHandlerContext.Provider value={allInfo}>
            {children}
        </BgHandlerContext.Provider>
    );
};

export default BgHandle;
