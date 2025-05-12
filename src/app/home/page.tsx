import BottonIcon from "@/components/BottonIcon";

const page = () => {
    return (
        <div className="h-svh w-screen bg-green-300">
            <div className="absolute w-screen bottom-0 h-[15svh]" style={{ backgroundColor: 'rgba(239, 239, 239, 1)' }}>
                <BottonIcon/>
            </div>
        </div>
    );
}

export default page;