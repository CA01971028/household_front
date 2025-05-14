import ButtonIcon from "@/components/ButtonIcon";
import Glaf from "../../components/Glaf"

const page = () => {
    return (
        <div className="h-svh w-screen bg-green-300">
            <div className="flex flex-col">
                <div className="flex flex-row justify-around pt-4">
                    <div className="w-[48vw] md:w-[40vw] rounded-md flex flex-col" style={{backgroundColor:'rgba(245, 245, 245, 1)'}}>
                        <div className="text-2xl md:text-3xl pl-4">Income</div>
                        <div className="text-3xl md:text-4xl self-center text-green-500">\2,500</div>
                    </div>
                    <div className="w-[48vw] md:w-[40vw] rounded-md flex flex-col" style={{backgroundColor:'rgba(245, 245, 245, 1)'}}>
                        <div className="text-2xl md:text-3xl pl-4">Expenses</div>
                        <div className="text-3xl md:text-4xl self-center text-red-500">\2,500</div>
                    </div>
                </div>
            </div>

            <div className="w-[80vw] h-[30svh] mt-3.5 mx-auto rounded-lg " style={{backgroundColor:'rgba(248, 248, 248, 1)'}}>
                <Glaf/>
            </div>
            <div className="w-[95vw] h-[36svh] md:h-[43svh] mt-3.5 mx-auto rounded-lg" style={{backgroundColor:'rgba(217, 217, 217, 1)'}}></div>

            <div className="absolute w-screen bottom-0 h-[15svh]" style={{ backgroundColor: 'rgba(239, 239, 239, 1)' }}>
                <ButtonIcon name = {"home"}/>
            </div>
        </div>
    );
}

export default page;