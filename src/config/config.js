import axios from "axios";

const config = {
    endpoint: 'http://43.135.26.222:8000/'
};

const axiosInstance = axios.create({
    baseURL: config.endpoint
});

const turaChainId = "turatest"

const profileImageUrlPrefix = config.endpoint + "media";

export { axiosInstance, profileImageUrlPrefix,turaChainId };
