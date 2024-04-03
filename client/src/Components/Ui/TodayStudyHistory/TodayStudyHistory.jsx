import { useContext, useEffect, useReducer } from 'react';
import UseAxiosPublic from '../../../Hooks/UseAxiosPublic'
import { AuthContext } from '../../../ContextHandler/Authonicate/Authonicate';
import PieChart from '../PieChart/PieChart';

const initState = {
    loading: true,
    result: [],
    error: ""
}

const reducer = (current, action) => {
    switch (action.type) {
        case 'success':
            return {
                loading: false,
                result: action.data,
                error: ''
            }
        case 'error':
            return {
                loading: false,
                result: [],
                error: 'Something wrong'
            }
        default: return current
    }
}

const TodayStudyHistory = () => {
    const axiosPublic = UseAxiosPublic();
    const { userInfo } = useContext(AuthContext);
    const [states, dispatch] = useReducer(reducer, initState)

    const fetchData = () => {
        const date = `${new Date().getFullYear()}-${(new Date().getMonth() + 1)}-${new Date().getDate()}`

        axiosPublic.get(`/todayStudyHistory?email=${'hridoychandrapaul.10@gmail.com'}&date=${date}`)
            .then(({ data }) => {
                console.log(data);
                dispatch({type : 'success', data})
            })
            .catch(()=>{
                dispatch({type : 'error'})
            })
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div>
            {
                states?.loading ? 'loading...' : states?.error ? 'error' : 
                states?.result?.length > 0 && <PieChart datalist={states?.result} />
            }
        </div>
    );
};

export default TodayStudyHistory;