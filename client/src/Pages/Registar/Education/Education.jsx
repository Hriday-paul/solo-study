import { Radio, Space } from "antd";
import { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StepsContext } from "../../../ContextHandler/RegisterSteps/RegisterSteps";


const Education = () => {
    const navig = useNavigate();
    const {setRegistrationInfo, setStepCount} = useContext(StepsContext)

    const nextPage = () => {
        setStepCount(2)
        navig('/register/studyTime')
    }

    const onChange = (e) => {
        setRegistrationInfo(regisInfo=>{
            return {...regisInfo, education : e.target.value}
        })
    };

    const prevPage = useCallback(()=>{
        setStepCount(0);
        navig('/register')
    }, [navig, setStepCount])

    return (
        <div className="p-10 pb-5">
            <div className="flex flex-col md:flex-row justify-between gap-x-5 items-center border-b border-b-gray-300 mb-2 md:pb-5 lg:pb-0">
                <div className="md:w-1/2">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-700 mb-2">What is your current educational institution?</h2>
                    <div className="mt-5 lg:mt-10">
                        <Radio.Group size="large" onChange={onChange} >
                            <Space direction="vertical">
                                <Radio value={'High School'}>High School</Radio>
                                <Radio value={'InterMediate Collage'}>InterMediate Collage</Radio>
                                <Radio value={'University'}>University</Radio>
                                <Radio value={'Another'}>Another</Radio>
                            </Space>
                        </Radio.Group>
                    </div>
                </div>
                <div className="md:w-1/2">
                    <img src="https://res.cloudinary.com/devlj6p7h/image/upload/v1711789965/test/y7ihzellpcqpbq5tdlu4.jpg" alt="study-img" />
                </div>
            </div>
            <div className="flex flex-row justify-between items-center">
                <div>
                    <button onClick={prevPage} className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-blue-700 hover:text-white whitespace-no-wrap border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 duration-200" data-rounded="rounded-md" data-primary="blue-600" data-primary-reset="{}">
                        Prev
                    </button>
                </div>
                <div className="flex gap-x-5 items-center">
                    <button onClick={nextPage} className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-blue-700 hover:text-white whitespace-no-wrap border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 duration-200" data-rounded="rounded-md" data-primary="blue-600" data-primary-reset="{}">
                        Skip
                    </button>

                    <button onClick={nextPage} className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" data-rounded="rounded-md" data-primary="blue-600" data-primary-reset="{}">
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Education;