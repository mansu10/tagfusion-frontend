import { useState } from "react"
import { Link } from "react-router-dom";
import {
  Popover,
  PopoverTrigger,
  PopoverSurface,
} from "@fluentui/react-popover";

import TFButton from "./TFButton";

const ShareList = ({onClick}) => {
  return (
    <div className="flex items-center">
      <div className="flex">
        <div className="flex justify-center items-center w-[48px] h-[48px] p-[6px] ml-[20px] hover:bg-btngreen">
          <a
            href="https://x.com/Tag_Fusion"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
            onClick={onClick?.bind(this)}
          >
            <img className="w-full" src="/images/icon_x.svg" alt="X" />
          </a>
        </div>
        <div className="flex justify-center items-center w-[48px] h-[48px] p-[6px] ml-[20px] hover:bg-btngreen">
          <a
            href="https://discord.gg/h244Ue3UsW"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
            onClick={onClick?.bind(this)}
          >
            <img
              className="w-full"
              src="/images/icon_discord.svg"
              alt="Discord"
            />
          </a>
        </div>
        <div className="flex justify-center items-center w-[48px] h-[48px] p-[6px] ml-[20px] hover:bg-btngreen">
          <a
            href="https://t.me/tele_tags_dao"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
            onClick={onClick?.bind(this)}
          >
            <img
              className="w-full"
              src="/images/icon_telegram.svg"
              alt="Telegram"
            />
          </a>
        </div>
      </div>
      <TFButton onClick={onClick?.bind(this)} className="ml-[30px]" link="/my">
        <span className="text-[14px] leading-[17px]">My Tags</span>
      </TFButton>
      <TFButton onClick={onClick?.bind(this)} className="ml-[30px]" link="/project">
        <span className="text-[14px] leading-[17px]">Tags List</span>
      </TFButton>
    </div>
  );
}

const Header = () => {
  const [open, setOpen] = useState(false);
    const handleOpenChange = (e, data) =>
      setOpen(data.open || false);

  return (
    <div className="fixed top-0 left-0 right-0 w-full flex justify-center items-center h-[98px] text-white z-9">
      <div className="flex justify-between items-center w-full max-w-[1240px] px-[20px] ">
        <Link to="/">
          <div className="flex items-center max-w-[1240px]">
            <img className="w-[48px] h-[38px]" src="/images/logo.png" alt="" />
            <span className="ml-[4px] text-[28px] font-medium">Tagfusion</span>
          </div>
        </Link>
        <div className="hidden md:block">
          <ShareList></ShareList>
        </div>

        <Popover
          open={open}
          onOpenChange={handleOpenChange}
          closeOnScroll={true}
        >
          <PopoverTrigger>
            <div
              className="md:hidden w-[24px] h-[24px]"
              style={{ transform: "rotateY(180deg)" }}
            >
              <img className="w-full" src="/icons/menu.svg" />
            </div>
          </PopoverTrigger>

          <PopoverSurface>
            <div className="p-[16px] bg-[#424242] rounded text-white">
              <ShareList onClick={()=> setOpen(false)}></ShareList>
            </div>
          </PopoverSurface>
        </Popover>
      </div>
    </div>
  );
};

export default Header;
