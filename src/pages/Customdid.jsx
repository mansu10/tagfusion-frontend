import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const Customdid = () => {
   const [currentStep, setCurrentStep] = useState(1);
   const steps = [
      {
         id: 1,
         text: "Connect your wallet",
         buttonText: "Connect",
      },
      {
         id: 2,
         text: "Token faucet",
         buttonText: "Get Tokens",
      },
      {
         id: 3,
         text: "Connect with your Twitter",
         buttonText: "Connect",
      },
      {
         id: 4,
         text: "Follow @ulas_network",
         buttonText: "Follow",
      },
   ];

   return (
      <div className="w-full h-full flex items-center justify-center">
         <div
            className="relative flex flex-col md:flex-row w-[90%] max-w-[1024px] shadow-lg rounded-3xl bg-clip-padding bg-opacity-5 border border-[#BE7123]"
            style={{ backdropFilter: "blur(5px)" }}
         >
            <div className=" p-4 sm:p-6 flex flex-col gap-2 md:gap-5 relative justify-center w-full md:w-[80%] lg:w-[60%] border-b md:border-b-0 md:border-r border-[#B66624]">

               <Link to="/" className="w-8 h-8 sm:w-10 sm:h-10 flex justify-center md:absolute top-4 cursor-pointer gradient-button rounded-full left-4 items-center">
                  <img src="/icons/back-icon.svg" alt="" className="w-5 h-5" />
               </Link>

               <p className="text-[#F7D5B4] text-xl sm:text-3xl md:text-5xl font-extrabold leading-snug">
                  CLAIM MY FIRST WEB3 DID CARD
               </p>

               {
                  currentStep !== 5 &&
                  <Button
                     className="w-[180px] hover:bg-gradient-red-orange hover:shadow-custom-shadow hover:border-0"
                     text="View Example"
                  />
               }

               {
                  currentStep === 5 &&
                  <Link to="/card">
                     <Button
                        className="w-[180px] hover:bg-gradient-red-orange hover:shadow-custom-shadow hover:border-0"
                        text="Custom My DID"
                     />
                  </Link>
               }
            </div>
            <div className="flex flex-col my-2 md:my-10 p-4 sm:p-6 gap-10 w-full">
               {steps.map((step) => (
                  <div
                     key={step.id}
                     className="flex sm:flex-row flex-col items-start sm:items-center justify-between"
                  >
                     <div className="flex items-center mb-1 sm:mb-0 sm:h-11 gap-4">
                        <div
                           className={`flex items-center justify-center w-8 h-8 rounded-full border ${step.id < currentStep && "gradient-button border-none text-[0px]"
                              } border-primary-default text-primary-default font-bold relative`}
                        >
                           {
                              (step.id < currentStep && step.id != 4) &&
                              <div className="absolute w-[2px] h-[140%] sm:h-[170%] gradient-button top-full"></div>
                           }

                           {
                              step.id < currentStep &&
                              <img src="/icons/tick.svg" alt="" className="w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                           }
                           {step.id}
                        </div>
                        <p className="text-[#F7D5B4] font-medium text-base sm:text-lg">
                           {step.text.toUpperCase()}
                        </p>
                     </div>

                     <Button
                        className={`${currentStep !== step.id && "hidden"}  ml-[48px] sm:ml-0 hover:bg-gradient-red-orange hover:shadow-custom-shadow hover:border-0`}
                        text={step.buttonText}
                        onClick={() => setCurrentStep(step.id + 1)}
                     />
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default Customdid;
