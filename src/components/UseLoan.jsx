import { useState } from "react";
import { toast } from "react-toastify";

import { axiosInstance } from "../config/config";
const options = [{ value: "tags", label: "tags" }];

const useLoan = () => {
  const dayList = [
    {
      days: 7,
      title: "1 week",
    },
    {
      days: 14,
      title: "2 week",
    },
    {
      days: 30,
      title: "4 week",
    },
  ];

  const [amount, setAmount] = useState("");
  const [selectDay, setSelectDay] = useState(0);
  const [inputDay, setInputDay] = useState("");
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [walletAddress, setWalletAddress] = useState(null);
  const [isRemindShow, setIsRemindShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 获取基本借贷信息
  const [data, setData] = useState({
    credit_score: 0,
    borrow_APY: 0,
    max_loan_amount: 0,
    min_loan_amount: 0,
  });

  const fetchData = async () => {
    const address = localStorage.getItem("tura_address");
    if (!address) {
      return;
    }
    setWalletAddress(address);
    const response = await axiosInstance.get(
      "tagfusion/api/account_loan_info",
      {
        params: { address },
      }
    );
    if (response.data.code === 0) {
      const result = response.data.message.data;
      setData(result);
    }
  };
  const handleInputChange = (e) => {
    let val = e.target.value;
    val = val.replace(/[^\d\.]/g, "");
    setIsRemindShow(false);
    setAmount(val);
  };
  const handleDaysChange = (e) => {
    let val = e.target.value;
    val = val.replace(/[^\d]/g, "");
    setSelectDay(4);
    setInputDay(val);
  };

  const handleWalletButtonClick = async () => {
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
  // create loan
  const createLoan = async (callback = () => {}) => {
    if (isLoading) {
      return;
    }
    const obj = {
      address: walletAddress,
      currency: selectedOption.value,
      borrow_APY: data.borrow_APY,
      loan_amount: amount,
      repayment_date: 0,
    };
    if (dayList[selectDay]) {
      obj.repayment_date = dayList[selectDay].days;
    } else {
      obj.repayment_date = inputDay;
    }

    if (amount < data.min_loan_amount || amount > data.max_loan_amount) {
      // toast
      setIsRemindShow(true);
      return;
    }
    if (!obj.loan_amount) {
      toast.error("please enter the amount");
      return;
    }

    if (!obj.repayment_date) {
      toast.error("please enter the days");
      return;
    }
    setIsLoading(true);

    const formData = new FormData();
    formData.append("address", obj.address);
    formData.append("currency", obj.currency);
    formData.append("borrow_APY", obj.borrow_APY);
    formData.append("loan_amount", obj.loan_amount);
    formData.append("repayment_date", obj.repayment_date);

    try {
      const response = await axiosInstance.post(
        "/tagfusion/api/create_loan/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.code === 0) {
        toast.success(`Borrow Successful`);
        setIsLoading(false);
        callback?.call();
      } else {
        setIsLoading(false);
        toast.error(response.data.message);
      }
    } catch (e) {
      console.log(e);
      toast.error(`request failed`);
      setIsLoading(false);
    }
  };

  return {
    data,
    amount,
    setAmount,
    options,
    dayList,
    walletAddress,
    createLoan,
    handleWalletButtonClick,
    selectDay,
    setSelectDay,
    handleDaysChange,
    handleInputChange,
    fetchData,
    isRemindShow,
    selectedOption,
    setSelectedOption,
    createLoan,
    isLoading,
    inputDay,
  };
};

export { useLoan };
