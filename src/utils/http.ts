import axios from "axios";
import Cookies from "universal-cookie";

const http = axios.create({
    baseURL: 'http://localhost:8082/user'
});

http.interceptors.request.use(async config => {
    const cookies = new Cookies();
    const token = cookies.get('Token');
    if (token) {
        http.defaults.headers.authorization = `Bearer ${token}`;
    }
    return config;
});
 
export default http;