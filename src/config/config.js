// config.js
import axios from "axios";

const config = {
    // endpoint: 'http://43.135.26.222:8000/'
    endpoint: 'http://127.0.0.1:8000/'
};


const axiosInstance = axios.create({
    baseURL: config.endpoint,
    timeout: 10000  // 设置超时时间为 10000 毫秒（10 秒）
});



const turaChainId = "turatest";
const profileImageUrlPrefix = config.endpoint + "media";

export { axiosInstance, profileImageUrlPrefix, turaChainId };
