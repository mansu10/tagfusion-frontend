import { useEffect, useState } from "react";

import {
  axiosInstance,
  endpoint_rpc,
  turaChainId,
  repayAddress,
} from "../config/config";

const useWalletTool = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  useEffect(() => {
    const address = localStorage.getItem("tura_address");
    setWalletAddress(address);
  }, []);

  const connectWallet = async () => {
    try {
      // 连接 Keplr 钱包
      if (!window.keplr) {
        alert("Please install Keplr extension");
        return;
      }
      const chainId = turaChainId;
      // 提示 Keplr 连接
      await window.keplr.enable(chainId);
      // 获取离线签名者
      const offlineSigner = window.getOfflineSigner(chainId);
      const accounts = await offlineSigner.getAccounts();
      // 假设新的地址是 accounts[0].address
      const newAddress = accounts[0].address;
      localStorage.setItem("tura_address", newAddress);
      setWalletAddress(newAddress);
    } catch (error) {
      console.error("Failed to connect to Keplr", error);
      alert("Failed to connect to Keplr");
    }
  };
  const exitWallet = () => {
    if (walletAddress) {
      const confirmed = window.confirm(
        "Confirm to log out of the current account?"
      );
      if (confirmed) {
        localStorage.removeItem("tura_address");
        localStorage.removeItem("tura_login_status");
        setWalletAddress(null);
        navigate("/"); // 重定向到主页
      }
    }
  };
  return { connectWallet, exitWallet, walletAddress };
};

export { useWalletTool };
