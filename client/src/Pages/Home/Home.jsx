import { useState } from "react";
import Counter from "../../Components/Ui/Counter/Counter";

const Home = () => {
    const [muted, setMuted] = useState(true);

    const toggleMute = () => {
        setMuted(!muted);
    };

    return (
        <div className="relative h-screen overflow-hidden">
            <div className="overflow-hidden h-screen">
                <div className="h-screen overflow-hidden">

                    <iframe
                        className="pointer-events-none absolute left-1/2 top-1/2 box-border h-[56.25vw] min-h-full w-screen min-w-full -translate-x-1/2 -translate-y-1/2"
                        src={`https://www.youtube.com/embed/UWBfTjgqnGw?start=60&loop=1&playlist=UWBfTjgqnGw&showinfo=0&controls=0&disablekb=0&fs=0&rel=0&iv_load_policy=3&autoplay=1&mute=${muted ? 1 : 0}&modestbranding=1&playsinline=1&enablejsapi=1&origin=https%3A%2F%2Fapp.studytogether.com&widgetid=1`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        width="640"
                        height="360"
                    ></iframe>
                        
                    <div >
                        <div className="relative mb-4 flex h-12 items-center justify-between p-5">
                            <div className="relative z-30 flex text-xs text-white">
                                <div>
                                    <div className="flex flex-row items-start justify-center hover:cursor-pointer bg-opacity-90 hover:bg-opacity-70 min-w-[112px] h-full py-2 px-3 bg-[#282322] rounded-lg transition-opacity duration-250 ease-in-out">
                                        personal timer
                                    </div>
                                </div>
                                {/* <div>
                                    <div className="flex flex-row items-start justify-center hover:cursor-pointer bg-opacity-90 hover:bg-opacity-70 min-w-[112px] h-full py-2 px-3 bg-[#282322] rounded-lg transition-opacity duration-250 ease-in-out">
                                        session goal
                                    </div>
                                </div> */}
                                
                                <div className="draggable-container absolute top-[calc(48px+16px)] z-10">
                                    <div>
                                        <div className="transition-opacity duration-250 ease-in-out w-[268px] backdrop-blur bg-[#282322] p-6 pr-2 rounded-2xl bg-opacity-90 mb-3 ">
                                            <div className="path--fill-current mr-4 flex items-center justify-between">
                                                <div className="w-full">
                                                    <Counter/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>


    )
};

export default Home;

{/* <button
                    className="absolute top-4 right-4 bg-[#282322] text-white px-2 py-1 rounded"
                    onClick={toggleMute}
                >
                    {muted ? 'Unmute' : 'Mute'}
                </button> */}