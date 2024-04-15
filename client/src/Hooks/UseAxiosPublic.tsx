import axios from "axios"

const axiosSequre = axios.create({
    baseURL: 'https://study-tracker-gxks.onrender.com',
    // withCredentials : true,
})
function UseAxiosPublic() {
  return (
    axiosSequre
  )
}

export default UseAxiosPublic