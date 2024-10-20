import TFButton from "./TFButton";

const CardBox = ({ title, desc, btnLink, btnTitle, idx, onAction }) => {
  return (
    <div className="flex bg-[#3A3A3A] w-full md:w-[21.25rem] rounded-2xl  p-5 shadow-[0px 2px 120px 0px rgba(0,0,0,0.1)]">
      <div className="flex items-center w-11 flex-none mr-6">
        <img className="w-11" src={`/images/card_${idx + 1}.png`} alt="" />
      </div>
      <div className="flex flex-col justify-between items-start">
        <div>
          <div
            className="text-[#41B48A] font-semibold cursor-pointer"
            onClick={onAction?.bind(this, idx)}
          >
            {title}
          </div>
          <div className="mt-4 text-[12px] text-white/[.6]">{desc}</div>
        </div>
        {btnTitle && (
          <div className="flex items-center justify-center mt-[22px] rounded-full h-10 border-solid border border-[#79C077] text-white text-[14px] hover:bg-white/[.05] cursor-pointer">
            <TFButton className="bg-transparent leading-none " link={btnLink} onClick={btnLink ? () =>{}: onAction?.bind(this, idx)} >
              {btnTitle}
            </TFButton>
          </div>
        )}
      </div>
    </div>
  );
};


export default CardBox