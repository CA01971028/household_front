import ButtonIcon from "@/components/ButtonIcon";

const page = () => {
    return (
        <div className="h-svh w-screen bg-green-300">
            <div className="absolute w-screen bottom-0 h-[12svh]" style={{ backgroundColor: 'rgba(239, 239, 239, 1)' }}>
                <ButtonIcon name = {"budget"}/>
            </div>
        </div>
    );
}

export default page;