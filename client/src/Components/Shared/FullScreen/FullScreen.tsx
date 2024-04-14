import { useCallback, useState } from "react";
import { RiFullscreenFill } from "react-icons/ri";
import { BiExitFullscreen } from "react-icons/bi";

const FullScreen: React.FC = () => {
    const [runFullScreen, setRunFullScreen] = useState<boolean>(false);

    const openFullScreen = useCallback(() => {
        const elem = document.documentElement as any;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        }
        else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        }
        else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }
        setRunFullScreen(true);
    }, []);

    const closeFullScreen = useCallback(() => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        else if ((document as any).webkitExitFullscreen) { /* Safari */
            (document as any).webkitExitFullscreen();
        }
        setRunFullScreen(false);
    }, [])

    return (
        <div>
            <div onClick={openFullScreen} className={`hover:cursor-pointer bg-opacity-90 hover:bg-opacity-70 p-3 bg-[#282322] rounded-lg transition-opacity duration-250 ease-in-out ${!runFullScreen ? '' : 'hidden'}`}>
                <RiFullscreenFill className="text-lg text-white" />
            </div>
            <div onClick={closeFullScreen} className={`hover:cursor-pointer bg-opacity-90 hover:bg-opacity-70 p-3 bg-[#282322] rounded-lg transition-opacity duration-250 ease-in-out ${runFullScreen ? '' : 'hidden'}`}>
                <BiExitFullscreen className="text-lg text-white" />
            </div>
        </div>
    );
};

export default FullScreen;
