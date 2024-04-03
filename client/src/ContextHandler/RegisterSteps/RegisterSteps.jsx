import { createContext, useState } from "react";

export const StepsContext = createContext(null);
const stepItems = [
    {
        title: 'Create',                                    
    },
    {
        title: 'Education',
    },
    {
        title: 'Study Time',   
    },
    {
        title: 'Welcome',   
    },
]

const RegisterSteps = ({children}) => {
    const [stepCount, setStepCount] = useState(0);
    const [registrationInfo, setRegistrationInfo] = useState({
        name : '',
        email : '',
        password : '',
        education : '',
        dailyStudyTime : 5,
    })

    const stepInfo = {
        stepCount,
        setStepCount,
        stepItems,
        registrationInfo, 
        setRegistrationInfo
    }

    return (
        <StepsContext.Provider value={stepInfo}>
            {children}
        </StepsContext.Provider>
    );
};

export default RegisterSteps;