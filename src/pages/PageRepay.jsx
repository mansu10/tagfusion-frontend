import { useState } from "react";
import Big from "big.js";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { SigningStargateClient } from "@cosmjs/stargate";

import {
  axiosInstance,
  endpoint_rpc,
  turaChainId,
  repayAddress,
} from "../config/config";
import { useEffect } from "react";

const PageRepay = () => {
  const navigate = useNavigate();

  const [info, setInfo] = useState({});
  const [amount, setAmount] = useState(0);
  useEffect(() => {
    const infoStr = sessionStorage.getItem("REPAY_ITEM");
    if (infoStr) {
      const result = JSON.parse(infoStr);
      // amount = result.amount;
      setInfo(result);
      setAmount(result.amount);
    }
  }, []);

  useEffect(() => {
    buildValList();
  }, [amount]);
  const defaultValList = [
    { amount: 0, val: 0.25, title: "1/4" },
    { amount: 0, val: 0.5, title: "1/2" },
    { amount: 0, val: 0.75, title: "3/4" },
    { amount: 0, val: 1, title: "All" },
  ];
  const [valList, setValList] = useState(defaultValList);
  const [selectDay, setSelectDay] = useState();
  const [repayAmount, setRepayAmount] = useState("");
  const [isRemindShow, setIsRemindShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const buildValList = () => {
    try {
      const list = valList;
      list.forEach((item) => {
        item.amount = Big(amount).times(item.val).toNumber();
      });
      setValList(list);
    } catch (e) {
      console.log(e);
    }
  };

  const handleRepayClick = () => {
    if (!repayAmount || isLoading) {
      // toast.error("Please enter repay amount");
      return;
    }
    if (repayAmount < 0 || repayAmount > amount) {
      // toast.error("Please enter right amount");
      return;
    }

    // fetchData();
    accountRepay();
  };
  const handleSelectRepay = (idx) => {
    const item = valList[idx];
    if (!item || !amount) {
      return;
    }
    const bigNum = Big(item.val);
    const result = bigNum.times(amount);
    setSelectDay(idx);
    setRepayAmount(result.toNumber());
    setIsRemindShow(false);
  };
  const handleInputChange = (e) => {
    const val = e.target.value;
    setRepayAmount(val);
    checkListVal(val);
    setIsRemindShow(val <= 0 || val > amount);
  };
  const checkListVal = (value) => {
    const val = value;
    if (isNaN(val) || typeof val != "number") {
      return;
    }
    const idx = valList.findIndex((item) => Big(item.amount).eq(val));
    setSelectDay(idx);
  };

  const fetchData = async () => {
    const address = localStorage.getItem("tura_address");
    if (!address || !repayAmount) {
      return;
    }
    const formData = new FormData();
    formData.append("address", address);
    formData.append("repay_amount", repayAmount);
    formData.append("id", info.id);

    try {
      setIsLoading(true);
      const response = await axiosInstance.post(
        "/tagfusion/api/repay/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data?.code === 0) {
        navigate("/my", { replace: true, state: { tab: "position" } });
      } else {
        toast.error("repay failed");
      }
      setIsLoading(false);
    } catch (e) {
      toast.error(e.message);
      setIsLoading(false);
    }
  };

  const accountRepay = async () => {
    setIsLoading(true);
    if (window.keplr) {
      await window.keplr.enable(turaChainId); // 替换为你的链 ID
    } else {
      toast.error("Please install the Keplr plug-in");
    }
    try {
      const chainId = turaChainId;
      const to_address = repayAddress;
      const denom = "utags";
      const toSend = 1e8 * repayAmount + "";
      const offlineSigner = window.getOfflineSigner(chainId);
      const accounts = await offlineSigner.getAccounts();
      const address = accounts[0].address;
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
      const signingClient = await SigningStargateClient.connectWithSigner(
        endpoint_rpc,
        offlineSigner
      );
      const fee = {
        amount: [{ denom: "utags", amount: "500" }],
        gas: "200000",
      };
      const memo = "";
      const result = await signingClient.sendTokens(
        address,
        to_address,
        [
          {
            denom: denom,
            amount: toSend,
          },
        ],
        fee,
        memo
      );
      if (result.code !== undefined && result.code !== 0) {
        throw new Error(`Error: ${result.log || result.rawLog}`);
      }
      await fetchData();
      toast.dismiss();
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      if (error.message === "Invalid string. Length must be a multiple of 4") {
        fetchData();
        toast.dismiss();
      } else {
        toast.error(`Submit Error: ${error.message}`);
      }
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="flex-none flex flex-col items-center w-full px-[20px] py-[98px]  rounded-[10px]">
          <div className="text-txtgreen text-[24px] font-bold">
            {info.currency}
          </div>
          <div className="w-full">
            <div className="relative mt-[30px]">
              <input
                type="number"
                onChange={handleInputChange}
                value={repayAmount}
                placeholder="Please enter the repay amount *"
                className="w-full px-[10px] py-[10px] border border-[#FFFFFF1F] text-[#FFFFFF8A] text-[16px] bg-[#FFFFFF1A] outline-none focus:border-b-[#FFA000FF]"
              />
              {isRemindShow && (
                <div
                  className={`absolute bottom-[-20px] left-0 text-[#FFA000FF] text-[14px]`}
                >
                  Please enter a number in the range of 0 ~ {amount}
                </div>
              )}
            </div>
            <div className="flex justify-between mt-[20px] text-[14px] gap-[10px]">
              {valList.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    handleSelectRepay(idx);
                  }}
                  className={`flex-1 px-[20px] py-[8px] border bg-[#FFFFFF1A] text-center hover:border-[#FFA000FF] hover:text-[#FFA000FF] cursor-pointer ${
                    selectDay === idx
                      ? "border-[#FFA000FF] text-[#FFA000FF]"
                      : "border-[#FFFFFF1F] text-[#FFFFFF8A]"
                  }`}
                >
                  {item.title}
                </div>
              ))}
            </div>
            <div className="">
              <div className="flex justify-between mt-[20px] text-[18px] text-white">
                <div>Total Borrowed:</div>
                <div className="bold">{info.amount}</div>
              </div>
              <div className="flex justify-between mt-[20px] text-[18px] text-white">
                <div>Borrow APY:</div>
                <div className="bold">
                  {(info.borrow_APY * 100).toFixed(2)}%
                </div>
              </div>
              <div className="flex justify-between mt-[20px] text-[18px] text-white">
                <div>Borrowed({info.currency}):</div>
                <div className="bold">{info.loan_amount}</div>
              </div>
            </div>
            <div
              onClick={handleRepayClick}
              className={`${
                isRemindShow || !repayAmount || isLoading ? "opacity-50" : ""
              } flex justify-center items-center w-full h-[50px] mt-[50px] bg-btngreen text-white cursor-pointer`}
            >
              Repay
            </div>
            {/* <div className="flex justify-center items-center w-full h-[50px] mt-[58px] bg-btngreen text-white cursor-pointer opacity-50">
                          Repay
                        </div> */}
          </div>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </>
  );
};

export default PageRepay;
