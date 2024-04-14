import { useSelector } from 'react-redux';
import PieChart from '../PieChart/PieChart';
import { RootState } from '../../../Redux/Store';
import { useGetTodayStudyHistoryQuery } from '../../../Redux/Feature/Api/BaseApi';
import TabLoading from '../TabLoading/TabLoading';
import VideoError from '../VideoError/VideoError';

const TodayStudyHistory = () => {
    const {email} = useSelector((state : RootState)=>state.user);
    const date = `${new Date().getFullYear()}-${(new Date().getMonth() + 1)}-${new Date().getDate()}`
    const {data, isLoading, isError} = useGetTodayStudyHistoryQuery({email, date})

    return (
        <div>
            {
                isLoading ? <TabLoading/> : isError ? <VideoError/> : 
                (data?.length || 0) > 0 && <PieChart datalist={data || []} />
            }
        </div>
    );
};

export default TodayStudyHistory;