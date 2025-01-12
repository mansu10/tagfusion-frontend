import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PanelBox from "../components/PanelBox";
import { getProjectById } from "../api/index";
import { ToastContainer, toast } from "react-toastify";
import { endpoint_rpc, turaChainId } from "../config/config";
const PageChainUser = () => {
  const params = useParams();
  const [address, setAddress] = useState("");
  const [project, setProject] = useState({
    id: "",
    project_name: "",
    project_intro: "",
    data_content: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [keplrLoaded, setKeplrLoaded] = useState(false);

  useEffect(() => {
    const loadKeplr = async () => {
      if (window.keplr) {
        await window.keplr.enable(turaChainId); // 替换为你的链 ID
        setKeplrLoaded(true);
      } else {
        toast.error("Please install the Keplr plug-in");
      }
    };
    loadKeplr();
  });
  useEffect(() => {
    // const address = localStorage.getItem("tura_address");
    // setAddress(address);
    fetchProjectInfo();
  }, []);

  const fetchProjectInfo = () => {
    getProjectById({ id: params.id }).then((res) => {
      const { code, data } = res.data;
      if (code === 0) {
        setProject(data);
      } else {
        toast.error(data.message);
      }
    });
  };

  const handleAddressChange = (e) => {
        let val = e.target.value;
        setAddress(val);
  };
  const handleSubmitClick = async (event) => {
    event.preventDefault();
    if (!keplrLoaded) {
      toast.error("Keplr is not loaded");
      return;
    }

    try {
      const chainId = turaChainId; // 替换为你的链 ID
      const address = localStorage.getItem("tura_address");
      if (!address) {
        toast.error("Please connect wallet");
        return;
      }

      const toAddress = address;
      const denom = "utura";
      const toSend = "1000000"; // 最小交易金额

      const offlineSigner = window.getOfflineSigner(chainId);
      const signingClient = await SigningStargateClient.connectWithSigner(
        endpoint_rpc, // 替换为你的节点 RPC URL
        offlineSigner
      );

      const fee = {
        amount: [{ denom: "utura", amount: "500" }], // 调整为你的交易费用
        gas: "200000",
      };

      const memo = jsonStr;
      toast.info("Loading...", {
        position: "top-right", // 设置位置为右上角
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
        type: "info",
        icon: false,
        toastId: "customId",
      });
      setIsLoading(true);
      const result = await signingClient.sendTokens(
        address,
        toAddress,
        [
          {
            denom: denom,
            amount: toSend,
          },
        ],
        fee,
        memo
      );
      toast.dismiss();

      toast.success(`Transaction Successfully`);
      fetchCreateData();

      // navigate("/some-path");
    } catch (error) {
      if (error.message === "Invalid string. Length must be a multiple of 4") {
        toast.dismiss();
        toast.success(`Transaction Successfully`);
        fetchCreateData();
      } else {
        toast.error(`Submit Error: ${error.message}`);
      }
    }
  };
  const handleConfirmClick = () => {};
  return (
    <div className="flex justify-center pt-[100px] px-[18px] relative z-10">
      <PanelBox title={project.project_name} className="w-full">
        <div className="text-white">{project.project_intro}</div>
        <div className="w-full">
          <div className="relative mt-[20px]">
            <input
              onChange={handleAddressChange}
              value={address}
              type="text"
              placeholder="Wallet Address"
              className="w-full px-[10px] py-[10px] border border-[#FFFFFF1F] text-[#FFFFFF8A] text-[16px] bg-[#FFFFFF1A] outline-none focus:border-b-[#FFA000FF]"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-[8px]">
            <div
              onClick={handleSubmitClick}
              className={`flex justify-center items-center h-[40px] mt-[20px] px-[15px] bg-btngreen text-white cursor-pointer ${
                isLoading || !address ? "opacity-50" : ""
              }`}
            >
              Submit
            </div>

            <div
              className={`flex justify-center items-center h-[40px] mt-[20px] px-[15px] bg-btngreen text-white cursor-pointer`}
            >
              <a
                href="https://faucet.tagfusion.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Tura fee here
              </a>
            </div>
          </div>
          {/* <div className="w-full h-[150px] mt-[20px] p-[8px] border border-[#FFA000FF] text-[14px] text-white text-left overflow-auto text-wrap whitespace-pre break-words">
            {project.data_content}
          </div> */}

          <div className="flex justify-center"></div>
        </div>
      </PanelBox>
    </div>
  );
};

export default PageChainUser;
