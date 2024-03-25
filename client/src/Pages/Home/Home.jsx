import { useContext, useEffect, useRef, useState } from "react";
import Counter from "../../Components/Ui/Counter/Counter";
import RightSideTab from "../../Components/Shared/RightSideTab/RightSideTab";
import { BgHandlerContext } from "../../ContextHandler/BgHandle/BgHandle";

const Home = () => {
    const [muted, setMuted] = useState(true);
    const { bgVideoSrc } = useContext(BgHandlerContext);
    const iframeref = useRef(null);
    const playerRef = useRef(null); // Ref to store player instance
    

    useEffect(() => {
        function createYouTubePlayer() {
            window.YT.ready(function () {
                playerRef.current = new window.YT.Player(iframeref.current, {
                    events: {
                        'onReady': onPlayerReady
                    },
                });
            });
        }

        function onPlayerReady(event) {
            console.log(event.target);
            // Get the current volume and log it
            //event.target.setVolume(5);
            const currentVolume = event.target.getVolume();
            console.log('Current Volume:', currentVolume);
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

    // const toggleMute = () => {
    //     setMuted(!muted);
    // };

    return (
        <div className="relative h-screen overflow-hidden">
            <div className="overflow-hidden h-screen">
                <div className="h-screen overflow-hidden">
                    <iframe
                        id="videoId"
                        ref={iframeref}
                        className="pointer-events-none absolute left-1/2 top-1/2 box-border h-[56.25vw] min-h-full w-screen min-w-full -translate-x-1/2 -translate-y-1/2"
                        src={bgVideoSrc}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        width="640"
                        height="360"
                    ></iframe>

                    <div>
                        <div className="relative mb-4 flex h-12 items-center justify-between p-5">
                            <div className="relative z-30 flex text-xs text-white">
                                <div>
                                    <div className="flex flex-row items-start justify-center hover:cursor-pointer bg-opacity-90 hover:bg-opacity-70 min-w-[112px] h-full py-2 px-3 bg-[#282322] rounded-lg transition-opacity duration-250 ease-in-out">
                                        personal timer
                                    </div>
                                </div>
                                

                                <div className="draggable-container absolute top-[calc(48px+16px)] z-10">
                                    <div>
                                        <div className="transition-opacity duration-250 ease-in-out w-[268px] backdrop-blur bg-[#282322] bg-opacity-80 p-6 pr-2 rounded-2xl mb-3 ">
                                            <div className="path--fill-current mr-4 flex items-center justify-between">
                                                <div className="w-full">
                                                    <Counter />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative z-30 flex gap-x-2 text-xs text-white">
                                <RightSideTab />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
