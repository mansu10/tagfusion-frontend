import {
  InputCustom,
  UploadCustom,
  CheckBoxCustom,
} from "../components/FormItems";
import TFButton from "../components/TFButton";

const PageCard = () => {
  return (
    <div className="flex flex-col items-center pt-[176px]">
      <div className="text-txtgreen text-[48px]">Create My Tagfusion Card</div>
      <div className="grid grid-cols-2 gap-x-[28px] gap-y-[45px] w-[804px] mt-[98px]">
        <div>
          <InputCustom label="User Name*"></InputCustom>
        </div>
        <div>
          <InputCustom label="Bio*"></InputCustom>
        </div>
        <div>
          <InputCustom label="Address*"></InputCustom>
        </div>
        <div>
          <InputCustom label="Link*"></InputCustom>
        </div>
        <div className="col-span-2">
          <UploadCustom></UploadCustom>
          <div className="flex justify-between mt-[60px]">
            <div className=" text-white flex items-start leading-[22px] text-[16px]">
              <div className="h-[22px] mt-[1px]">
                <CheckBoxCustom></CheckBoxCustom>
              </div>
              <div className="ml-[16px]">
                I have read and accept the Terms of
                <br />
                <span className="text-[#8AE288FF]">
                  <a className="hover:underline" href="#">
                    Service & Privacy Policy
                  </a>
                  *
                </span>
              </div>
            </div>
            <TFButton className="px-[80px]">Create</TFButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageCard;
