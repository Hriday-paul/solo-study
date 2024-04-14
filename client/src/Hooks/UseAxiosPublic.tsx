import axios from "axios"

const axiosSequre = axios.create({
    baseURL: 'https://study-here-server.vercel.app',
    // withCredentials : true,
})
function UseAxiosPublic() {
  return (
    axiosSequre
  )
}

export default UseAxiosPublic