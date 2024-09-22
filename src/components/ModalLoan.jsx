const ModalLoan = () => {
  return (
    <div
      id="static-modal"
      data-modal-backdrop="static"
      tabindex="-1"
      aria-hidden="true"
      className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="flex justify-center items-center">
        <div className="flex flex-col items-center w-[596px] h-[828px] p-[56px] rounded-[10px] bg-[#424242]">
          <div className="text-txtgreen text-[48px]">123123</div>
          <div className="text-[18px] text-white">
            Based on your credit score, your borrowing range: 100u - 1000u
          </div>
          <div className="w-full">
            <div className="flex mt-[41px]">
              <div className="mr-[30px] px-[22px] py-[8px] border border-[#FFFFFF1F] text-[#FFFFFF8A] bg-[#FFFFFF1A]">
                1week
              </div>
              <div className="mr-[30px] px-[22px] py-[8px] border border-[#FFFFFF1F] text-[#FFFFFF8A] bg-[#FFFFFF1A]">
                1week
              </div>
              <div className="mr-[30px] px-[22px] py-[8px] border border-[#FFFFFF1F] text-[#FFFFFF8A] bg-[#FFFFFF1A]">
                1week
              </div>
            </div>
            <div className=" mt-[30px]">
              <div className="inline-flex px-[22px] py-[8px] border border-[#FFFFFF1F] text-[#FFFFFF8A] bg-[#FFFFFF1A]">
                123
              </div>
              <div className="mt-[30px]">
                <input
                  type="text"
                  className="w-full px-[22px] py-[8px] border border-[#FFFFFF1F] text-[#FFFFFF8A] bg-[#FFFFFF1A]"
                />
              </div>
            </div>
            <div className="flex justify-center items-center w-full h-[50px] mt-[114px] bg-btngreen text-white">
              Connect Wallet
            </div>
          </div>
        </div>
        <div className="flex items-center w-[619px] h-[745px] pl-[39px] bg-[#ffffff78] rounded-r-[48px]">
          <div className="w-[451px] h-[552px] rounded-[10px] bg-[#424242]"></div>
        </div>
      </div>
    </div>
  );
};

export default ModalLoan;
