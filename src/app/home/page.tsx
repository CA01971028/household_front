import ButtonIcon from "@/components/ButtonIcon";
import Glaf from "../../components/Glaf"
import Cards from "../../components/Cards"

type homeResult = {
    "date": string;
    "label":string;
    "amount":number;
    "memo":string;
}


const page = () => {
    // const demoData: homeResult[] = [
    //     {
    //         "date": "2023-10-01",
    //         "label": "給与",
    //         "amount": 2500,
    //         "memo": "月々の給与"
    //     },
    //     {
    //         "date": "2023-10-02",
    //         "label": "食費",
    //         "amount": -500,
    //         "memo": "週ごとの食料品"
    //     },
    //     {
    //         "date": "2023-10-03",
    //         "label": "光熱費",
    //         "amount": -300,
    //         "memo": "電気代と水道代"
    //     },
    //     {
    //         "date": "2023-10-04",
    //         "label": "外食",
    //         "amount": -200,
    //         "memo": "友人と夕食"
    //     }
    // ]
    const demoData: homeResult[] = []

    return (
        <div className="h-[100svh] w-screen bg-green-300">
            <div className="flex flex-col">
                <div className="flex flex-row justify-around pt-4">
                    <div className="w-[48vw] md:w-[40vw] rounded-md flex flex-col" style={{backgroundColor:'rgba(245, 245, 245, 1)'}}>
                        <div className="text-2xl md:text-3xl pl-4">Income</div>
                        <div className="text-3xl md:text-4xl self-center text-green-500">￥2,500</div>
                    </div>
                    <div className="w-[48vw] md:w-[40vw] rounded-md flex flex-col" style={{backgroundColor:'rgba(245, 245, 245, 1)'}}>
                        <div className="text-2xl md:text-3xl pl-4">Expenses</div>
                        <div className="text-3xl md:text-4xl self-center text-red-500">￥2,500</div>
                    </div>
                </div>
            </div>

            <div className="w-[80vw] h-[30svh] mt-3.5 mx-auto rounded-lg " style={{backgroundColor:'rgba(248, 248, 248, 1)'}}>
                <Glaf data = {demoData} />
            </div>
            
            <div className="w-[98vw] h-[35svh] md:h-[33svh] mt-3.5 mx-auto rounded-lg" style={{backgroundColor:'rgba(217, 217, 217, 1)'}}>
                <div className="flex flex-col">
                    <div className="text-3xl ml-4">Recentry</div>
                    <Cards data = {demoData} />
                </div>
            </div>

            <div className="absolute w-screen bottom-0 h-[15svh]" style={{ backgroundColor: 'rgba(239, 239, 239, 1)' }}>
                <ButtonIcon name = {"home"}/>
            </div>
        </div>
    );
}

export default page;