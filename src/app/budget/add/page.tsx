import ButtonIcon from "@/components/ButtonIcon";
import Link from "next/link";

const page = () => {
    return (
        <div className="h-[100svh] w-screen overflow-hidden bg-green-300">

            <Link href="/budget">
                <div className="flex items-center justify-center w-[20vw] h-[7svh] ml-4 mt-4 text-3xl bg-gray-300 rounded-md">戻る</div>
            </Link>

            {/* フッター */}
            <div className="absolute w-screen bottom-0 h-[15svh]" style={{ backgroundColor: 'rgba(239, 239, 239, 1)' }}>
                <ButtonIcon name = {"budget"}/>
            </div>
        </div>
    );
}

export default page;