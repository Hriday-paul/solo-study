import { useState } from "react";
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs'
import { RiGalleryLine, RiMusic2Fill } from "react-icons/ri";
import { IoStatsChart } from "react-icons/io5";
import VideoTab from "../VideoTab/VideoTab";
import AudioTab from "../AudioTab/AudioTab";
import { RiDoubleQuotesL } from "react-icons/ri";
import MotivationTab from "../MotivationTab/MotivationTab";
import FullScreen from "../../Ui/FullScreen/FullScreen";

const RightSideTab = () => {
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <div className="absolute top-0 right-0">
            <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList className='flex gap-x-2'>
                    <Tab>
                        <div>
                            <div className=" hover:cursor-pointer bg-opacity-90 hover:bg-opacity-70 p-3 bg-[#282322] rounded-lg transition-opacity duration-250 ease-in-out">
                                <RiGalleryLine className="text-lg text-white" />
                            </div>
                        </div>
                    </Tab>
                    <Tab>
                        <div>
                            <div className=" hover:cursor-pointer bg-opacity-90 hover:bg-opacity-70 p-3 bg-[#282322] rounded-lg transition-opacity duration-250 ease-in-out">
                                <RiMusic2Fill className="text-lg text-white" />
                            </div>
                        </div>
                    </Tab>

                    <Tab>
                        <div>
                            <div className=" hover:cursor-pointer bg-opacity-90 hover:bg-opacity-70 p-3 bg-[#282322] rounded-lg transition-opacity duration-250 ease-in-out">
                                <RiDoubleQuotesL className="text-lg text-white" />
                            </div>
                        </div>
                    </Tab>

                    <Tab>
                        <div>
                            <div className=" hover:cursor-pointer bg-opacity-90 hover:bg-opacity-70 p-3 bg-[#282322] rounded-lg transition-opacity duration-250 ease-in-out">
                                <IoStatsChart className="text-lg text-white" />
                            </div>
                        </div>
                    </Tab>

                    <FullScreen/>

                </TabList>

                {/* video tab content */}
                <TabPanel>
                    <div className="draggable-container absolute top-[calc(48px+16px)] right-0 z-10">
                        <div>
                            <div className="transition-opacity duration-250 ease-in-out w-[225px] backdrop-blur bg-opacity-70 p-3 bg-[#282322] py-3 px-5 rounded-2xl">
                                <div className="path--fill-current flex items-center justify-between">
                                    <div className="w-full">
                                        <VideoTab />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabPanel>

                {/* audio tab content */}
                <TabPanel>
                    <div className="draggable-container absolute top-[calc(48px+16px)] right-0 z-10">
                        <div>
                            <div className="transition-opacity duration-250 ease-in-out w-[225px] backdrop-blur bg-opacity-70 p-3 bg-[#282322] py-3 px-5 rounded-2xl">
                                <div className="path--fill-current flex items-center justify-between">
                                    <div className="w-full">
                                        <AudioTab />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabPanel>

                {/* motivational text tab content */}
                <TabPanel>
                    <div className="draggable-container absolute top-[calc(48px+16px)] right-0 z-10">
                        <div>
                            <div className="transition-opacity duration-250 ease-in-out w-[225px] backdrop-blur bg-opacity-70 p-3 bg-[#282322] py-3 px-5 rounded-2xl">
                                <div className="path--fill-current flex items-center justify-between">
                                    <div className="w-full">
                                        <MotivationTab />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className="draggable-container absolute top-[calc(48px+16px)] right-0 z-10">
                        <div>
                            <div className="transition-opacity duration-250 ease-in-out w-[225px] backdrop-blur bg-[#282322] bg-opacity-70 p-3 py-3 px-5 rounded-2xl">
                                <div className="path--fill-current mr-4 flex items-center justify-between">
                                    statis tics tab
                                </div>
                            </div>
                        </div>

                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default RightSideTab;