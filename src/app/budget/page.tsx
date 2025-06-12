'use client';
import { useState } from "react";
import ButtonIcon from "@/components/ButtonIcon";
import Link from "next/link";
import Circle from "../../components/Circle";

// リクエストで取得した予算データの定義
type BudgetData = Record<string, [number, number]>;
type ResponseData = {
  data: BudgetData;
  result: boolean; 
};

// 円グラフのデータ定義
type CategoryExpense = {
  category: string;
  amount: number;
};
const expenseData: CategoryExpense[] = [
  { category: '食費', amount: 15000 },
  { category: '光熱費', amount: 7000 },
  { category: '交通費', amount: 5000 },
  { category: '通信費光熱費', amount: 4000 },
];

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
                    "教育費":[400000,30000],
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
            <div className="mt-4 mx-auto w-[90vw] h-[70svh] bg-white rounded-lg">
                <div className="grid grid-cols-2 text-center pt-2">
                    <div className="text-xl">カテゴリ</div>
                    <div className="text-xl">利用金額 / 予算</div>
                </div>
                <hr />
                {/* バーを表示 */}
                <div className="h-[56svh] w-[85vw] mt-2 mx-auto">
                    <div className="w-full h-[38svh] overflow-y-scroll bg-red-100">
                        {/* 1つのバーを表示 */}
                        {Object.entries(responseData.data).map(([category, [amount, budget]]) => {
                            const rocate = calculate(amount, budget);
                            const isOver = rocate === 100;

                            return (
                                <div key={category} className={`mb-${isOver ? '10' : '4'} mt-4`}>
                                    <div className="flex justify-between items-center px-4">
                                        <div className="text-2xl text-black">{category}</div>
                                        <div className="text-xl">￥{amount} / {budget}</div>
                                    </div>
                                    <div className="w-[80vw] max-w-screen-sm h-3 mx-auto bg-gray-300 rounded-full relative">
                                        <div
                                        className={`${isOver ? 'bg-red-400' : 'bg-green-500'} h-3 rounded-full transition-width duration-500 ease-in-out`}
                                        style={{ width: `${rocate}%` }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    
                    {/* 円グラフを表示 */}
                    <Circle expenseData = {expenseData} width="w-[85vw]" height="h-[19svh]" budget = {true}/>
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