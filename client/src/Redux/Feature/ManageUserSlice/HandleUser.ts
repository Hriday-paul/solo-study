import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import auth from '../../../firebase.init'
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic"

const axiosPublic = UseAxiosPublic();

const creatUserWithFb = async (email: string, password: string, name: string) => {
    const user = await createUserWithEmailAndPassword(auth, email, password);

    if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
            displayName: name
        })
    }
    return user;
}

type userInfo = {
    name: string;
    email: string;
    password: string;
    education?: string;
    dailyStudyTime?: number;
}

const uploadServerUser = async(userInfo : userInfo) => {
    const user = await axiosPublic.put('/addUser', userInfo)
    return(user);
}

export { creatUserWithFb, uploadServerUser};