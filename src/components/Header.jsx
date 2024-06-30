import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { useState, useEffect } from "react";
import { turaChainId } from "../config/config";

const Header = () => {
    const [walletAddress, setWalletAddress] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const address = localStorage.getItem("tura_address");
        setWalletAddress(address);
    }, []);

    const handleWalletButtonClick = async () => {
        if (walletAddress) {
            const confirmed = window.confirm("确认退出当前账户?");
            if (confirmed) {
                localStorage.removeItem("tura_address");
                setWalletAddress(null);
                navigate("/"); // 重定向到主页
            }
        } else {
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
        }
    };

    return (
        <div className="w-full flex justify-between items-center p-4 z-20">
            <div className="flex items-center gap-4">
                <Link to="/" className="w-fit flex items-center gap-1">
                    <img src="/icons/logo.png" alt="logo" className="w-16 object-contain rounded" />
                </Link>
                <Link to="/" className="text-white font-semibold capitalize hover:underline">home</Link>
                <Link to="/#about" className="text-white font-semibold capitalize hover:underline">about</Link>
                <Link to="/#tagfusion" className="text-white font-semibold capitalize hover:underline">tagfusion</Link>
                <Link to="/#tokenomics" className="text-white font-semibold capitalize hover:underline">tokenomics</Link>
                <Link to="/#roadmap" className="text-white font-semibold capitalize hover:underline">roadmap</Link>
            </div>
            <div className="flex items-center gap-6">
                <Link to="/card">
                    <Button text="my tags" link="/card" className="hover:bg-gradient-red-orange hover:shadow-custom-shadow hover:border-0" />
                </Link>
                <Button
                    text={walletAddress ? "Exit Wallet" : "Connect Wallet"}
                    onClick={handleWalletButtonClick}
                    className="hover:bg-gradient-red-orange hover:shadow-custom-shadow hover:border-0"
                />
            </div>
        </div>
    );
};

export default Header;
