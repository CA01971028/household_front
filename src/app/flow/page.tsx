import ButtonIcon from "@/components/ButtonIcon";

const page = () => {
    return (
        <div className="h-[100svh] w-screen bg-green-300">
            <div className="absolute w-screen bottom-0 h-[15svh]" style={{ backgroundColor: 'rgba(239, 239, 239, 1)' }}>
                <ButtonIcon name = {"flow"}/>
            </div>
        </div>
    );
}

export default page;