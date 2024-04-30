import axios from "axios"

export const apiUrl = 'https://study-tracker-gxks.onrender.com/api';

const axiosSequre = axios.create({
    baseURL: apiUrl,
    // withCredentials : true,
})
function UseAxiosPublic() {
  return (
    axiosSequre
  )
}

export default UseAxiosPublic