import Web3CitizenCard from "../components/Web3CitizenCard";

const Web3card = () => {
   return (
      <div className='w-full h-full flex flex-col items-center justify-center'>
         <div className="w-fit flex flex-col p-7 justify-center  items-center shadow-lg rounded-3xl bg-clip-padding bg-opacity-5 border border-[#BE7123] backdrop-blur-[5px]">
            <h1 className='text-3xl uppercase font-bold text-primary-default'>My Web3 DID</h1>
            <p className='text-xl text-[#F7D5B4] mb-4'>
               Now you have your first citizen card!
            </p>

            <Web3CitizenCard />

            <div className='max-w-sm w-full mx-auto flex justify-between pt-4'>
               <div className='text-white underline gap-2 flex items-center'>
                  <img src="/icons/download.svg" alt="download" className="w-5 h-5 " />
                  Download to Share!
               </div>
               <div className='text-white underline flex gap-2 items-center'>
                  <img src="/icons/copy.svg" alt="copy" className="w-5 h-5 " />
                  Copy DID Card!
               </div>
            </div>
         </div>
      </div>
   );
};

export default Web3card;