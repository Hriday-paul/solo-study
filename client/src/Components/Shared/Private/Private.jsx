import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { PulseLoader } from "react-spinners";
import { AuthContext } from '../../../ContextHandler/Authonicate/Authonicate';


function Private({ children }) {
    const { userInfo, loading } = useContext(AuthContext);
    const location = useLocation();
    console.log(userInfo, loading);

    if (loading) {
        return <div className="min-h-screen flex justify-center items-center bg-[#1B1A18]">
            <PulseLoader
                color="#ffffff"
                size={15}
                speedMultiplier={0.8}
            />
        </div>
    }

    else if (userInfo) {
        return children;
    }

    return <Navigate state={{ from: location.pathname }} to="/login" replace></Navigate>
}

export default Private