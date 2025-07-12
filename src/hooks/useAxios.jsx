import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_base_server_url
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;