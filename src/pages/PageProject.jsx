import { useState, useEffect } from "react";
import { SigningStargateClient } from "@cosmjs/stargate";

import PanelBox from "../components/PanelBox";
import {
  axiosInstance,
  endpoint_rpc,
  turaChainId,
  repayAddress,
} from "../config/config";
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
} from "@fluentui/react-dialog";
import { ToastContainer, toast } from "react-toastify";
// EBYYDbav6QgAM7JgYJcJgSKDgDvV8edgYJH5QmaAtZ6N;
const ModalChain = ({ children, chain }) => {
  const [nftAddress, setNftAddress] = useState("");
  // 96NQqG3umVDmQA6Jx3B3Etds4afTY3VEg9f32nNbuKXb
  const [mintAddress, setMintAddress] = useState("");
  const [json, setJson] = useState();
  const [jsonStr, setJsonStr] = useState();
  const [intro, setIntro] = useState();
  const [keplrLoaded, setKeplrLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const fetchNFTData = async () => {
    try {
      setIsLoading(true);
      toast.info("Loading...");
      const response = await axiosInstance.get("tagfusion/api/get_nft_data", {
        params: {
          nft_address: nftAddress,
          mint_address: mintAddress,
        },
      });
      console.log(response);
      if (response.data.code === 0) {
        const data = response.data.data;
        if (data) {
          setJson(data);
          setJsonStr(JSON.stringify(data));
        }
      }
      toast.dismiss();

      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  const fetchCreateData = async () => {
    try {
      const address = localStorage.getItem("tura_address");
      if (!address) {
        return;
      }
      setIsLoading(true);
      const response = await axiosInstance.get(
        "tagfusion/api/create_up_chain_data",
        {
          params: {
            tura_address: address,
            json: json,
          },
        }
      );
      console.log(response);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  const fetchInfo = async () => {
    const id = chain.id;
    if (!id) {
      return;
    }
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        `tagfusion/api/get_chain_introduction/`,
        {
          params: {
            id: id,
          },
        }
      );
      console.log(response);
      if (response.data.code === 0) {
        const result = response.data.data;
        const info = result.Introduction;
        setIntro(info);
      }
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  const handleConfirmClick = () => {
    if (!nftAddress || !mintAddress || isLoading) {
      toast.error("Please enter address");

      return;
    }
    fetchNFTData();
  };

  const handleOpenDialog = (event, data) => {
    if (data.open) {
      fetchInfo();
    } else {
      setJson();
      setJsonStr("");
      setIntro("");
    }
  };

  const handleAddressChange = (e) => {
    let val = e.target.value;
    setNftAddress(val);
  };
  const handleMintAddressChange = (e) => {
    let val = e.target.value;
    setMintAddress(val);
  };
  return (
    <Dialog onOpenChange={handleOpenDialog}>
      <DialogTrigger disableButtonEnhancement>{children}</DialogTrigger>
      <DialogSurface style={{ maxWidth: "fit-content" }}>
        <DialogBody>
          <DialogContent>
            <div className="mwx-w-[1200px]">
              <div className="origin-top">
                <div className="flex justify-center items-center">
                  <div className="flex-none flex flex-col items-center w-[596px]  px-[56px] py-[48px]  rounded-[10px] bg-[#424242]">
                    <div className="w-full max-h-[200] overflow-auto mt-[32px] text-[14px] text-white text-left whitespace-pre-line">
                      {intro?.replaceAll("\\n", "\n")}
                    </div>
                    <div className="w-full">
                      <div className="relative mt-[30px]">
                        <input
                          onChange={handleAddressChange}
                          value={nftAddress}
                          type="text"
                          placeholder="NFT Address"
                          className="w-full px-[10px] py-[10px] border border-[#FFFFFF1F] text-[#FFFFFF8A] text-[16px] bg-[#FFFFFF1A] outline-none focus:border-b-[#FFA000FF]"
                        />
                        {/* <div
                            className={`absolute bottom-[-20px] left-0 text-[#FFA000FF] text-[12px]`}
                          >
                            Please enter a number in the range of
                          </div> */}
                      </div>
                      <div className="relative mt-[30px]">
                        <input
                          onChange={handleMintAddressChange}
                          value={mintAddress}
                          type="text"
                          placeholder="Mint Address"
                          className="w-full px-[10px] py-[10px] border border-[#FFFFFF1F] text-[#FFFFFF8A] text-[16px] bg-[#FFFFFF1A] outline-none focus:border-b-[#FFA000FF]"
                        />
                      </div>
                      <div className="flex gap-[8px]">
                        <div
                          onClick={handleConfirmClick}
                          className={`flex justify-center items-center h-[40px] mt-[28px] px-[15px] bg-btngreen text-white cursor-pointer ${
                            !nftAddress || !mintAddress || isLoading
                              ? "opacity-50"
                              : ""
                          }`}
                        >
                          Confirm
                        </div>

                        <div
                          className={`flex justify-center items-center h-[40px] mt-[28px] px-[15px] bg-btngreen text-white cursor-pointer`}
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
                      <div className="w-full h-[150px] mt-[32px] p-[8px] border border-[#FFA000FF] text-[14px] text-white text-left overflow-auto text-wrap whitespace-pre break-words">
                        {jsonStr}
                      </div>
                      <div className="flex justify-center">
                        <div
                          onClick={handleSubmitClick}
                          className={`flex justify-center items-center h-[40px] mt-[28px] px-[15px] bg-btngreen text-white cursor-pointer ${
                            isLoading || !jsonStr ? "opacity-50" : ""
                          }`}
                        >
                          Submit
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              {/* <Button appearance="secondary">Close</Button> */}
            </DialogTrigger>
            {/* <Button appearance="primary">Do Something</Button> */}
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

const PageProject = () => {
  const tags = [
    {
      tag_name: "Solana",
      id: 1,
    },
  ];

  return (
    <div className="flex justify-center pt-[140px]">
      <PanelBox title="" className="max-w-[1200px] bg-[#424242] mt-[30px]">
        <div className="min-h-[150px] md:min-h-[500px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[50px] gap-y-[30px] text-white">
            {tags.map((tag, index) => (
              <ModalChain key={index} chain={tag}>
                <div
                  key={index}
                  className={`inline-flex justify-center items-center min-w-[200px] min-h-[40px] mx-[20px] md:mx-0 border rounded-[8px] cursor-pointer hover:border-[#FFA000FF] hover:text-[#FF6F00] transition-all`}
                >
                  {tag.tag_name}
                </div>
              </ModalChain>
            ))}
          </div>
          <ModalChain></ModalChain>
        </div>
      </PanelBox>
      <ToastContainer />
    </div>
  );
};

export default PageProject;
