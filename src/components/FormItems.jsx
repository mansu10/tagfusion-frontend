const UploadCustom = () => {
  return (
    <div className="custom-upload relative">
      <label>Upload Pic*</label>
      <div className="btn-select hidden items-center pt-[38px] pl-[6px] rounded-md focus:bg-black">
        <label
          htmlFor="uploadPic"
          className="px-[30px] py-[15px] text-[14px] leading-[17px] hover:text-white border border-[#79C077FF] cursor-pointer  hover:bg-[#FFFFFF09] "
        >
          Select
          <input type="file" id="uploadPic" className="hidden" />
        </label>
      </div>
    </div>
  );
};

const InputCustom = ({ label }) => {
  return (
    <div className="custom-ipt">
      <input size="large" required className="" />
      <label>{label}</label>
    </div>
  );
};

const CheckBoxCustom = () => {
  return (
    <div className="custom-ckb ">
      <input
        type="checkbox"/>
    </div>
  );
};

export { InputCustom, UploadCustom, CheckBoxCustom };
