'use client';

import ButtonIcon from "@/components/ButtonIcon";
import Glaf from "../../components/Glaf";
import Cards from "../../components/Cards";
import { useState, useEffect } from "react";
import { ENDPOINTS } from "@/path/PathObject";

type homeResult = {
    date: string;
    label: string;
    amount: number;
    memo: string;
};

const Page = () => {
    const [data, setData] = useState<homeResult[]>([]);
    const [income, setIncome] = useState<number>(0);
    const [expenses, setExpenses] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch(ENDPOINTS.home + "?userId=1")
            .then((res) => {
                if (!res.ok) throw new Error("Fetch failed");
                return res.json();
            })
            .then((json) => {
                // 日付順にソートして保持（Glaf用に重要）
                const sortedData = [...json].sort(
                    (a: homeResult, b: homeResult) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                );
                setData(sortedData);
                setLoading(false);

                // income / expenses を一括集計
                let incomeTotal = 0;
                let expensesTotal = 0;

                sortedData.forEach((item: homeResult) => {
                    if (item.amount > 0) {
                        incomeTotal += item.amount;
                    } else {
                        expensesTotal += Math.abs(item.amount);
                    }
                });

                setIncome(incomeTotal);
                setExpenses(expensesTotal);
            })
            .catch((err) => {
                console.error("Error fetching data", err);
                setLoading(false);
            });
    }, []);

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
            <div className="flex flex-col">
                <div className="flex flex-row justify-around pt-4">
                    <div
                        className="w-[48vw] md:w-[40vw] rounded-md flex flex-col"
                        style={{ backgroundColor: 'rgba(245, 245, 245, 1)' }}
                    >
                        <div className="text-2xl md:text-3xl pl-4">Income</div>
                        <div className="text-3xl md:text-4xl self-center text-green-500">
                            ￥{income}
                        </div>
                    </div>
                    <div
                        className="w-[48vw] md:w-[40vw] rounded-md flex flex-col"
                        style={{ backgroundColor: 'rgba(245, 245, 245, 1)' }}
                    >
                        <div className="text-2xl md:text-3xl pl-4">Expenses</div>
                        <div className="text-3xl md:text-4xl self-center text-red-500">
                            ￥{expenses}
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="w-[80vw] h-[30svh] mt-3.5 mx-auto rounded-lg"
                style={{ backgroundColor: 'rgba(248, 248, 248, 1)' }}
            >
                <Glaf data={data} />
            </div>

            <div
                className="w-[98vw] h-[35svh] md:h-[33svh] mt-3.5 mx-auto rounded-lg"
                style={{ backgroundColor: 'rgba(217, 217, 217, 1)' }}
            >
                <div className="flex flex-col">
                    <div className="text-3xl ml-4">Recentry</div>
                    <Cards data={data} />
                </div>
            </div>

            <div
                className="absolute w-screen bottom-0 h-[15svh]"
                style={{ backgroundColor: 'rgba(239, 239, 239, 1)' }}
            >
                <ButtonIcon name={"home"} />
            </div>
        </div>
    );
};

export default Page;
