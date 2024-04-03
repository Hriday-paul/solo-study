import { useContext, useEffect, useRef } from "react";
import RightSideTab from "../../Components/Shared/RightSideTab/RightSideTab";
import { BgHandlerContext } from "../../ContextHandler/BgHandle/BgHandle";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import LeftSideTab from "../../Components/Shared/LeftSideTab/LeftSideTab";

const StudyView = () => {
    const { bgVideoSound, setCurrentVideo, currentVideo, motivText } = useContext(BgHandlerContext);
    const iframeref = useRef(null);

    function onPlayerReady(event) {
        // console.log(event.target);
        setCurrentVideo(event.target);
        event.target.setVolume(bgVideoSound);
    }


    useEffect(() => {
        function createYouTubePlayer() {
            window.YT.ready(function () {
                new window.YT.Player(iframeref.current, {
                    videoId: 'XxEhuSJF780',
                    width: 640,
                    height: 360,
                    playerVars: {
                        'autoplay': 1,
                        'mute': 1,
                        'controls': 0,
                        'autohide': 1,
                        'origin': 'http://localhost:5173'
                    },
                    events: {
                        'onReady': onPlayerReady,
                    },
                });

                const ifr = document.getElementsByTagName('iframe')[0];
                // Apply class to the iframe
                ifr.classList.add('pointer-events-none', 'absolute', 'left-1/2', 'top-1/2', 'box-border', 'h-[56.25vw]', 'min-h-full', 'w-screen', 'min-w-full', '-translate-x-1/2', '-translate-y-1/2');
                ifr.frameBorder = 0;
                ifr.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
            });
        }

        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        tag.onload = createYouTubePlayer;

        return () => {
            window.onYouTubeIframeAPIReady = null;
        };
    }, []);

    const changeVolume = (valume) => {
        if (currentVideo) {
            currentVideo.setVolume(valume);
        }
    };

    useEffect(() => {
        changeVolume(bgVideoSound);
    }, [bgVideoSound]);


    return (
        <div className="relative h-screen overflow-hidden">
            <div className="overflow-hidden h-screen">
                <div className="h-screen overflow-hidden">
                    {/* You can include the iframe directly in your JSX */}
                    <div ref={iframeref}></div>

                    <div>
                        <div className="relative mb-4 flex h-12 items-center justify-between p-5">
                            
                            <LeftSideTab/>
                            <div className="relative z-30 flex gap-x-2 text-xs text-white">
                                <RightSideTab />
                            </div>
                        </div>
                    </div>
                    <div className="relative h-full w-full flex justify-center items-center -mt-20">
                        <div className="w-1/2 mx-auto text-center">
                            <span className="mx-auto text-center">
                                <RiDoubleQuotesL className="text-white text-lg md:text-xl lg:text-3xl inline -mt-4 md:-mt-8 lg:-mt-16" />
                                <h2 className="text-xl md:text-3xl lg:text-5xl text-yellow-500 text-center font-medium inline font-serif">{motivText}</h2>
                                <RiDoubleQuotesR className="text-white text-lg md:text-xl lg:text-3xl -mt-4 md:-mt-8 lg:-mt-16 inline" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudyView;
