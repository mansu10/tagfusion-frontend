import {useState} from 'react'
import PanelBox from "../components/PanelBox"
import TFButton from '../components/TFButton';

const PageTags = () => {
   const [categories, setCategories] = useState([1,2,3]);

  return (
    <div className="flex justify-center pt-[118px]">
      <PanelBox title="Create Your Tags">
        <div className="flex justify-center items-center md:items-start flex-col md:flex-row">
          {categories.map((item) => (
            <div className="flex justify-center w-[180px] mx-[10px] mb-[20px] px-[32px] py-[8px] rounded-[8px] border border-[#FFFFFF33] text-white text-[18px] hover:bg-btngreen cursor-pointer">
              {item}
            </div>
          ))}
        </div>
        <div className="flex items-center py-[20px] md:py-[40px]">
          <div className="flex-1 w-full h-[1px] bg-[#ffffffa3]"></div>
          <div className="mx-[20px] md:mx-[72px] text-[#FFFFFF8A]">Please Select Tags</div>
          <div className="flex-1 w-full h-[1px] bg-[#ffffffa3]"></div>
        </div>
        <div className="grid grid-cols-3 gap-x-[30px] gap-y-[30px] w-full md:w-[690px] text-[#FFFFFF8A]">
          <div className="flex justify-center items-center py-[8px] border border-[#FFFFFF1F]">
            123
          </div>
          <div className="flex justify-center items-center py-[8px] border border-[#FFFFFF1F]">
            123
          </div>
          <div className="flex justify-center items-center py-[8px] border border-[#FFFFFF1F]">
            123
          </div>
          <div className="flex justify-center items-center py-[8px] border border-[#FFA000FF] text-[#FF6F00FF]">
            123
          </div>
        </div>
        <TFButton className="w-full mt-[75px] leading-[20px]">Create</TFButton>
      </PanelBox>
    </div>
  );
}

export default PageTags