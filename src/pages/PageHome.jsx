import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import CardBox from "../components/CardBox";
import ModalLoan from "../components/ModalLoan";
import { endpoint_rpc, tag_url, turaChainId } from "../config/config.js";

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
      <div className="relative mt-4 text-txtgreen text-center font-semibold leading-[44px] md:leading-none text-[36px] md:text-[90px]">
        {heading}
      </div>
      <div className="relative mt-4 text-[14px] md:text-[18px] text-txtgray text-center max-w-[1440px] opacity-70">
        {desc}
      </div>
    </>
  );
};

const IntroItem = ({ question, answer, active, handleClick = () => {} }) => {
  return (
    <div
      className={`w-full md:max-w-[1145px] px-[12px] md:px-[40px]  rounded-[16px] ${
        active
          ? "bg-[#555555] shadow-[0_-1px_10px_0px_rgba(255,255,255,1)] py-[30px] mb-[20px]"
          : "py-[0px] pb-0"
      }`}
    >
      <div className="flex justify-between items-center">
        <div className="pr-[16px] text-[#f8f8f8cf] text-[18px] md:text-[24px]">
          {question}
        </div>
        <div
          onClick={() => {
            handleClick?.call();
          }}
          className={`flex-none flex justify-center items-center w-[44px] h-[28px] md:w-16 md:h-12 text-white  ${
            active ? "bg-white" : "bg-btngreen"
          }`}
        >
          <div className="scale-75 md:scale-100">
            <div
              className={`icon-carot ${active ? "icon-carot-active" : ""}`}
            ></div>
          </div>
        </div>
      </div>
      <div
        className={`mt-5 text-[#F8F8F8] text-[14px] md:text-[16px] ${
          active ? "" : "scale-y-0 h-0"
        }`}
      >
        {answer}
      </div>
    </div>
  );
};

const AboutItem = ({title, content}) => {
  return (
    <div className="flex mb-12 px-[18px]">
      <div className="flex-none w-[32px] md:w-14 px-0.5">
        <img alt="" srcSet="/images/icon_edit.png" />
      </div>
      <div className="flex flex-col max-w-[61.625rem] ml-[8px] md:ml-8">
        <div className="text-[#EBEBEB] text-[18px] md:text-[24px] leading-[22px] md:leading-[29px]">
          {title}
        </div>
        <div className="mt-5 text-[14px] md:text-[16px] leading-[20px] md:leading-[24px] text-[#d1d1d1]">
          {content}
        </div>
      </div>
    </div>
  );
};

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

