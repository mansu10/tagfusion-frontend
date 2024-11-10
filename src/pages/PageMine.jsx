import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { axiosInstance, profileImageUrlPrefix } from "../config/config";
import PanelBox from "../components/PanelBox";
import ModalRepay from "../components/ModalRepay";

const getAddress = async () => {
  let address = localStorage.getItem("tura_address");
  if (address) {
    return address;
  }
};

const formatDate = (date) => {
  if (!date) {
    return;
  }
  try {
    const dateTime = +new Date(date);
    const stamp = dateTime + 8 * 3600 * 1000;
    return new Date(stamp + 8 * 3600 * 1000)
      .toJSON()
      .substring(0, 19)
      .replace("T", " ")
      .replace(/-/g, ".");
  } catch (e) {
    console.log(e);
  }
  return date;
};

const MyTags = ({ tags = [], selectedTag, onClick }) => {
  return (
    <PanelBox title="My Tags" className="bg-[#424242] mt-[30px]">
      <div className="min-h-[150px] md:min-h-[500px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[50px] gap-y-[30px] text-white">
          {tags.map((tag, index) => (
            <div
              key={index}
              className={`inline-flex justify-center items-center min-w-[200px] min-h-[40px] mx-[20px] md:mx-0 border rounded-[8px] cursor-pointer hover:border-[#FFA000FF] hover:text-[#FF6F00] transition-all ${
                selectedTag === tag
                  ? "border-[#FFA000FF] text-[#FF6F00]"
                  : " border-[#FFFFFF33]"
              }`}
              onClick={onClick?.bind(this, tag)}
            >
              {tag.tag_name}({tag.status ? "Verified" : "Not Verified"})
            </div>
          ))}
        </div>
      </div>
    </PanelBox>
  );
};

const ButtonStatus = ({ children, isWarn = false }) => {
  return (
    <span
      className={`inline-flex items-center text-[#388379FF] text-[12px] px-[10px] py-[7px] leading-[15px]  ${
        isWarn
          ? "text-[#b73b19] bg-[#dc56440d]"
          : "text-[#388379FF] bg-[#3883790D]"
      }`}
    >
      {children}
    </span>
  );
};

