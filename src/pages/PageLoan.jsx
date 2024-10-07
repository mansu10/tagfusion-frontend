import { useState } from "react";

import {
  Popover,
  PopoverTrigger,
  PopoverSurface,
} from "@fluentui/react-popover";
import { GaugeComponent } from "react-gauge-component";
import Select from "react-select";
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
const PageLoan = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const dayList = [
    {
      days: 7,
      title: "1 week",
    },
    {
      days: 14,
      title: "2 week",
    },
    ,
    {
      days: 30,
      title: "4 week",
    },
  ];
  const [selectDay, setSelectDay] = useState(0);
  return (
    <div className="relative z-10 pt-[130px] px-[10px]">
      <div className="w-full h-[552px] rounded-[10px] bg-[#424242]">
        <div className="pt-[15px] pl-[15px] text-[12px] text-white">
          Credit Loan
        </div>
        <div className=" w-full">
          <GaugeComponent
            id="gauge-component"
            className="flex justify-center"
            arc={{
              gradient: true,
              width: 0.1,
              padding: 0,
              nbSubArcs: 150,
              subArcs: [{ color: "#F7C034" }],
            }}
            value={50}
            pointer={{
              type: "needle",
              elastic: true,
              color: "#F7C034",
            }}
            type="radial"
            labels={{
              valueLabel: {
                formatTextValue: (val) => val,
                hide: true,
              },

              tickLabels: {
                type: "inner",
                ticks: [
                  { value: 0 },
                  { value: 10 },
                  { value: 20 },
                  { value: 30 },
                  { value: 40 },
                  { value: 50 },
                  { value: 60 },
                  { value: 70 },
                  { value: 80 },
                  { value: 90 },
                  { value: 100 },
                ],
                defaultTickValueConfig: {
                  formatTextValue: (val) => val,
                },
              },
            }}
          />
          <div className="flex flex-col justify-center items-center translate-y-[-50px]">
            <div className="text-[#FFFFFFB2]  text-[12px] ">Credit Score</div>
            <div className="text-[24px] text-[#FFFFFFE5]">50</div>
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
          Borrow APY: 14%
        </div>
        <div className="px-[35px] text-[#79C077FF] text-[12px]">
          Borrow APY represents the annualized interest rate that a borrower
          pays on a loan.
        </div>
      </div>
      <div className="flex flex-col items-center w-full h-[826px] px-[20px] py-[48px] ">
        <div className="text-txtgreen text-[24px]">Borrow Amount</div>
        <div className="mt-[32px] text-[14px] text-white text-center">
          Based on your credit score, your borrowing range: 100u - 1000u
        </div>
        <div className="w-full">
          <div className="mt-[50px]">
            <input
              type="text"
              placeholder="Please enter the loan amount *"
              className="w-full px-[10px] py-[10px] border border-[#FFFFFF1F] text-[#FFFFFF8A] text-[16px] bg-[#FFFFFF1A] outline-none focus:border-b-[#FFA000FF]"
            />
          </div>
          <div className="flex mt-[20px] text-[12px]">
            {dayList.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setSelectDay(idx);
                }}
                className={`mr-[16px] px-[20px] py-[8px] border border-[#FFFFFF1F] text-[#FFFFFF8A] bg-[#FFFFFF1A] hover:border-[#FFA000FF] hover:text-[#FFA000FF] cursor-pointer ${
                  selectDay === idx ? "border-[#FFA000FF] text-[#FFA000FF]" : ""
                }`}
              >
                {item.title}
              </div>
            ))}
          </div>
          <div className="mt-[20px]">
            <div
              onClick={() => {
                setSelectDay(4);
              }}
              className={` inline-flex px-[20px] py-[8px] border border-[#FFFFFF1F] text-[#FFFFFF8A] text-[14px] bg-[#FFFFFF1A] cursor-pointer ${
                selectDay === 4 ? "border-[#FFA000FF] text-[#FFA000FF]" : ""
              }`}
            >
              Custom Days
            </div>
            <div className="mt-[20px]">
              <input
                type="number"
                onChange={() => {
                  setSelectDay(4);
                }}
                placeholder="Please enter the number of days *"
                className="w-full px-[10px] py-[10px] border border-[#FFFFFF1F] text-[#FFFFFF8A] text-[16px] bg-[#FFFFFF1A] outline-none focus:border-b-[#FFA000FF]"
              />
            </div>
          </div>
          <div className="flex justify-center items-center w-full h-[50px] mt-[50px] bg-btngreen text-white cursor-pointer">
            Connect Wallet
          </div>
        </div>
      </div>
    </div>
  );
};
export default PageLoan;
