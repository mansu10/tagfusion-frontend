import { useState, useEffect } from "react";
import CardBox from "../components/CardBox";

const PagePanel = ({ children, cls }) => {
  return (
    <div
      className={
        "min-h-screen flex flex-col justify-center items-center " + cls
      }
    >
      {children}
    </div>
  );
};

const PageIntro = ({ title, heading, desc }) => {
  return (
    <>
      <div className="relative text-lg text-txtgray leading-7 opacity-70 ">
        {title}
      </div>
      <div
        className="relative mt-4 text-txtgreen text-center font-semibold leading-none text-[5.625rem]"
        dangerouslySetInnerHTML={{ __html: heading }}
      ></div>
      <div
        className="relative mt-4 text-lg text-txtgray text-center w-[39.375rem] opacity-70"
        dangerouslySetInnerHTML={{ __html: desc }}
      ></div>
    </>
  );
};

const PageHome = () => {
  const cardList = [
    {
      title: "Connect Wallet",
      desc: "Download Keplr from app store or download the keplr google chrom extension. Add the Tura chain to kelpr first, then send out 0.01 Tura to",
      btnTitle: "Guide",
      btnLink: "",
    },
    {
      title: "Set Your Profile",
      desc: "Create your personal profile. Please make sure you have connected your kelpr wallet.",
      btnTitle: "Set your profile",
      btnLink: "",
    },
    {
      title: "Get Some Gas",
      desc: "To get some gas, please apply our form, Or join our",
      btnTitle: "Apply form",
      btnLink: "",
    },
    {
      title: "Create Tags",
      desc: "Make sure your wallet has enough Tura, then create Tagger DAO as your first tag.",
      btnTitle: "Create Tags",
      btnLink: "",
    },
    {
      title: "Verify Tags",
      desc: "Choose the tag you want to verify, then copy your profile and send to our Telegram channel.",
      btnTitle: "Create Tags",
      btnLink: "",
    },
    {
      title: "Tags Score Reward",
      desc: "To confirm the rewards you received, you can find the reward info here.",
      btnTitle: "Tags Score",
      btnLink: "",
    },
  ];
  return (
    <div>
      <div className="h-screen pt-[98px] flex justify-center items-center bg-intro-bg bg-no-repeat bg-center">
        <img
          className="block max-w-[986px]"
          src="/images/bg_intro.png"
          alt=""
        />
      </div>
      {/* PAGE 2 */}
      <PagePanel cls="bg-black">
        <PageIntro
          title="Let's dive into"
          heading="WHAT'S<br />TAGFUSION?"
          desc="decentralized system that
          increases user creditworthiness by accumulating certified tags, which
          also serves as endorsements for individuals and win trust from others."
        ></PageIntro>

        <img className="w-96 mt-4" src="/images/bg_node.png" alt="" />
      </PagePanel>
      {/* PAGE 3 */}
      <PagePanel cls="py-32">
        <PageIntro
          title="Hey!"
          heading="GETTING<br/>STARTED"
          desc="Join a movement shaping the future of<br/> consumer-focused blockchain applications."
        ></PageIntro>
        <div className="grid grid-cols-2 gap-x-20 gap-y-[3.75rem] mt-20">
          {cardList.map((item, idx) => {
            return (
              <CardBox
                title={item.title}
                desc={item.desc}
                btnTitle={item.btnTitle}
                idx={idx}
              ></CardBox>
            );
          })}
        </div>
      </PagePanel>

      {/* PAGE 4 */}
      <PagePanel cls="bg-black relative">
        <div className="absolute top-24 left-1/2 translate-x-24 w-[18.75rem]">
          <img className="block w-full" src="/images/wallet.png" alt="" />
        </div>
        <PageIntro
          title="Learn about"
          heading="TAGTUSION<br/>CREDIT<br/>LOAN"
          desc="<p class='mb15'>Unlock the power of your credit - get the funds you <br/>need without collateral. Fast, secure, and free.</p>
          <p>The TagFusion Credit Loan allows borrowers to access <br/>funds without the need for collateral. These loans are <br/>granted based on the borrower's credit score and <br/>financial history, making them an ideal option for <br/>individuals who prefer not to tie up their assets.</p>"
        ></PageIntro>
        <div className="flex items-center h-12 mt-10 px-24 rounded-full bg-gradient-yellow">
          BORROW NOW
        </div>
      </PagePanel>
      <PagePanel>
        <PageIntro heading="FAQS"></PageIntro>
      </PagePanel>
      <PagePanel cls="bg-black">
        <PageIntro heading="ABOUT<br/>TAGFUSION"></PageIntro>
      </PagePanel>
    </div>
  );
};

export default PageHome;
