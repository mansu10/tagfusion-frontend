import { Link } from "react-router-dom";
import Button from "./Button";

const Header = () => {
    return (
        <div className="fixed top-0 left-0 right-0 w-full flex justify-between items-center px-4  md:px-24 lg:px-56 py-4 z-10">
            <div className="flex items-center gap-4">
                <Link to="/" className="w-fit flex items-center gap-1">
                    <img src="/icons/logo-title.png" alt="logo" className="w-28 object-contain rounded flex-none" />
                </Link>
            </div>
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <a href="https://x.com/tagfusion0707" target="_blank" rel="noopener noreferrer" className="w-10 h-10 p-2 bg-[#10850012] rounded-full flex items-center justify-center hover:bg-[#10850033]">
                        <img src="/icons/twitter-x.svg" alt="Twitter" className="w-5 h-5" />
                    </a>
                    <a href="https://t.me/tagfusion" target="_blank" rel="noopener noreferrer" className="w-10 h-10 p-2 bg-[#10850012] rounded-full flex items-center justify-center hover:bg-[#10850033]">
                        <img src="/icons/telegram-green.svg" alt="Telegram" className="w-5 h-5" />
                    </a>
                    <a href="https://discord.gg/h244Ue3UsW" target="_blank" rel="noopener noreferrer" className="w-10 h-10 p-2 bg-[#10850012] rounded-full flex items-center justify-center hover:bg-[#10850033]">
                        <img src="/icons/discord-green.svg" alt="Discord" className="w-5 h-5" />
                    </a>
                </div>
                <Link className="z-10">
                    <Button text="my tags" link="/card" className="text-green-500 transition-all duration-200 hover:shadow-[0_0_0_2px_#BE7123] min-w-[90px] h-[45px] md:min-w-[140px] md:h-[50px] " />
                </Link>

            </div>
        </div>
    );
};

export default Header;
