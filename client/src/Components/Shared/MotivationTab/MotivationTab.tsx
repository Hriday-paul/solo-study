import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import MotivatedTextContent from "../../Ui/MotivatedTextContent/MotivatedTextContent";
import { useState } from "react";
import { FaTextHeight } from "react-icons/fa6";
import { RiErrorWarningLine } from "react-icons/ri";

const tabList = ['Bangla', 'English']



const MotivationTab = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <div>
            <div className="w-full">
                <div className="flex flex-row justify-between items-center w-full">
                    <div className="flex items-center gap-x-1">
                        <FaTextHeight className="text-xs font-medium"></FaTextHeight>
                        <h4 className="text-gray-200 text-xs font-medium">Motivational Text</h4>
                    </div>
                    <RiErrorWarningLine className="text-xs" />
                </div>
                <div className="my-3">
                    <Tabs selectedIndex={selectedTab} onSelect={(index) => setSelectedTab(index)}>
                        <TabList className='flex flex-row flex-wrap gap-x-1 gap-y-1 items-center'>
                            {
                                tabList?.map((tab, indx) => {
                                    return <Tab key={`${tab + indx}`} >
                                        <div className={`flex flex-row items-center gap-x-[2px] px-2 py-1 rounded-full cursor-pointer ${selectedTab == indx ? 'bg-white text-black' : 'bg-black text-white'}`}>
                                            {/* <img width="13" height="13" loading="lazy" src={tab.img} alt="image" /> */}
                                            <h5 className="text-[0.60rem] font-medium">{tab}</h5>
                                        </div>
                                    </Tab>
                                })
                            }

                        </TabList>
                        {
                            tabList?.map((tab) => {
                                return <TabPanel key={tab}>
                                    <MotivatedTextContent tabIndx={selectedTab} />
                                </TabPanel>
                            })
                        }
                    </Tabs>
                </div>


            </div>



        </div>
    );
};

export default MotivationTab;