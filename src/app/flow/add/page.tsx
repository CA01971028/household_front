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
            </div>
            <AddForm/>
            <div className="absolute w-screen bottom-0 h-[15svh]" style={{ backgroundColor: 'rgba(239, 239, 239, 1)' }}>
                <ButtonIcon name = {"flow"}/>
            </div>
        </div>
    );
}

export default page;