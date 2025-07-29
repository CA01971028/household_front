'use client'
import ButtonIcon from "@/components/ButtonIcon";
import Hist from "../../components/Hist"
import Circle from "../../components/Circle"
import Link from "next/link";
import { useEffect, useState } from "react";
import Item from "../../components/Item"
import { ENDPOINTS } from "@/path/PathObject";


type FlowResult = {
    date: string;
    label: string;
    amount: number;
    memo: string;
};


const page = () => {
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

    //グリッドの項目を定義
    const itemName:string[] = ["日付","タグ","金額","メモ"];
    //表が表示する項目を定義
    const [itemFilter,setItemFilter] = useState<"All"|"Income"|"Expense">('All');
    //任意のデータを取得
    const [data, setData] = useState<FlowResult[]>([]);
    //ローディングを管理
    const [loading , setLoading] = useState<boolean>(true);

    const [selectedMonth, setSelectedMonth] = useState<string>(currentMonth);

    useEffect(() => {
        const [year,month] = selectedMonth.split("-")
        fetch(ENDPOINTS.flow + '?month=' + month + '&year=' + year,{
            method:"GET",
            credentials:"include",
        })
        .then((res) =>{
            if (!res.ok) throw new Error("Fetch failed");
            return res.json();
        })
        .then((json) => {
            const sortedData = [...json].sort((a: FlowResult, b: FlowResult) =>
                new Date(b.date).getTime() - new Date(a.date).getTime()
            )
            setData(sortedData);
            setLoading(false);
        })
    },[selectedMonth,itemFilter])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedMonth(e.target.value);
        console.log('選択された年月:', e.target.value);
    };

    if (loading) {
        return (
            <div className="h-[100svh] flex flex-col justify-center items-center bg-white">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <div className="text-xl text-blue-600">Loading...</div>
            </div>
        );
    }

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
                        defaultValue={selectedMonth}
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
                    <div className="grid grid-cols-[15%_20%_20%_45%] text-center font-semibold border-b">
                        {itemName.map((value: string, index: number) => (
                        <div key={index} className="py-2">{value}</div>
                        ))}
                    </div>
                    {/* itemの中身を表示*/}
                    <Item filter = {itemFilter} data = {data}/>
                </div>
                <div className="flex flex-row p-2 md:w-[60vw]">
                    <Hist amounts={data.map(item => item.amount)}/>
                    <Circle
                    expenseData={
                        Object.entries(
                        data
                            .filter(item => item.amount < 0)
                            .reduce<Record<string, number>>((acc, item) => {
                            const category = item.label;
                            const amount = Math.abs(item.amount);
                            acc[category] = (acc[category] || 0) + amount;
                            return acc;
                            }, {})
                        ).map(([category, amount]) => ({ category, amount }))
                    }
                    width="w-[55vw]"
                    height="h-[28svh]"
                    budget={false}
                    size = {210}
                    />
                </div>
            </div>


            <div className="absolute w-screen bottom-0 h-[15svh]" style={{ backgroundColor: 'rgba(239, 239, 239, 1)' }}>
                <ButtonIcon name = {"flow"}/>
            </div>
        </div>
    );
}

export default page;