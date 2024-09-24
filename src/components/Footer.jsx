const Footer = () => {
  return (
    <div className="w-full max-w-[1240px] h-[205px] mx-auto pt-[40px] text-white">
      <div className="flex flex-col md:flex-row justify-around items-center h-[80px]">
        <div className="text-[20px] underline">TagFusion Announcement</div>
        <div className="flex flex-col md:flex-row">
          <div className="flex items-center mr-[50px]">
            <img
              className="w-[22px] mr-[16px]"
              src="/images/icon_phone.png"
              alt=""
            />
            <span>+49 163 1111111</span>
          </div>
          <div className="flex items-center">
            <img
              className="w-[19px] mr-[16px]"
              src="/images/icon_email.png"
              alt=""
            />
            <span>alicealison@gmail.com</span>
          </div>
        </div>
        <div className="flex">
          <div className="w-[32px] h-[32px] ml-[33px] bg-white"></div>
          <div className="w-[32px] h-[32px] ml-[33px] bg-white"></div>
          <div className="w-[32px] h-[32px] ml-[33px] bg-white"></div>
        </div>
      </div>
      <div className="mt-[20px] text-center">
        © {new Date().getFullYear()} TagFusion. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
