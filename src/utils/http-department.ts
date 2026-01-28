import axios from "axios";
import Cookies from "universal-cookie";

const httpDepartment = axios.create({
    baseURL: 'http://localhost:8081/'
});

httpDepartment.interceptors.request.use(async config => {
    const cookies = new Cookies();
    const token = cookies.get('Token');
    if (token) {
        httpDepartment.defaults.headers.authorization = `Bearer ${token}`;
    }
    return config;
});
 
export default httpDepartment;