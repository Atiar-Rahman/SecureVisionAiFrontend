import axios from "axios";

const apiClient = axios.create(
    {
        baseURL:'https://securevisionaibackend.onrender.com/'
    }
)

export default apiClient;
