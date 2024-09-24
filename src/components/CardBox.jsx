
const CardBox = ({ title, desc, btnLink, btnTitle, idx }) => {
  return (
    <div className="flex bg-[#3A3A3A] w-full md:w-[21.25rem] rounded-2xl  p-5 shadow-[0px 2px 120px 0px rgba(0,0,0,0.1)]">
      <div className="flex items-center w-11 flex-none mr-6">
        <img className="w-11" src={`/images/card_${idx + 1}.png`} alt="" />
      </div>
      <div className="flex flex-col justify-between items-start">
        <div>
          <div className="text-[#41B48A] font-semibold">{title}</div>
          <div className="mt-4 text-xs text-white/[.6]">{desc}</div>
        </div>
        {btnTitle && (
          <div className="flex items-center justify-center mt-4 px-7 rounded-full h-10 border-solid border border-[#79C077] text-white hover:bg-white/[.05] cursor-pointer">
            <a
              href={btnLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {btnTitle}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};


export default CardBox