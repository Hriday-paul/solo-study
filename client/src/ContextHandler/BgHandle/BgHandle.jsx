import { createContext, useState } from "react";

export const BgHandlerContext = createContext(null);

const BgHandle = ({children}) => {
    const [bgVideoSrc, setBgVideoSrc] = useState('https://www.youtube.com/embed/UWBfTjgqnGw?start=60&loop=1&playlist=UWBfTjgqnGw&showinfo=0&controls=0&disablekb=0&fs=0&rel=0&iv_load_policy=3&autoplay=1&mute=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=https%3A%2F%2Fapp.studytogether.com&widgetid=1');


    const allInfo = {
        bgVideoSrc, 
        setBgVideoSrc
    }
    return (
        <BgHandlerContext.Provider value={allInfo}>
            {children}
        </BgHandlerContext.Provider>
    );
};

export default BgHandle;