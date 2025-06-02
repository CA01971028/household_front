import ButtonIcon from "@/components/ButtonIcon";
import Link from 'next/link';
import AddForm from "../../../components/AddForm";

const page = () => {
    return (
        <div className="h-[100svh] w-screen bg-green-300">

            <div className="flex flex-row justify-between">
                <Link href="/flow">
                    <div className="mt-4 p-1 ml-4 text-3xl bg-gray-300 rounded-sm">戻る</div>
                </Link>
                <div className="mt-4 p-1 mr-4 text-3xl bg-green-100 rounded-sm border-3 border-green-400">登録</div>
            </div>

            <div className="flex flex-row w-full h-[8svh] mt-4 items-center justify-center">
                <div className="flex items-center justify-center text-3xl w-[40vw] h-full bg-green-500 rounded-md rounded-r-none">
                    支出
                </div>
                <div className="flex items-center justify-center text-3xl w-[40vw] h-full bg-gray-300 rounded-md rounded-l-none">
                    収入
                </div>
            </div>

            <AddForm/>

            <div className="absolute w-screen bottom-0 h-[15svh]" style={{ backgroundColor: 'rgba(239, 239, 239, 1)' }}>
                <ButtonIcon name = {"flow"}/>
            </div>
        </div>
    );
}

export default page;