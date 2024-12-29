import { useState, useEffect } from "react";
import { fetchApiByUrl } from "../api/index"
import PanelBox from "../components/PanelBox";
import {
  InputCustom,
  TextareaCustom,
  UploadCustom,
  SelectCustom,
} from "../components/FormItems";
import TFButton from "../components/TFButton";
import ModalChainData from "../components/ModalChainData";
const PageChain = () => {

  const [step, setStep] = useState(1)

  const handleStepBack = () => {
    setStep(0)
  }

  const fetchLink = (url) => {
    if (!url) {
      return
    }
    fetchApiByUrl({
      "api_url": url,
      "method": "POST",
      "request_data": ""
    })
  }



  return (
    <div className="flex justify-center pt-[100px] px-[18px] relative z-10">
      <PanelBox title="Create Your Tags" className="w-full">
        {step === 0 && <QueryForm></QueryForm>}
        {step === 1 && <SubmitForm onBackClick={handleStepBack}></SubmitForm>}
      </PanelBox>
    </div>
  );
};

const QueryForm = () => {
  const hanldeSelectChange = () => {}
  return (
    <div className="flex">
      <div className="flex-1">
        <div className="flex">
          <div className="flex-1">
            <InputCustom label="enter the api endpoint"></InputCustom>
          </div>
          <div className="flex-none ml-[6px]">
            <SelectCustom onChange={hanldeSelectChange}></SelectCustom>
          </div>
        </div>
        <div className="mt-[16px]">
          <TextareaCustom
            label="Enter other parameters (if any)"
            type="textarea"
          ></TextareaCustom>
        </div>
        <div className="text-white">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
          nesciunt veritatis voluptatibus nemo fugit qui soluta consectetur amet
          repudiandae minima ullam perspiciatis tempore doloremque aliquam est,
          illum aperiam veniam iusto.
        </div>
      </div>
      <div className="ml-[16px] leading-[16px]">
        <TFButton>query</TFButton>
      </div>
    </div>
  );
};

const SubmitForm = ({ onBackClick }) => {
  return (
    <div>
      <div className="flex flex-col">
        <div>
          <UploadCustom></UploadCustom>
        </div>
        <div className="mt-[16px]">
          <InputCustom></InputCustom>
        </div>
        <div className="mt-[16px]">
          <InputCustom></InputCustom>
        </div>
      </div>
      <div className="flex mt-[6px]">
        <TFButton className="py-[10px] leading-[14px]">Submit</TFButton>
        <TFButton className="py-[10px] ml-[6px] leading-[14px]" onClick={() => {
          onBackClick?.call()
        }}>Back</TFButton>
      </div>
    </div>
  );
};

export default PageChain;
