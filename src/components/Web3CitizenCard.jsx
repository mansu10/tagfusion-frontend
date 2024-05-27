
const Web3CitizenCard = () => {
   return (
      <div className="max-w-sm mx-auto gradient-button rounded-2xl overflow-hidden shadow-lg relative text-white flex flex-col">
         <div className='px-8 py-5'>
            <div className='flex justify-between  items-start'>
               <div className=" font-semibold flex flex-col gap-1">
                  <span className='text-lg leading-none'>Web3 Citizen Card</span>
                  <span className='text-base text-white/40 uppercase leading-none'>Life time</span>
               </div>
               <div className="text-lg font-semibold leading-none">Mint Pass</div>
            </div>
            <div className="mt-2 flex flex-col items-center">
               <div className="w-28 h-28 bg-gray-200 rounded-full overflow-hidden">
                  <img src="/icons/avatar.svg" alt="Profile" className="w-full h-full object-cover" />
               </div>
               <div className="mt-4 text-lg font-bold">追风lab</div>
               <div className="mt-2 text-sm text-white/80 underline">ulas1....srvvhp</div>
               <div className="mt-4 text-center text-xs">
                  <p>显著认知。假设空冲设名；带你臻海...</p>
               </div>
               <div className="my-4 flex justify-center space-x-14">
                  <div
                     className=" rounded-full bg-black/20 backdrop-blur-3xl p-2"
                  >
                     <img src="/icons/twitter.svg" alt="twitter" className='w-5 h-fit invert object-cover' />
                  </div>
                  <div
                     className=" rounded-full bg-black/20 backdrop-blur-3xl p-2 "
                  >
                     <img src="/icons/linkedin.svg" alt="linkedin" className='w-5 h-fit invert object-cover' />
                  </div>
               </div>
            </div>
            <div className="text-xs">
               <p>Trust Online World 3.0 Social Network Where Trust Diffuses</p>
            </div>
         </div>
         <div className="text-lg font-bold mt-auto px-8 py-4 bg-black/20 backdrop-blur-3xl flex justify-end items-center gap-2">
            <img src="/icons/logo.png" alt="logo" className="w-10 object-contain rounded" />
         </div>
      </div>
   );
};

export default Web3CitizenCard;
