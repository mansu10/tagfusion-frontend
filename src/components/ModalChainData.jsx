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
// EBYYDbav6QgAM7JgYJcJgSKDgDvV8edgYJH5QmaAtZ6N
const ModalChainData = ({ children, chain }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);


  return (
    <Dialog >
      <DialogTrigger disableButtonEnhancement>{children}</DialogTrigger>
      <DialogSurface style={{ maxWidth: "fit-content" }}>
        <DialogBody>
          <DialogContent>
            <div className="max-w-[1200px]">
              <div className="origin-top">
                <div className="flex justify-center items-center">
                  <div className="relative flex-none flex flex-col items-center  w-[85%] md:w-[596px] px-[20px] md:px-[56px] py-[20px] md:py-[48px]  rounded-[10px] bg-[#424242]">
                    <div className="max-h-[200px] min-w-[260px] overflow-auto mt-[32px] text-[14px] text-white text-left whitespace-pre-line">
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit iusto ea et recusandae sint quisquam voluptas, nemo sapiente libero alias, quia ducimus animi minima placeat, exercitationem nihil at deleniti voluptate!</p>
                    </div>
                    <div className="w-full">
                      <div className="w-full h-[150px] mt-[20px] p-[8px] border border-[#FFA000FF] text-[14px] text-white text-left overflow-auto text-wrap whitespace-pre break-words">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi aliquid provident ipsa. Distinctio quos qui cum repellendus minus quisquam delectus atque quam deserunt facere. Tempore esse facere at omnis sint?
                      </div>
                      <div className="flex justify-center">
                        <div
                          className={`flex justify-center items-center h-[40px] mt-[20px] px-[15px] bg-btngreen text-white cursor-pointer`}
                        >
                          Submit
                        </div>
                        <div
                       
                          className={`flex justify-center items-center h-[40px] mt-[20px] ml-[8px] px-[15px] bg-btngreen text-white cursor-pointer `}
                        >
                          close
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


export default ModalChainData;