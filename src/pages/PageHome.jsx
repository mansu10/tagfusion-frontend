import { useState, useEffect } from "react";
import CardBox from "../components/CardBox";
import ModalLoan from "../components/ModalLoan";

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
      <div className="relative  text-txtgray leading-7 opacity-70 text-[14px] md:text-[18px]">
        {title}
      </div>
      <div
        className="relative mt-4 text-txtgreen text-center font-semibold leading-none text-[36px] md:text-[90px]"
        dangerouslySetInnerHTML={{ __html: heading }}
      ></div>
      <div
        className="relative mt-4 text-lg text-txtgray text-center w-[335px] opacity-70"
        dangerouslySetInnerHTML={{ __html: desc }}
      ></div>
    </>
  );
};

const IntroItem = ({question, answer, active, handleClick = () => {}}) => {
  return (
    <div
      className={`w-full md:w-[71.5625rem] px-[12px] md:px-[40px] py-[30px] rounded-[16px] ${
        active ? "bg-[#555555] shadow-[0_-1px_10px_0px_rgba(255,255,255,1)]" : ""
      }`}
    >
      <div className="flex justify-between items-center">
        <div className="text-white text-2xl">{question}</div>
        <div
          onClick={() => {
            handleClick?.call();
          }}
          className={`flex-none flex justify-center items-center w-16 h-12 text-white  ${
            active ? "bg-white" : "bg-btngreen"
          }`}
        >
          <div
            className={`icon-carot ${active ? "icon-carot-active" : ""}`}
          ></div>
        </div>
      </div>
      <div
        className={`mt-5 text-[#F8F8F8] text-base ${
          active ? "" : "scale-y-0 h-0"
        }`}
      >
        {answer}
      </div>
    </div>
  );
}

const AboutItem = () => {
  return (
    <div className="flex mb-12 px-[18px]">
      <div className="flex-none w-14 px-0.5">
        <img src="/images/icon_edit.png" alt="" srcset="" />
      </div>
      <div className="flex flex-col max-w-[61.625rem] ml-8">
        <div className="text-white">
          TagFusion Protocol: Enhancing User Credibility with Certification Tags
        </div>
        <div className="mt-5 text-[#d1d1d1]">
          The TagFusion Protocol is designed to enhance user credit through the
          use of certification tags. By completing tasks or obtaining
          certificates, users earn these certification tags, which serve as a
          representation of their abilities and credibility in specific fields.
          This unique approach not only validates the skills and expertise of
          individuals but also provides a trustworthy mechanism for others to
          assess their qualifications.
        </div>
      </div>
    </div>
  );
}

const activateAccount = async () => {
  if (window.keplr) {
    await window.keplr.enable(turaChainId); // 替换为你的链 ID
  } else {
    toast.error("Please install the Keplr plug-in");
  }
  try {
    const chainId = turaChainId;
    const to_address = "tura137mg5gua8y6ppchvufg60ul6yl4dgxhnsxxc6e";
    const denom = "utura";
    const toSend = "1000000";
    const offlineSigner = window.getOfflineSigner(chainId);
    const accounts = await offlineSigner.getAccounts();
    const address = accounts[0].address;
    const signingClient = await SigningStargateClient.connectWithSigner(
      endpoint_rpc,
      offlineSigner
    );
    const fee = {
      amount: [{ denom: "utura", amount: "500" }],
      gas: "200000",
    };
    const memo = "";

    const result = await signingClient.sendTokens(
      address,
      to_address,
      [
        {
          denom: denom,
          amount: toSend,
        },
      ],
      fee,
      memo
    );
    if (result.code !== undefined && result.code !== 0) {
      throw new Error(`Error: ${result.log || result.rawLog}`);
    }
    toast.success(`Activate Successful`);
  } catch (error) {
    if (error.message === "Invalid string. Length must be a multiple of 4") {
      toast.success(`Activate Successful`);
    } else {
      toast.error(`Submit Error: ${error.message}`);
    }
  } finally {
    // Navigate to a different path or reset state
    // window.location.href = tag_url;
  }
};

const steps = [
  {
    stepNumber: "01",
    title: "Connect Wallet",
    description: (
      <>
        Download Keplr from app store or download the keplr google chrom
        extension. Add the Tura chain to keplr first, then send out 0.01 Tura to{" "}
        <a href="#" onClick={activateAccount} className="underline">
          <strong>activate the account</strong>
        </a>
        .
      </>
    ),
    linkText: "Guide",
    linkUrl:
      "https://tagfusion.gitbook.io/announcement/user-manual/wallet-connect",
  },
  {
    stepNumber: "02",
    title: "Set Your Profile",
    description:
      "Create your personal profile. Please make sure you have connected your keplr wallet.",
    linkText: "",
    linkUrl: "",
  },
  {
    stepNumber: "03",
    title: "Get Some Gas",
    description: (
      <>
        To get some gas, please apply our form, Or join our{" "}
        <a
          href="https://t.me/tagfusion"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          <strong>Telegram</strong>
        </a>{" "}
        and send your keplr wallet address to the channel.
      </>
    ),
    linkText: "Apply form",
    linkUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSfsxVaJhbctPg5sFbFP2QY63bpBYmomw8ranw3dJ-IyxadHZA/viewform",
  },
  {
    stepNumber: "04",
    title: "Create Tags",
    description:
      "Make sure your wallet has enough Tura, then create Tagger DAO as your first tag.",
    linkText: "Learn more",
    linkUrl:
      "https://tagfusion.gitbook.io/announcement/user-manual/create-tags",
  },
  {
    stepNumber: "05",
    title: "Verify Tags",
    description: (
      <>
        Choose the tag you want to verify, then copy your profile and send to
        our{" "}
        <a
          href="https://t.me/tagfusion"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          <strong>Telegram</strong>
        </a>{" "}
        channel.
      </>
    ),
    linkText: "Learn more",
    linkUrl:
      "https://tagfusion.gitbook.io/announcement/user-manual/verify-tags",
  },
  {
    stepNumber: "06",
    title: "Tags Score Reward",
    description:
      "To confirm the rewards you received, you can find the reward info here.",
    linkText: "Learn more",
    linkUrl: "/award",
  },
];