const MyPositions = () => {
  const navigate = useNavigate();
  const [loanList, setLoanList] = useState([]);
  const [pager, setPager] = useState({
    currentPage: 0,
    totalPage: 10,
    pageSize: 10,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isReload, setIsReload] = useState(false);

  const reloadData = () => {
    setPager({
      currentPage: 0,
      totalPage: 10,
      pageSize: 10,
    });
    setLoanList([]);
    setIsReload(true);
  };

  useEffect(() => {
    if (loanList.length === 0 && isReload) {
      fetchData();
      setIsReload(false);
    }
  }, [loanList, isReload]);

  const fetchData = async () => {
    const address = await getAddress();
    if (!address) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("tagfusion/api/loan_list", {
        params: {
          address,
          page: pager.currentPage + 1,
          page_size: pager.pageSize,
        },
      });

      const data = response.data;
      if (data.code === 0) {
        const originList = loanList || [];
        const list = originList.concat(data.loans);
        setLoanList(list || []);
        setPager({
          currentPage: data.current_page,
          totalPage: data.total_pages,
        });
      }
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };
  const goPageRepay = (item) => {
    sessionStorage.setItem("REPAY_ITEM", JSON.stringify(item));
    navigate("/repay");
  };
  const [sentryRef, { rootRef }] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: pager.currentPage < pager.totalPage,
    onLoadMore: fetchData,
    disabled: false,
    rootMargin: "0px 0px 100px 0px",
  });
  return (
    <PanelBox title="My Positions">
      <div className="md:min-h-[700px]">
        <div className="relative overflow-x-auto">
          <div className="table w-full px-[10px] py-[20px] md:px-[26px] md:py-[26px] text-[12px] text-left  text-gray-500 ">
            <div className="table-row">
              <div className="table-cell w-1/6">Repay Date</div>
              <div className="table-cell w-1/6">Borrow Asset</div>
              <div className="table-cell w-1/6">Borrow Amount</div>
              <div className="table-cell w-1/6">Borrow APY</div>
              <div className="table-cell w-1/6">Debt</div>
              <div className="hidden md:table-cell"></div>
            </div>
          </div>
          {loanList.map((item, idx) => {
            return (
              <div
                key={item.id}
                className="table relative w-full mb-[16px] px-[10px] py-[20px] md:px-[26px] md:py-[26px] text-[14px] text-left  text-black bg-white rounded-[10px]"
              >
                <div className="table-row">
                  <div className="table-cell align-middle w-1/6">
                    {formatDate(item.repayment_date)}
                  </div>
                  <div className="table-cell align-middle w-1/6 px-[2px]">
                    {item.currency}
                  </div>
                  <div className="table-cell align-middle w-1/6">
                    {item.loan_amount}
                  </div>
                  <div className="table-cell align-middle w-1/6">
                    {(item.borrow_APY * 100).toFixed(2)}%
                  </div>
                  <div className="table-cell align-middle w-1/6">
                    {item.amount}
                  </div>
                  <div className="hidden md:table-cell align-middle w-1/6">
                    {item.status === 3 && <ButtonStatus>Paid</ButtonStatus>}
                    {item.status === 2 && (
                      <ButtonStatus isWarn={true}>Unpaid</ButtonStatus>
                    )}
                    {item.status != 3 && (
                      <ModalRepay
                        info={item}
                        onAction={() => {
                          reloadData();
                        }}
                      ></ModalRepay>
                    )}
                  </div>
                </div>
                <div className="md:hidden table-row ">
                  <div className="opacity-0">repay</div>
                  <div className="absolute right-[10px] bottom-[10px]">
                    {item.status === 3 && <ButtonStatus>Paid</ButtonStatus>}
                    {item.status === 2 && (
                      <ButtonStatus isWarn={true}>Unpaid</ButtonStatus>
                    )}
                    {item.status != 3 && (
                      <span
                        onClick={goPageRepay.bind(this, item)}
                        className="inline-flex items-center cursor-pointer text-[#5d6766] text-[12px] px-[10px] py-[7px] leading-[15px] bg-[#3883790D]"
                      >
                        <i className="w-[13px] h-[11px] mr-[2px] inline-flex">
                          <img
                            src="/images/icon_card.png"
                            alt=""
                            className="w-full"
                          />
                        </i>
                        Repay
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          {(isLoading || pager.currentPage < pager.totalPage) && (
            <div className="flex justify-center text-white" ref={sentryRef}>
              loading...
            </div>
          )}
        </div>
      </div>
    </PanelBox>
  );
};

const MyRewards = () => {
  const [data, setData] = useState({
    code: 1,
    register_award: 0,
    register_ct: 0,
    verify_award: 0,
    verify_ct: 0,
    invite_one_award: 0,
    invite_one_ct: 0,
    invite_two_award: 0,
    invite_two_ct: 0,
    invite_three_award: 0,
    invite_three_ct: 0,
    total_award: 0,
    top50: [],
    profile_image: "",
  });
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const address = await getAddress();
      toast.info("Loading...", {
        position: "top-right", // 设置位置为右上角
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
        type: "info",
        icon: false,
      });
      const response = await axiosInstance.get("tagfusion/api/get_award/", {
        params: { address },
      });
      setData(response.data);
      toast.dismiss();
    };

    //  if (location.pathname === "/award") {
    fetchData();
    //  }
  }, [location]);

  const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  return (
    <PanelBox title="My Rewards">
      <div className="md:min-h-[700px]">
        <div className="bg-white px-[44px] py-[30px] rounded-[20px]">
          <RewardItem>
            <RewardItemTitle>
              <div>Current Reward</div>
              <div>{formatNumber(data.total_award)} Tags</div>
            </RewardItemTitle>
            <div className="border-b pt-[26px]"></div>
          </RewardItem>
          <RewardItem>
            <RewardItemTitle>
              <div>Member Reward</div>
              <div>{formatNumber(data.register_award)} Tags</div>
            </RewardItemTitle>
          </RewardItem>
          <RewardItem>
            <RewardItemTitle>
              <div>Verification Reward</div>
              <div>{formatNumber(data.verify_award)} Tags</div>
            </RewardItemTitle>
            <RewardItemChild
              title="Total Count"
              borderColor="border-[#F67932FF] "
            >
              +{formatNumber(data.verify_ct)}
            </RewardItemChild>
            <RewardItemChild
              title="Verified Tags"
              borderColor="border-[#F67932FF] "
            >
              +{formatNumber(data.verify_award)}
            </RewardItemChild>
          </RewardItem>
          <RewardItem>
            <RewardItemTitle>
              <div>Refer Reward</div>
              <div>
                {formatNumber(
                  data.invite_one_award +
                    data.invite_two_award +
                    data.invite_three_award
                )}{" "}
                Tags
              </div>
            </RewardItemTitle>
            <RewardItemChild
              title="Layer1 Refer"
              borderColor="border-[#00A84D]"
            ></RewardItemChild>
            <RewardItemChild
              title="L1 Count:"
              borderColor="border-transparent"
              fontSize="text-[13px]"
            >
              +{formatNumber(data.invite_one_ct)}
            </RewardItemChild>
            <RewardItemChild
              title="L1 Invite Friends:"
              borderColor="border-transparent"
              fontSize="text-[13px]"
            >
              +{formatNumber(data.invite_one_award)}
            </RewardItemChild>
            <RewardItemChild
              title="Layer2 Refer"
              borderColor="border-[#00A84D]"
            ></RewardItemChild>
            <RewardItemChild
              title="L2 Count:"
              borderColor="border-transparent"
              fontSize="text-[13px]"
            >
              +{formatNumber(data.invite_two_ct)}
            </RewardItemChild>
            <RewardItemChild
              title="L2 Invite Friends:"
              borderColor="border-transparent"
              fontSize="text-[13px]"
            >
              +{formatNumber(data.invite_two_award)}
            </RewardItemChild>
          </RewardItem>
        </div>
      </div>
    </PanelBox>
  );
};

const RewardItem = ({ children }) => {
  return <div className="pb-[26px]">{children}</div>;
};

const RewardItemTitle = ({ children }) => {
  return (
    <div className="flex justify-between mb-[10px] font-semibold text-[#0D4D36]">
      {children}
    </div>
  );
};
const RewardItemChild = ({
  title,
  borderColor = "",
  children,
  fontSize = "",
}) => {
  return (
    <div className="flex justify-between mb-[5px] pr-[34px] md:pr-[94px] text-[#3B8066]">
      <div className="flex items-center">
        <div
          className={`inline-flex w-[15px] h-[15px] mr-[10px] border-[3px] rounded-full ${borderColor}`}
        ></div>
        <span className={fontSize}>{title}</span>
      </div>
      <div>{children}</div>
    </div>
  );
};

const PageMine = () => {
  // get data
  const [selectedTag, setSelectedTag] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState({
    code: 2,
    info: {
      tags: [],
      username: [""],
      address: "",
      bio: [""],
      link: [""],
      profile_image: [""],
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const address = await getAddress();
      toast.info("Loading...", {
        position: "top-right", // 设置位置为右上角
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
        type: "info",
        icon: false,
      });
      const response = await axiosInstance.get(
        "tagfusion/api/login/get_info/",
        {
          params: { address },
        }
      );

      setData(response.data);

      if (response.data.code === 0) {
        localStorage.setItem("tura_login_status", true);
        // setStatus(true)
      }
      toast.dismiss();
    };

    if (location.pathname === "/my") {
      fetchData();
    }
  }, [location]);
  let profileImageUrl = "";
  if (data.code === 0) {
    profileImageUrl = profileImageUrlPrefix + `/${data.info.profile_image[0]}`; // 替换成你的基本 URL
  }
  if (data.code === 1) {
    navigate("/register", { replace: true });
  }

  const tabs = [
    {
      title: "My Tags",
      key: "tags",
      component: (
        <MyTags
          tags={data.info?.tags}
          selectedTag={selectedTag}
          onClick={(tag) => {
            setSelectedTag(tag);
          }}
        ></MyTags>
      ),
    },
    {
      title: "My Positions",
      key: "position",
      component: <MyPositions></MyPositions>,
    },
    {
      title: "My Rewards",
      key: "reward",
      component: <MyRewards></MyRewards>,
    },
  ];
  // switch tag

  const tab = location?.state?.tab;
  let defaultTab = 0;
  if (tab) {
    const idx = tabs.findIndex((item) => item.key === tab);
    defaultTab = idx;
  }
  const [active, setActive] = useState(defaultTab);

  const handleTabClick = (idx) => {
    setActive(idx);
    // resetData()
  };

  const copyProfile = () => {
    if (!selectedTag) {
      alert("Select the tag you want to verify");
      return;
    }
    const currentDomain = window.location.origin;
    const to_address = localStorage.getItem("tura_address");
    const tagVersion = "tag1.0";
    const type = "verifyTag";
    const tagName = selectedTag ? selectedTag.tag_name : "";
    const recognition = "positive";
    const verify_url = `${currentDomain}/tgcreate_tag?to_address=${encodeURIComponent(
      to_address
    )}&tag_version=${encodeURIComponent(tagVersion)}&type=${encodeURIComponent(
      type
    )}&tag_name=${encodeURIComponent(
      tagName
    )}&recognization=${encodeURIComponent(recognition)}`;

    const profileText = `
        UserName: ${data.info.username[0]}
        Address: ${data.info.address}
        Bio: ${data.info.bio[0]}
        Link: ${data.info.link[0]}
        TagName: ${selectedTag ? selectedTag.tag_name : ""}
        VerifyInfoLink:
        ${verify_url}
    `;

    const textArea = document.createElement("textarea");
    textArea.value = profileText;
    textArea.style.position = "fixed"; // Prevent scrolling to bottom of page in MS Edge.
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand("copy");
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000); // 提示信息显示3秒后消失
    } catch (err) {
      console.error("Could not copy text: ", err);
    }

    document.body.removeChild(textArea);
  };

  if (localStorage.getItem("tura_login_status")) {
    return (
      <>
        <div className="relative flex justify-center flex-col md:flex-row pt-[130px] md:pt-0 p-[10px] md:px-[20px] z-10">
          <div>
            <div className="sticky top-[140px] flex-none px-[10px]">
              <div className="flex md:flex-col items-center w-full md:w-[213px] p-[25px] rounded-[10px] md:rounded-[20px] bg-[#424242] text-white leading-[22px]">
                <div className="flex-none rounded-full bg-gray-200 w-[84px] h-[84px] overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    alt="Profile"
                    srcSet={profileImageUrl}
                  />
                </div>
                <div className="ml-[30px] md:ml-0">
                  <div className="text-left md:mt-[30px] md:text-center">
                    {data.info.username}
                  </div>
                  <div className="mt-[20px] md:mt-[30px] break-all underline">
                    {data.info.address}
                  </div>
                  <div>{data.info.link || ""}</div>
                  <div className="mt-[5px] md:mt-0">
                    <p>{data.info.bio[0]}</p>
                  </div>
                  <div
                    className="text-white underline flex gap-2 items-center cursor-pointer mt-[5px]"
                    onClick={copyProfile}
                  >
                    <img
                      src={copySuccess ? "/icons/tick.svg" : "/icons/copy.svg"}
                      alt="copy"
                      className="w-5 h-5"
                    />
                    {copySuccess ? "Profile copied!" : "Copy my profile"}
                  </div>
                </div>
              </div>
              <div className="flex md:flex-col md:w-[213px] mt-[30px] md:mt-[60px]">
                {tabs.map((item, idx) => {
                  return (
                    <div
                      key={item.title}
                      className={`flex-1 md:flex-none h-[50px] mt-[10px] text-[#388379] flex items-center justify-center cursor-pointer hover:bg-btngreen hover:text-white transition-all ${
                        idx === active ? "bg-btngreen text-white" : ""
                      }`}
                      onClick={() => handleTabClick(idx)}
                    >
                      {item.title}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="pt-[10px] md:pt-[110px] md:ml-[40px] md:w-[909px]">
            {/* {tabs[active].component} */}
            {active === 0 && (
              <MyTags
                tags={data.info?.tags}
                selectedTag={selectedTag}
                onClick={(tag) => {
                  setSelectedTag(tag);
                }}
              ></MyTags>
            )}
            {/* {active === 1 && <MyPositions list={loanList} loading={isLoading} hasNextPage={pager.currentPage < pager.totalPage} error={false} loadMore={fetchData}></MyPositions>} */}
            {active === 1 && <MyPositions></MyPositions>}
            {active === 2 && <MyRewards></MyRewards>}
          </div>
        </div>
        <ToastContainer></ToastContainer>
      </>
    );
  }
};

export default PageMine;
