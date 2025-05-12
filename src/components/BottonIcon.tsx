import HomeIcon from '@mui/icons-material/Home';
import SavingsIcon from '@mui/icons-material/Savings';
import AccountBalanceWallet from '@mui/icons-material';
const BottonIcon = () => {
    return (
        <div className='flex flex-row items-center justify-center h-[15svh]'>
            <div className="flex flex-col">
                <button className="my-auto rounded-full bg-white shadow-md hover:bg-green-100 transition-colors duration-200 size-[3.4rem]">
                    <SavingsIcon className="text-green-600 hover:text-green-800 transition-colors duration-200" fontSize="large" />
                </button>
                <div className='text-lg'>予算</div>
            </div>
            <div className="flex flex-col">
                <button className="my-auto rounded-full bg-white shadow-md hover:bg-green-100 transition-colors duration-200 size-[3.4rem]">
                    <HomeIcon className="text-green-600 hover:text-green-800 transition-colors duration-200" fontSize="large" />
                </button>
                <div className='text-lg'>ホーム</div>
            </div>
            <div className="flex flex-col">
                <button className="my-auto rounded-full bg-white shadow-md hover:bg-green-100 transition-colors duration-200 size-[3.4rem]">
                    <AccountBalanceWallet className="text-green-600 hover:text-green-800 transition-colors duration-200" fontSize="large" />
                </button>
                <div className='text-lg'>支出/収入</div>
            </div>
        </div>
    );
}

export default BottonIcon;