// config.js
import axios from "axios";

const config = {
    endpoint: 'https://tagfusion.org/'
    // endpoint: 'https://testnet1.turablockchain.com/'
    // endpoint: 'http://127.0.0.1:8000/'
};


const endpoint_rpc = "https://rpc-beta1.turablockchain.com"
// const endpoint_rpc = "https://rpc-testnet1.turablockchain.com"
const axiosInstance = axios.create({
    baseURL: config.endpoint,
    timeout: 10000,  // 设置超时时间为 10000 毫秒（10 秒）
    headers: {
        'Content-Type': 'application/json',
        // 如果需要身份验证，可以添加 'Authorization': 'Bearer YOUR_TOKEN'
    } // 设置超时时间为 10000 毫秒（10 秒）

});

const turaChainId = "mainnet-tura";
//  const turaChainId = "testnet-tura";



const tag_url = "https://tagfusion.org";
//  const tag_url = "https://testnet1.turablockchain.com";


const profileImageUrlPrefix = config.endpoint + "media";

const repayAddress = 'tura12g2up77ngna09a3cvcwra3yajy3zhuw7mlrqyx'

export { axiosInstance, profileImageUrlPrefix, turaChainId, endpoint_rpc, tag_url, repayAddress };
