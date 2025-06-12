'use client'
import ButtonIcon from "@/components/ButtonIcon";
import Hist from "../../components/Hist"
import Circle from "../../components/Circle"
import Link from "next/link";
import { useState } from "react";
import Item from "../../components/Item"

type CategoryExpense = {
  category: string;
  amount: number;
};

const expenseData: CategoryExpense[] = [
  { category: '食費', amount: 15000 },
  { category: '交通費', amount: 5000 },
  { category: '娯楽', amount: 3000 },
  { category: '光熱費', amount: 7000 },
  { category: '通信費光熱費', amount: 4000 },
];

const page = () => {
    //グリッドの項目を定義
    const itemName:string[] = ["日付","カテゴリー","金額","メモ"];
    //表が表示する項目を定義
    const [itemFilter,setItemFilter] = useState<"All"|"Income"|"Expense">('All');

    const [selectedMonth, setSelectedMonth] = useState<string>('2025-05');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedMonth(e.target.value);
        console.log('選択された年月:', e.target.value);
    };

    return (
        <div className="h-[100svh] w-screen bg-green-300">

            <div className="w-full flex flex-col sm:flex-row pt-4 md:gap-x-2 justify-center items-center">
                {/* ボタン */}
                <Link href={"/flow/add"}><input
                    type="button"
                    value="New Transaction"
                    className="h-[2.5rem] md:w-full w-[60vw] border-2 rounded-md text-white font-semibold bg-[rgba(81,255,65,1)] hover:bg-[#8af081]"
                /></Link>
                <div className=" flex sm:flex-row gap-x-2 mt-2 md:mt-0"> 
                    {/* 月選択 */}
                    <input
                        type="month"
                        min="2020-01"
                        max="2030-12"
                        defaultValue="2025-05"
                        onChange={handleChange}
                        className="border bg-white rounded-md w-[60vw] md:w-[20vw] "
                    />

                    {/* カテゴリ */}
                    <div className="w-full sm:w-[60vw] flex border rounded-md overflow-hidden">
                        <div 
                            className={`flex-1 sm:w-[20vw] text-center py-2 border-r-1 
                                ${itemFilter === "All" ? "bg-green-100" : "bg-gray-300 hover:bg-green-50"}`}
                            onClick={() => setItemFilter("All")}
                        >All</div>
                        <div 
                            className={`flex-1 sm:w-[20vw] text-center py-2 border-r-1 
                                ${itemFilter === "Expense" ? "bg-green-100" : "bg-gray-300 hover:bg-green-50"}`}
                            onClick={() => setItemFilter("Expense")}
                        >Expense</div>
                        <div 
                            className={`flex-1 sm:w-[20vw] text-center py-2 border-r-1 
                                ${itemFilter === "Income" ? "bg-green-100" : "bg-gray-300 hover:bg-green-50"}`}
                            onClick={() => setItemFilter("Income")}
                        >Income</div>
                    </div>
                </div>
            </div>
            <div className="md:flex md:flex-col items-center">
                {/* item */}
                <div className="w-[90vw] mt-4 mx-auto bg-white rounded-lg">
                    {/* ヘッダー（固定表示） */}
                    <div className="grid grid-cols-4 text-center font-semibold border-b">
                        {itemName.map((value: string, index: number) => (
                        <div key={index} className="py-2">{value}</div>
                        ))}
                    </div>
                    {/* itemの中身を表示*/}
                    <Item filter = {itemFilter} yearMonth = {selectedMonth}/>
                </div>
                <div className="flex flex-row p-2 md:w-[60vw]">
                    <Hist/>
                    <Circle expenseData = {expenseData} width = "w-[55vw]" height="h-[28svh]" budget={false}/>
                </div>
            </div>


            <div className="absolute w-screen bottom-0 h-[15svh]" style={{ backgroundColor: 'rgba(239, 239, 239, 1)' }}>
                <ButtonIcon name = {"flow"}/>
            </div>
        </div>
    );
}

export default page;