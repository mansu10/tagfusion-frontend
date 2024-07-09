import { Link } from "react-router-dom";
import Button from "./Button";

const Header = () => {
    return (
        <div className="fixed top-0 left-0 right-0 w-full flex justify-between items-center px-56 py-4 z-50">
            <div className="flex items-center gap-4">
                <Link to="/" className="w-fit flex items-center gap-1">
                    <img src="/icons/logo-title.png" alt="logo" className="w-28 object-contain rounded" />
                </Link>
            </div>
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 p-2 bg-[#10850012] rounded-full flex items-center justify-center hover:bg-[#10850033]">
                        <img src="/icons/twitter-x.svg" alt="Twitter" className="w-5 h-5" />
                    </a>
                    <a href="https://telegram-green.org" target="_blank" rel="noopener noreferrer" className="w-10 h-10 p-2 bg-[#10850012] rounded-full flex items-center justify-center hover:bg-[#10850033]">
                        <img src="/icons/telegram.svg" alt="Telegram" className="w-5 h-5" />
                    </a>
                    <a href="https://discord-green.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 p-2 bg-[#10850012] rounded-full flex items-center justify-center hover:bg-[#10850033]">
                        <img src="/icons/discord.svg" alt="Discord" className="w-5 h-5" />
                    </a>
                </div>
                <Link className="z-50">
                    <Button text="my tags" link="/card" className="text-green-500 transition-all duration-200 hover:shadow-[0_0_0_2px_#BE7123]" />
                </Link>

            </div>
        </div>
    );
};

export default Header;
