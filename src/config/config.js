import axios from "axios";

const config = {
    endpoint: 'http://127.0.0.1:8000/'
};

const axiosInstance = axios.create({
    baseURL: config.endpoint
});

const turaChainId = "turatest"

const profileImageUrlPrefix = config.endpoint + "media";

export { axiosInstance, profileImageUrlPrefix,turaChainId };