const PageHome = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const address = localStorage.getItem("tura_address");
    setWalletAddress(address);
    
  }, []);

  const handleWalletButtonClick = async () => {
    if (walletAddress) {
      const confirmed = window.confirm(
        "Confirm to log out of the current account?"
      );
      if (confirmed) {
        localStorage.removeItem("tura_address");
        localStorage.removeItem("tura_login_status");
        setWalletAddress(null);
        navigate("/"); // 重定向到主页
      }
    } else {
      try {
        // 连接 Keplr 钱包
        if (!window.keplr) {
          alert("Please install Keplr extension");
          return;
        }
        const chainId = turaChainId;
        // 提示 Keplr 连接
        await window.keplr.enable(chainId);
        // 获取离线签名者
        const offlineSigner = window.getOfflineSigner(chainId);
        const accounts = await offlineSigner.getAccounts();
        // 假设新的地址是 accounts[0].address
        const newAddress = accounts[0].address;
        localStorage.setItem("tura_address", newAddress);
        setWalletAddress(newAddress);
      } catch (error) {
        console.error("Failed to connect to Keplr", error);
        alert("Failed to connect to Keplr");
      }
    }
  };

  const steps = [
    {
      stepNumber: "01",
      title: walletAddress ? "Exit Wallet" : "Connect Wallet",
      description: (
        <>
          Download Keplr from app store or download the keplr google chrom
          extension. Add the Tura chain to keplr first, then send out 0.01 Tura
          to <br />
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
      linkText: "Set Your Profile",
      linkUrl: "/card",
    },
    {
      stepNumber: "03",
      title: "Get Some Gas",
      description: (
        <>
          To get some gas, please apply our form, Or join our{" "}
          <a
            href="https://t.me/tele_tags_dao"
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
      description: (
        <>
          Make sure your wallet has enough Tura, then create Tagger DAO as your
          first tag.
          <br />
          <a
            href="https://tagfusion.gitbook.io/announcement/user-manual/create-tags"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            <strong>Learn More</strong>
          </a>
        </>
      ),
      linkText: "Create Tags",
      linkUrl: "/tags",
      route: "/tags",
    },
    {
      stepNumber: "05",
      title: "Verify Tags",
      description: (
        <>
          Choose the tag you want to verify, then copy your profile and send to
          our{" "}
          <a
            href="https://t.me/tele_tags_dao"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            <strong>Telegram</strong>
          </a>{" "}
          channel.
          <br />
          <a
            href="https://tagfusion.gitbook.io/announcement/user-manual/verify-tags"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            <strong>Learn More</strong>
          </a>
        </>
      ),
      linkText: "Create Tags",
      linkUrl: "/tags",
      route: "/tags",
    },
    {
      stepNumber: "06",
      title: "Tags Score Reward",
      description:
        "To confirm the rewards you received, you can find the reward info here.",
      linkText: "Learn more",
      linkUrl: "/my",
    },
  ];

  const handleStepClick = (idx) => {
    const step = steps[idx];
    if (!step) {
      return;
    }
    switch (idx) {
      case 0:
        handleWalletButtonClick();
        break;
      case 3:
        handleLinkClick({ link: step.route });
        break;
      case 5:
        navigate("/my", { replace: true,state: { tab: "reward" } });
        break;
      default:
        handleLinkClick({ link: step.linkUrl });
        break;
    }
  };
  const introItemList = [
    {
      title: "What is Tagfusion?",
      content:
        "Tagfusion is the first Dapp on the Tura chain. Users can add tags on tagfusion, verify between individuals, and obtain verification and data from CEX institutions, which can improve their on-chain credit.",
    },
    {
      title:
        "Why does Tagfusion want to implement credit calculation and unsecured lending in the blockchain scenario?",
      content:
        "Currently, the main function of the blockchain is distributed ledger, which does not have the ability of distributed computing and cannot realize on-chain credit calculation.The innovation of blockchain applications is weak, and the next biggest application is on-chain data fusion to carry out on-chain credit calculation. The biggest application of on-chain credit is unsecured lending.",
    },
    {
      title: "What determines the credit score?",
      content:
        "On-chain data, transaction history. DEX and CEX data. Relationship data (who your friends are).",
    },
    {
      title: "How can I see my credit score?",
      content: (
        <>
          On the website(
          <a
            className="underline"
            href="https://tagfusion.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://tagfusion.org/
          </a>
          ), telegram bot(
          <a
            href="https://t.me/tele_tags_dao"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            @tag_fusion_bot
          </a>
          ).
        </>
      ),
    },
  ];
  const [introIdx, setIntroIdx] = useState(0);

  const handleIntroClick = (idx) => {
    if (idx === introIdx) {
      setIntroIdx(-1);
    } else {
      setIntroIdx(idx);
    }
  };

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
    },
  ];

  const handleLinkClick = ({ link, to }) => {
    if (link) {
      // If link is an external URL, open it in a new tab
      if (link.startsWith("http://") || link.startsWith("https://")) {
        window.open(link, "_blank", "noopener,noreferrer");
      } else {
        // e.preventDefault();
        navigate(link);
      }
    } else if (to) {
      // e.preventDefault();
      navigate("/", { replace: true });
      setTimeout(() => {
        document.getElementById(to)?.scrollIntoView({ behavior: "smooth" });
      }, 100); // Adding a small delay to ensure navigation is complete before scrolling
    }
  };

  return (
    <div>
      {/* PAGE 1 */}
      <PagePanel cls="bg-bg-global bg-no-repeat bg-center md:bg-[center_top_40px] bg-[length:100%] md:bg-[length:986px_884px]">
        <PageIntro
          title={<span className="text-txtgreen">Introducing Tagfusion</span>}
          heading={
            <p>
              REVOLUTIONIZING
              <br />
              CONSUMER
              <br />
              BLOCKCHAIN
            </p>
          }
          desc={
            <span className="text-txtgreen">
              Bridging web3 gap by transitioning real-world applications
              onchain.
            </span>
          }
        ></PageIntro>
      </PagePanel>
      {/* PAGE 2 */}
      <PagePanel cls="bg-black py-[100px]">
        <PageIntro
          title="Let's dive into"
          heading={
            <>
              WHAT'S
              <br />
              TAGFUSION?
            </>
          }
          desc={
            <p className="w-full px-[20px] md:w-[629px] text-center">
              Tag Fusion Protocol is an innovative decentralized system that
              increases user creditworthiness by accumulating certified tags,
              which also serves as endorsements for individuals and win trust
              from others.
            </p>
          }
        ></PageIntro>

        <img className="w-[300px] mt-4" src="/images/bg_node.png" alt="" />
      </PagePanel>
      {/* PAGE 3 */}
      <PagePanel cls="py-32">
        <PageIntro
          title="Hey!"
          heading={
            <>
              GETTING
              <br />
              STARTED
            </>
          }
          desc={
            <>
              Join a movement shaping the future of
              <br /> consumer-focused blockchain applications.
            </>
          }
        ></PageIntro>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-[60px] mt-20 mx-[18px] md:mx-0">
          {steps.map((item, idx) => {
            return (
              <CardBox
                key={idx}
                title={item.title}
                onAction={handleStepClick}
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
      <PagePanel cls="bg-black relative py-[100px]">
        <div className="absolute top-[100px] left-1/2 translate-x-[-50%] md:translate-x-24 w-[18.75rem]">
          <img className="block w-full" src="/images/wallet.png" alt="" />
        </div>
        <PageIntro
          title={<span className="text-[18px]">Learn about</span>}
          heading={
            <>
              TAGFUSION
              <br />
              &nbsp;CREDIT&nbsp;
              <br className="hidden md:block" />
              &nbsp;LOAN&nbsp;
            </>
          }
          desc={
            <>
              <p className="mb-[15px] w-full px-[20px] md:w-[537px]">
                Unlock the power of your credit - get the funds you need without
                collateral. Fast, secure, and free.
              </p>
              <p className="w-full px-[20px] md:w-[537px]">
                The TagFusion Credit Loan allows borrowers to access funds
                without the need for collateral. These loans are granted based
                on the borrower's credit score and financial history, making
                them an ideal option for individuals who prefer not to tie up
                their assets.
              </p>
            </>
          }
        ></PageIntro>

        <ModalLoan></ModalLoan>
        <div className="md:hidden flex items-center h-12 mt-10 px-24 rounded-full bg-gradient-yellow cursor-pointer">
          <Link to="/loan">BORROW NOW</Link>
        </div>
      </PagePanel>
      <PagePanel cls="bg-line flex-start pt-[140px] pb-[100px]">
        <PageIntro heading="FAQS"></PageIntro>
        <div className="px-[18px] pt-[50px]">
          {introItemList.map((item, idx) => {
            return (
              <IntroItem
                key={idx}
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
        <PageIntro
          heading={
            <>
              ABOUT
              <br />
              TAGFUSION
            </>
          }
        ></PageIntro>
        <div className="h-20"></div>
        {aboutItemList.map((item, idx) => {
          return (
            <AboutItem
              key={idx}
              title={item.title}
              content={item.content}
            ></AboutItem>
          );
        })}
      </PagePanel>
    </div>
  );
};

export default PageHome;
