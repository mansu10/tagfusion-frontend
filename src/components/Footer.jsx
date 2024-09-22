const Footer = () => {
  return (
    <div className="w-full max-w-[1240px] h-[205px] mx-auto pt-[40px] text-white">
      <div className="flex flex-col md:flex-row justify-around items-center h-[80px]">
        <div className="text-[20px] underline">TagFusion Announcement</div>
        <div className="flex flex-col md:flex-row">
          <div className="mr-[50px]">+49 163 1111111</div>
          <div>alicealison@gmail.com</div>
        </div>
        <div className="flex">
          <div className="w-[32px] h-[32px] ml-[33px] bg-white"></div>
          <div className="w-[32px] h-[32px] ml-[33px] bg-white"></div>
          <div className="w-[32px] h-[32px] ml-[33px] bg-white"></div>
        </div>
      </div>
      <div className="mt-[20px] text-center">
        © 2024 TagFusion. All rights reserved.
      </div>
    </div>
  );
}

export default Footer