const PageHome = () => {
  const introItemList = [
    {
      title: "Did all the packages at N2O Gaming available",
      content:
        "A common source of FUD surrounding Dogecoin is the claim that certain wallets holding a large percentage of the supply are owned by private investors or so-called “whales”. In reality, many of the top Dogecoin wallets are cold wallets or hot wallets controlled by",
    },
    {
      title: "How do I know if a space is available?",
      content:
        "A common source of FUD surrounding Dogecoin is the claim that certain wallets holding a large percentage of the supply are owned by private investors or so-called “whales”. In reality, many of the top Dogecoin wallets are cold wallets or hot wallets controlled by",
    },
    {
      title: "How do I know if a space is available?",
      content:
        "A common source of FUD surrounding Dogecoin is the claim that certain wallets holding a large percentage of the supply are owned by private investors or so-called “whales”. In reality, many of the top Dogecoin wallets are cold wallets or hot wallets controlled by",
    },
    {
      title: "How do I know if a space is available?",
      content:
        "A common source of FUD surrounding Dogecoin is the claim that certain wallets holding a large percentage of the supply are owned by private investors or so-called “whales”. In reality, many of the top Dogecoin wallets are cold wallets or hot wallets controlled by",
    },
  ];
  const [introIdx, setIntroIdx] = useState(0)

  const handleIntroClick = (idx) => {
    if (idx === introIdx) {
      setIntroIdx(-1);
    } else {
      setIntroIdx(idx)
    }
  }

  const aboutItemList = [
    {
      title:
        "TagFusion Protocol: Enhancing User Credibility with Certification Tags",
      content:
        "The TagFusion Protocol is designed to enhance user credit through the use of certification tags. By completing tasks or obtaining certificates, users earn these certification tags, which serve as a representation of their abilities and credibility in specific fields. This unique approach not only validates the skills and expertise of individuals but also provides a trustworthy mechanism for others to assess their qualifications.",
    },
    {
      title:
        "TagFusion Protocol: Boosting Credibility and Trust with Secure Certification Tags",
      content:
        "These tags are not just identifiers but endorsements of skills and trustworthiness, helping users gain others' trust. By accumulating more certification tags, users' credit scores increase. Ensuring data transparency and privacy protection, user data is securely stored and shared, accessible only with authorization.",
    },
    {
      title:
        "TagFusion Protocol: Versatile Application of Certification Tags in Finance, Networking, and Recruitment",
      content:
        "Tag Fusion Protocol applies to various fields such as financial services, social networks, and recruitment platforms, where credit ratings and certification tags help users obtain loans, find jobs, or establish new relationships.",
    }
  ];

  return (
    <div>
      <ModalLoan></ModalLoan>
      <div className="h-screen pt-[98px] flex justify-center items-center bg-intro-bg bg-no-repeat bg-center">
        <img
          className="block w-full max-w-[986px]"
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-[60px] mt-20 mx-[18px] md:mx-0">
          {steps.map((item, idx) => {
            return (
              <CardBox
                title={item.title}
                desc={item.description}
                btnTitle={item.linkText}
                btnLink={item.linkUrl}
                idx={idx}
              ></CardBox>
            );
          })}
        </div>
      </PagePanel>
      {/* PAGE 4 */}
      <PagePanel cls="bg-black relative">
        <div className="absolute top-24 left-1/2 translate-x-[-50%] md:translate-x-24 w-[18.75rem]">
          <img className="block w-full" src="/images/wallet.png" alt="" />
        </div>
        <PageIntro
          title="Learn about"
          heading="TAGTUSION<br/>CREDIT<br/>LOAN"
          desc="<p class='mb15'>Unlock the power of your credit - get the funds you need without collateral. Fast, secure, and free.</p>
          <p>The TagFusion Credit Loan allows borrowers to access funds without the need for collateral. These loans are granted based on the borrower's credit score and financial history, making them an ideal option for individuals who prefer not to tie up their assets.</p>"
        ></PageIntro>
        <div className="flex items-center h-12 mt-10 px-24 rounded-full bg-gradient-yellow">
          BORROW NOW
        </div>
      </PagePanel>
      <PagePanel cls="bg-line flex-start pt-[140px]">
        <PageIntro heading="FAQS"></PageIntro>
        <div className="px-[18px]">
          {introItemList.map((item, idx) => {
            return (
              <IntroItem
                active={introIdx === idx}
                question={item.title}
                answer={item.content}
                handleClick={() => {
                  handleIntroClick(idx);
                }}
              ></IntroItem>
            );
          })}
        </div>
      </PagePanel>
      <PagePanel cls="bg-black py-32">
        <PageIntro heading="ABOUT<br/>TAGFUSION"></PageIntro>
        <div className="h-20"></div>
        {aboutItemList.map((item) => {
          return (
            <AboutItem title={item.title} content={item.content}></AboutItem>
          );
        })}
      </PagePanel>
    </div>
  );
};

export default PageHome;
