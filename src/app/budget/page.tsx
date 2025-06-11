'use client';
import { useState } from "react";
import ButtonIcon from "@/components/ButtonIcon";
import Link from "next/link";

type BudgetData = Record<string, [number, number]>;

type ResponseData = {
  data: BudgetData;
  result: boolean; 
};



const page = () => {

    // const [responseData,setResponseData] = useState<ResponseData>(
    //     { 
    //         "data":{
    //                 //配列の前が実際に利用した金額。後が設定した予算を入れる
    //                 "食費":[2000,3000],
    //                 "娯楽":[4000,5000],
    //                 "飲み会":[400000,30000],
    //                 "その他":[500,600]
    //             },
    //         "result":true
    //     })
    const responseData:ResponseData ={ 
            "data":{
                    //配列の前が実際に利用した金額。後が設定した予算を入れる
                    "食費":[2000,3000],
                    "娯楽":[4000,5000],
                    "飲み会":[400000,30000],
                    "その他":[500,600]
                },
            "result":true
        }

    // 月の値を管理
    const [selectedMonth, setSelectedMonth] = useState<string>('2025-05');

    // 年月を指定
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedMonth(e.target.value);
        console.log(selectedMonth);
    };

    // 予算と実際の利用額を計算
    const calculate = (amount:number,budget:number) =>{
        const result = (amount / budget) * 100;
        if (result > 100){
            return 100;
        }else{
            return result;
        }
    }

    return (
        <div className="h-[100svh] w-screen overflow-hidden bg-green-300">

            <div className="flex flex-row mt-8 justify-between">
                <div className="text-3xl md:text-5xl ml-4">予算管理</div>
                {/* 月選択 */}
                <input
                    type="month"
                    min="2020-01"
                    max="2030-12"
                    defaultValue="2025-05"
                    onChange={handleChange}
                    className="mr-4 border bg-white rounded-md w-[40vw]"
                />
            </div>

            {/* メイン */}
            <div className="mt-4 mx-auto w-[90vw] h-[65svh] bg-white rounded-lg">
                <div className="grid grid-cols-2 text-center pt-2">
                    <div className="text-xl">カテゴリ</div>
                    <div className="text-xl">利用金額 / 予算</div>
                </div>
                <hr />
                {/* バーを表示 */}
                <div className="h-[50svh] w-[85vw] mt-2 mx-auto bg-blue-200 ">
                    {/* 1つのバーを表示 */}
                    {Object.entries(responseData.data).map(([category, [amount, budget]]) => {
                        const rocate = calculate(amount, budget);
                        return (
                                <div key={category} className="mb-4">
                                <div className="flex justify-between items-center px-4">
                                    <div className="text-2xl text-black">{category}</div>
                                    <div className="text-xl">￥{amount} / {budget}</div>
                                </div>
                                <div className="w-[80vw] max-w-screen-sm h-3 mx-auto bg-gray-300 rounded-full relative">
                                    <div
                                    className={`${rocate === 100 ? 'bg-red-400' : 'bg-green-500'} h-3 rounded-full transition-width duration-500 ease-in-out`}
                                    style={{ width: `${rocate}%` }}
                                    ></div>
                                    {rocate === 100 && (
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 font-bold bg-orange-400  text-white rounded-lg">
                                        オーバー
                                    </div>
                                    )}
                                </div>
                                </div>
                        );
                    })}
                </div>

                {/* 予算を追加するページに飛ばす */}
                <Link href="/budget/add">
                    <div className="flex justify-center items-center w-[85vw] h-[6svh] mx-auto font-color-white bg-green-400 text-white font-bold rounded-md ">予算を追加</div>
                </Link>
            </div>

            {/* フッター */}
            <div className="absolute w-screen bottom-0 h-[15svh]" style={{ backgroundColor: 'rgba(239, 239, 239, 1)' }}>
                <ButtonIcon name = {"budget"}/>
            </div>
        </div>
    );
}

export default page;