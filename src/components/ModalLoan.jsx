import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
} from "@fluentui/react-dialog";
import { GaugeComponent } from "react-gauge-component";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import { useLoan } from "./UseLoan";

const ModalLoan = () => {
  const {
    amount,
    walletAddress,
    dayList,
    data,
    fetchData,
    inputDay,
    handleInputChange,
    selectDay,
    setSelectDay,
    handleDaysChange,
    isRemindShow,
    handleWalletButtonClick,
    options,
    selectedOption,
    setSelectedOption,
    createLoan,
    isLoading,
  } = useLoan();

  const [open, setOpen] = useState(false);

  const handleOpenDialog = (event, data) => {
    console.log(data);
    setOpen(data.open);
    if (data.open) {
      fetchData();
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={handleOpenDialog}>
        <DialogTrigger disableButtonEnhancement>
          <div className="hidden md:flex items-center h-12 mt-10 px-24 rounded-full bg-gradient-yellow cursor-pointer">
            BORROW NOW
          </div>
        </DialogTrigger>
        <DialogSurface style={{ maxWidth: "fit-content" }}>
          <DialogBody>
            <DialogContent>
              <div className="w-[896px] h-[620px]">
                <div className="scale-75 origin-top">
                  <div className="flex justify-center items-center">
                    <div className="flex-none flex flex-col items-center w-[596px] h-[826px] px-[56px] py-[48px]  rounded-[10px] bg-[#424242]">
                      <div className="text-txtgreen text-[48px]">
                        Borrow Amount
                      </div>
                      <div className="mt-[32px] text-[18px] text-white text-center">
                        Based on your credit score, your borrowing range: Based
                        on your credit score, your borrowing range: <br />
                        {data.min_loan_amount} ~ {data.max_loan_amount}
                      </div>
                      <div className="w-full">
                        <div className="relative mt-[30px]">
                          <input
                            value={amount}
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Please enter the loan amount *"
                            className="w-full px-[10px] py-[10px] border border-[#FFFFFF1F] text-[#FFFFFF8A] text-[16px] bg-[#FFFFFF1A] outline-none focus:border-b-[#FFA000FF]"
                          />
                          {isRemindShow && (
                            <div
                              className={`absolute bottom-[-20px] left-0 text-[#FFA000FF] text-[12px]`}
                            >
                              Please enter a number in the range of{" "}
                              {data.min_loan_amount} ~ {data.max_loan_amount}
                              {amount}
                            </div>
                          )}
                        </div>
                        <div className="flex mt-[20px] text-[12px]">
                          {dayList.map((item, idx) => (
                            <div
                              key={idx}
                              onClick={() => {
                                setSelectDay(idx);
                              }}
                              className={`mr-[30px] px-[20px] py-[8px] border  bg-[#FFFFFF1A] hover:border-[#FFA000FF] hover:text-[#FFA000FF] cursor-pointer ${
                                selectDay === idx
                                  ? "border-[#FFA000FF] text-[#FFA000FF]"
                                  : "border-[#FFFFFF1F] text-[#FFFFFF8A]"
                              }`}
                            >
                              {item.title}
                            </div>
                          ))}
                        </div>
                        <div className="mt-[30px]">
                          <div
                            onClick={() => {
                              setSelectDay(4);
                            }}
                            className={` inline-flex px-[20px] py-[8px] border  text-[14px] bg-[#FFFFFF1A] cursor-pointer ${
                              selectDay === 4
                                ? "border-[#FFA000FF] text-[#FFA000FF]"
                                : "border-[#FFFFFF1F] text-[#FFFFFF8A]"
                            }`}
                          >
                            Custom Days
                          </div>
                          <div className="mt-[30px]">
                            <input
                              value={inputDay}
                              type="number"
                              onChange={handleDaysChange}
                              placeholder="Please enter the number of days *"
                              className="w-full px-[10px] py-[10px] border border-[#FFFFFF1F] text-[#FFFFFF8A] text-[16px] bg-[#FFFFFF1A] outline-none focus:border-b-[#FFA000FF]"
                            />
                          </div>
                        </div>
                        {walletAddress ? (
                          <div
                            onClick={() => {
                              createLoan(() => {
                                setOpen(false)
                              })
                            }}
                            className={`flex justify-center items-center w-full h-[50px] mt-[114px] bg-btngreen text-white cursor-pointer ${
                              isLoading || !amount ? "opacity-50" : ""
                            }`}
                          >
                            Borrow
                          </div>
                        ) : (
                          <div
                            onClick={handleWalletButtonClick}
                            className={`flex justify-center items-center w-full h-[50px] mt-[114px] bg-btngreen text-white cursor-pointer`}
                          >
                            Connect Wallet
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center  h-[745px] pl-[20px] pr-[129px] bg-[#ffffff78] rounded-r-[24px]">
                      <div className="w-[450px] h-[552px] rounded-[10px] bg-[#424242]">
                        <div className="pt-[15px] pl-[15px] text-[12px] text-white">
                          Credit Loan
                        </div>
                        <div className=" w-[415px]">
                          <GaugeComponent
                            id="gauge-component"
                            className="flex justify-center"
                            arc={{
                              gradient: true,
                              width: 0.1,
                              padding: 0,
                              // nbSubArcs: 150,
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
                          <div className="flex flex-col justify-center items-center translate-y-[-10px]">
                            <div className="text-[#FFFFFFB2]  text-[12px] ">
                              Credit Score
                            </div>
                            <div className="text-[24px] text-[#FFFFFFE5]">
                              {Math.round(data.credit_score)}
                            </div>
                          </div>
                        </div>

                        <div className="px-[35px] mt-[10px]">
                          <Select
                            defaultValue={selectedOption}
                            onChange={setSelectedOption}
                            options={options}
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                backgroundColor: "#FFFFFF08",
                                border: "transparent",
                                borderBottom: "1px solid #FFA000FF",
                                borderRadius: "0",
                                outline: "none",
                                color: "#ffffff",
                                boxShadow: "transparent",
                                "&:hover": {
                                  border: "transparent",
                                },
                              }),
                              singleValue: (baseStyles, state) => ({
                                ...baseStyles,
                                color: "#ffffff",
                              }),
                              indicatorSeparator: (baseStyles, state) => ({
                                ...baseStyles,
                                backgroundColor: "transparent",
                              }),
                              container: (baseStyles, state) => ({
                                ...baseStyles,
                                borderBottom: "1px solid transparent",
                              }),
                            }}
                          />
                        </div>
                        <div className="px-[35px] py-[15px] text-white text-[14px]">
                          Borrow APY: {(data.borrow_APY * 100).toFixed(2)}%
                        </div>
                        <div className="px-[35px] text-[#79C077FF] text-[12px]">
                          Borrow APY represents the annualized interest rate
                          that a borrower pays on a loan.
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
      <ToastContainer />
    </div>
  );
};

export default ModalLoan;
