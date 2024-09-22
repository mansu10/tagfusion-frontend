import { useEffect, useState } from "react";
import PanelBox from '../components/PanelBox'
const MyTags = () => {
  return (
    <PanelBox title="My Tags">
      <div className="">
        <div className="grid grid-cols-2 gap-x-[50px] gap-y-[30px] text-white">
          <div className="inline-flex justify-center items-center min-w-[200px] min-h-[40px] border border-[#FFFFFF33] rounded-[8px]">
            123
          </div>
          <div className="inline-flex justify-center items-center min-w-[200px] min-h-[40px] border border-[#FFFFFF33] rounded-[8px]">
            123
          </div>
          <div className="inline-flex justify-center items-center min-w-[200px] min-h-[40px] border border-[#FFFFFF33] rounded-[8px]">
            123
          </div>
          <div className="inline-flex justify-center items-center min-w-[200px] min-h-[40px] border border-[#FFFFFF33] rounded-[8px]">
            123
          </div>
        </div>
      </div>
    </PanelBox>
  );
}

const MyPositions = () => {
  return (
    <PanelBox title="My Positions">
      <div className="">
        <div class="relative overflow-x-auto">
          <div className="table w-full p-[20px] text-sm text-left  text-gray-500 ">
            <div className="table-row">
              <div className="table-cell">Borrowed Date</div>
              <div className="table-cell">Borrow Asset</div>
              <div className="table-cell">Borrow Amount</div>
              <div className="table-cell">Borrow APY</div>
              <div className="table-cell">Debt</div>
              <div className="table-cell"></div>
            </div>
          </div>
          <div className="table w-full mb-[16px] p-[26px] text-sm text-left  text-black bg-white rounded-[10px]">
            <div className="table-row">
              <div className="table-cell">12 Dec, 2024 10:15AM</div>
              <div className="table-cell">Tura</div>
              <div className="table-cell">$1200</div>
              <div className="table-cell">10.12%</div>
              <div className="table-cell">$1761</div>
              <div className="table-cell">Repay</div>
            </div>
          </div>
          <div className="table w-full mb-[16px] p-[26px] text-sm text-left  text-black bg-white rounded-[10px]">
            <div className="table-row">
              <div className="table-cell">12 Dec, 2024 10:15AM</div>
              <div className="table-cell">Tura</div>
              <div className="table-cell">$1200</div>
              <div className="table-cell">10.12%</div>
              <div className="table-cell">$1761</div>
              <div className="table-cell">Repay</div>
            </div>
          </div>
        </div>
      </div>
    </PanelBox>
  );
}

const MyRewards = () => {
  return (
    <PanelBox title="My Rewards">
      <div className="">
        <div className="bg-white px-[44px] py-[30px] rounded-[20px]">
          <div className="flex justify-between pb-[26px] border-b font-semibold">
            <div>My Rewards</div>
            <div>0Tags</div>
          </div>
          <div className="pt-[26px] pb-[5px]">
            <div className="flex justify-between mb-[10px] font-semibold">
              <div>My Rewards</div>
              <div>0Tags</div>
            </div>
            <div className="flex justify-between mb-[5px] pr-[94px]">
              <div className="flex items-center">
                <div className="inline-flex w-[15px] h-[15px] mr-[10px] border-[3px] border-[#F67932FF] rounded-full "></div>
                Total Count
              </div>
              <div>+0</div>
            </div>
          </div>
          <div className="pt-[26px] pb-[5px]">
            <div className="flex justify-between mb-[10px] font-semibold">
              <div>My Rewards</div>
              <div>0Tags</div>
            </div>
            <div className="flex justify-between mb-[5px] pr-[94px]">
              <div className="flex items-center">
                <div className="inline-flex w-[15px] h-[15px] mr-[10px] border-[3px] border-[#00A84DFF] rounded-full "></div>
                Total Count
              </div>
              <div>+0</div>
            </div>
            <div className="flex justify-between mb-[5px] pr-[94px]">
              <div className="flex items-center">
                <div className="inline-flex w-[15px] h-[15px] mr-[10px] border-[3px] border-[#00A84DFF] rounded-full "></div>
                Total Count
              </div>
              <div>+0</div>
            </div>
            <div className="flex justify-between mb-[5px] pr-[94px]">
              <div className="flex items-center">
                <div className="inline-flex w-[15px] h-[15px] mr-[10px] border-[3px] border-transparent rounded-full "></div>
                Total Count
              </div>
              <div>+0</div>
            </div>
          </div>
        </div>
      </div>
    </PanelBox>
  );
}

const PageMine = () => {
  const [active, setActive] = useState(0);
  const tabs = [
    {
      title: "My Tags",
    },
    {
      title: "My Positions",
    },
    {
      title: "My Rewards",
    },
  ];
  const handleTabClick = (idx) => {
    setActive(idx);
  };

  const [tags, setTags] = useState([123,123]);

  return (
    <div className="relative flex justify-center">
      <div>
        <div className="sticky top-[140px] flex-none">
          <div className="flex flex-col items-center w-[213px] p-[25px] rounded-[20px] bg-[#424242] text-white leading-[22px]">
            <div className="flex-none rounded-full bg-white w-[84px] h-[84px]"></div>
            <div className="mt-[30px]">name</div>
            <div className="mt-[30px]">1231</div>
            <div>1231</div>
          </div>
          <div className="flex flex-col w-[213px] mt-[60px]">
            {tabs.map((item, idx) => {
              return (
                <div
                  className={`h-[50px] mt-[10px] text-[#388379] flex items-center justify-center cursor-pointer hover:bg-btngreen hover:text-white transition-all ${
                    idx === active ? "bg-btngreen text-white" : ""
                  }`}
                  onClick={() => handleTabClick(idx)}
                >
                  {item.title}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="pt-36 min-h-screen">
        {active === 0 && <MyTags></MyTags>}
        {active === 1 && <MyPositions></MyPositions>}
        {active === 2 && <MyRewards></MyRewards>}
      </div>
    </div>
  );
};

export default PageMine;
