import { useState } from "react";
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs'
import VideoTabContent from "../VideoTabContent/VideoTabContent";

const tabList = [
    { name: 'Anime', img: 'https://img.icons8.com/plasticine/100/naruto.png' },
    { name: 'Library', img: 'https://img.icons8.com/plasticine/100/books.png' },
    { name: 'Cafe', img: 'https://img.icons8.com/plasticine/100/chinese-noodle.png' },
    { name: 'Nature', img: 'https://img.icons8.com/plasticine/100/nature.png' },
    { name: 'Animal', img: 'https://img.icons8.com/plasticine/100/parrot.png' },
    { name: 'City', img: 'https://img.icons8.com/plasticine/100/mountain-city.png' },
    { name: 'Desk', img: 'https://img.icons8.com/plasticine/100/home-office.png' },
    { name: 'Colors', img: 'https://img.icons8.com/plasticine/100/area-chart.png' },
]

const VideoInnerTab = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <div>
            <Tabs selectedIndex={selectedTab} onSelect={(index) => setSelectedTab(index)}>
                <TabList className='flex flex-row flex-wrap gap-x-1 gap-y-1 items-center'>
                    {
                        tabList?.map((tab, indx) => {
                            return <Tab key={`${tab.name + indx}`} >
                                <div className={`flex flex-row items-center gap-x-[2px] px-2 py-1 rounded-full cursor-pointer ${selectedTab==indx ? 'bg-white text-black' : 'bg-black text-white'}`}>
                                    <img width="13" height="13" loading="lazy" src={tab.img} alt="image" />
                                    <h5 className="text-[0.60rem] font-medium">{tab.name}</h5>
                                </div>
                            </Tab>
                        })
                    }

                </TabList>
                {
                    tabList?.map((indx) => {
                        return <TabPanel key={indx}>
                            <VideoTabContent tabIndx={selectedTab}/>
                        </TabPanel>
                    })
                }
            </Tabs>

        </div>
    );
};

export default VideoInnerTab;