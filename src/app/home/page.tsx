import BottonIcon from "@/components/BottonIcon";

const page = () => {
    return (
        <div className="h-svh w-screen bg-green-300">
            <div className="flex flex-col">
                <div className="flex flex-row justify-around">
                    <div className="w-[48vw] h-[12svh] rounded-md" style={{backgroundColor:'rgba(245, 245, 245, 1)'}}>Income</div>
                    <div className="w-[48vw] rounded-md" style={{backgroundColor:'rgba(245, 245, 245, 1)'}}>Expenses</div>
                </div>
            </div>
            <div className="absolute w-screen bottom-0 h-[15svh]" style={{ backgroundColor: 'rgba(239, 239, 239, 1)' }}>
                <BottonIcon/>
            </div>
        </div>
    );
}

export default page;