import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
} from "@fluentui/react-dialog";

const ModalRepay = () => {
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
    {
      days: 30,
      title: "All",
    },
  ];

  const [selectDay, setSelectDay] = useState(0);

  return (
    <div>
      <Dialog>
        <DialogTrigger disableButtonEnhancement>
          <span className="cursor-pointer">Repay</span>
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
                      <div className="w-full">
                        <div className="mt-[30px]">
                          <input
                            type="text"
                            placeholder="Please enter the loan amount *"
                            className="w-full px-[10px] py-[10px] border border-[#FFFFFF1F] text-[#FFFFFF8A] text-[16px] bg-[#FFFFFF1A] outline-none focus:border-b-[#FFA000FF]"
                          />
                        </div>
                        <div className="flex mt-[41px] text-[12px]">
                          {dayList.map((item, idx) => (
                            <div
                              key={idx}
                              onClick={() => {
                                setSelectDay(idx);
                              }}
                              className={`mr-[30px] px-[20px] py-[8px] border border-[#FFFFFF1F] text-[#FFFFFF8A] bg-[#FFFFFF1A] hover:border-[#FFA000FF] hover:text-[#FFA000FF] cursor-pointer ${
                                selectDay === idx
                                  ? "border-[#FFA000FF] text-[#FFA000FF]"
                                  : ""
                              }`}
                            >
                              {item.title}
                            </div>
                          ))}
                        </div>
                        <div className="">
                          <div className="flex justify-between mt-[41px] text-[18px] text-white">
                            <div>Total Borrowed:</div>
                            <div className="bold">$1400</div>
                          </div>
                          <div className="flex justify-between mt-[41px] text-[18px] text-white">
                            <div>Borrow APY:</div>
                            <div className="bold">$1400</div>
                          </div>
                          <div className="flex justify-between mt-[41px] text-[18px] text-white">
                            <div>Borrowed(Tura):</div>
                            <div className="bold">$1400</div>
                          </div>
                        </div>
                        <div className="flex justify-center items-center w-full h-[50px] mt-[58px] bg-btngreen text-white cursor-pointer">
                          Repay
                        </div>
                        <div className="flex justify-center items-center w-full h-[50px] mt-[58px] bg-btngreen text-white cursor-pointer opacity-50">
                          Repay
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
    </div>
  );
};

export default ModalRepay;
