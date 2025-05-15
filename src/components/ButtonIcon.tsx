import HomeIcon from '@mui/icons-material/Home';
import SavingsIcon from '@mui/icons-material/Savings';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Link from 'next/link';

type ButtonIconProps = {
    name: string;
};

const ButtonIcon = ({name}:ButtonIconProps) => {
    return (
                <div className="flex flex-row justify-around items-center h-[15svh]">
                    <Link href="/budget">
                        <div className="flex flex-col items-center">
                            <button className={`rounded-full ${name === "budget" ? "bg-green-100":"bg-white"} shadow-md hover:bg-green-100 transition-colors duration-200 size-[3.4rem]`}>
                                <SavingsIcon className="text-green-600 hover:text-green-800 transition-colors duration-200" fontSize="large" />
                                </button>
                            <div className="text-lg mt-1">予算</div>
                        </div>
                    </Link>
                    <Link href="/home">
                        <div className="flex flex-col items-center">
                            <button className={`rounded-full ${name === "home" ? "bg-green-100":"bg-white"} shadow-md hover:bg-green-100 transition-colors duration-200 size-[3.4rem]`}>
                            <HomeIcon className="text-green-600 hover:text-green-800 transition-colors duration-200" fontSize="large" />
                            </button>
                            <div className="text-lg mt-1">ホーム</div>
                        </div>
                    </Link>
                    <Link href="/flow">
                        <div className="flex flex-col items-center">
                            <button className={`rounded-full ${name === "flow" ? "bg-green-100":"bg-white"} shadow-md hover:bg-green-100 transition-colors duration-200 size-[3.4rem]`}>
                            <AccountBalanceWalletIcon className="text-green-600 hover:text-green-800 transition-colors duration-200" fontSize="large" />
                            </button>
                            <div className="text-lg mt-1">支出/収入</div>
                        </div>
                    </Link>

                </div>
    );
}

export default ButtonIcon;