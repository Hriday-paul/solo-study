import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { PulseLoader } from "react-spinners";
import { AppDispatch, RootState } from '../../../Redux/Store';
import { onAuthStateChanged } from 'firebase/auth';
import auth from '../../../firebase.init';
import { addUserDetails } from '../../../Redux/Feature/ManageUserSlice/UserSlice';

function Private({ children }: { children: React.ReactNode }) {
    const [isLoading, setLoading] = useState(true);
    const location = useLocation();
    const userInfo = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if(currentUser){
                dispatch(addUserDetails({name : currentUser.displayName, email : currentUser.email, password : ''}))
                setLoading(false);
            }else{
                setLoading(false);
            }
        })
        return () => {
            unsubscribe()
        }
    }, [dispatch])

    
    if (isLoading) {
        return <div className="min-h-screen flex justify-center items-center bg-[#1B1A18]">
            <PulseLoader
                color="#ffffff"
                size={15}
                speedMultiplier={0.8}
            />
        </div>
    }

    else if (userInfo.email && userInfo.name) {
        return children;
    }

    return <Navigate state={{ from: location.pathname }} to="/login" replace></Navigate>
}

export default Private