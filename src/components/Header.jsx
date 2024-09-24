import { Link } from "react-router-dom";
import TFButton from "./TFButton";

const Header = () => {
    return (
      <div className="fixed top-0 left-0 right-0 w-full flex justify-center items-center h-[98px] text-white z-40">
        <div className="flex justify-between w-full max-w-[1240px] px-[20px]">
          <Link to="/">
            <div className="flex items-center max-w-[1240px]">
              <img
                className="w-[48px] h-[38px]"
                src="/images/logo.png"
                alt=""
              />
              <span className="ml-[4px] text-[28px] font-medium">
                Tagfusion
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center">
            <div className="flex">
              <div className="flex justify-center items-center w-[48px] h-[48px] p-[6px] ml-[20px]">
                <a
                  href="https://x.com/tagfusion0707"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <img className="w-full" src="/images/icon_x.svg" alt="X" />
                </a>
              </div>
              <div className="flex justify-center items-center w-[48px] h-[48px] p-[6px] ml-[20px]">
                <a
                  href="https://t.me/tagfusion"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <img
                    className="w-full"
                    src="/images/icon_discord.svg"
                    alt="Discord"
                  />
                </a>
              </div>
              <div className="flex justify-center items-center w-[48px] h-[48px] p-[6px] ml-[20px]">
                <a
                  href="https://discord.gg/h244Ue3UsW"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <img
                    className="w-full"
                    src="/images/icon_telegram.svg"
                    alt="Telegram"
                  />
                </a>
              </div>
            </div>
            <TFButton className="ml-[30px]" link="/my">
              My Tags
            </TFButton>
          </div>
          <div className="md:hidden">icon</div>
        </div>
      </div>
    );
};

export default Header;
