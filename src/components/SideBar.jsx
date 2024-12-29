import { useEffect, useState } from "react";
import { GaugeComponent } from "react-gauge-component";
import { ToastContainer, toast } from "react-toastify";
import { useWalletTool } from "./UseWalletTool";
import { useLoan } from "./UseLoan";

const SideBar = ({ onTabClick = () => {} }) => {
  const { connectWallet, exitWallet, walletAddress } = useWalletTool();
  const { fetchData, data } = useLoan();

  const [active, setActive] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const tabs = [
    {
      title: walletAddress ? "Exit Wallet" : "Connect Wallet",
      type: "wallet",
    },
    {
      title: "My Tags",
      type: "tags",
    },
    ,
    {
      title: "Credit Score",
      type: "score",
    },
  ];
  const handleTabClick = (item, idx) => {
    const type = item.type;
    setActive(idx);

    switch (type) {
      case "wallet":
        handleWalletButtonClick();
        break;
      case "score":
        handleScoreButtonClick();
        break;
      case "tags":
        handleTagsButtonClick(idx);
        break;
      default:
        break;
    }
  };

  const handleWalletButtonClick = () => {
    if (walletAddress) {
      exitWallet();
    } else {
      connectWallet();
    }
  };
  const handleScoreButtonClick = () => {
    if (!checkConnected()) {
      return;
    }
    fetchData().then(() => {
      if (data) {
        setShowScore(true);
      }
    });
  };

  const handleTagsButtonClick = (idx) => {
    if (!checkConnected()) {
      return;
    }
    onTabClick?.call(null, idx);
  };

  const checkConnected = () => {
    const isConnected = !!walletAddress;
    if (!isConnected) {
      toast.error("Please connect wallet");
    }

    return isConnected;
  };
  return (
    <div className="flex md:flex-col md:w-[213px] mt-[30px] md:mt-[60px]">
      {tabs.map((item, idx) => {
        return (
          <div
            key={item.title}
            className={`flex-1 md:flex-none h-[50px] mt-[10px] text-[#388379] flex items-center justify-center cursor-pointer hover:bg-btngreen hover:text-white transition-all`}
            onClick={() => handleTabClick(item, idx)}
          >
            {item.title}
          </div>
        );
      })}

      {showScore && (
        <div className=" w-full">
          <GaugeComponent
            id="gauge-component"
            className="flex justify-center"
            arc={{
              gradient: true,
              width: 0.1,
              padding: 0,
              subArcs: [{ color: "#F7C034" }],
            }}
            value={Math.round(data.credit_score)}
            pointer={{
              type: "needle",
              elastic: true,
              color: "#F7C034",
            }}
            type="radial"
            minValue={0}
            maxValue={1000}
            labels={{
              valueLabel: {
                formatTextValue: (val) => val,
                hide: true,
              },

              tickLabels: {
                type: "inner",
                ticks: [
                  { value: 0 },
                  { value: 100 },
                  { value: 200 },
                  { value: 300 },
                  { value: 400 },
                  { value: 500 },
                  { value: 600 },
                  { value: 700 },
                  { value: 800 },
                  { value: 900 },
                  { value: 1000 },
                ],
                defaultTickValueConfig: {
                  formatTextValue: (val) => val,
                },
              },
            }}
          />
          <div className="flex flex-col justify-center items-center translate-y-[-50px]">
            <div className="text-[#FFFFFFB2]  text-[12px] ">Credit Score</div>
            <div className="text-[24px] text-[#FFFFFFE5]">
              {Math.round(data.credit_score)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
