import { useState, useEffect } from "react";

import PanelBox from "../components/PanelBox";
import { InputCustom } from "../components/FormItems";
import  TFButton  from "../components/TFButton";
const PageChain = () => {
  return (
    <div className="flex justify-center pt-[100px] px-[18px] relative z-10">
      <PanelBox title="Create Your Tags" className="w-full">
        <div className="flex">
          <div className="flex-1">
            <InputCustom label="enter the api endpoint"></InputCustom>
          </div>
          <div className="ml-[16px] leading-[16px]">
            <TFButton>query</TFButton>
          </div>
        </div>
        <div>
          
        </div>
      </PanelBox>
    </div>
  );
};

export default PageChain;
