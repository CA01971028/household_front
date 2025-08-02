'use client';

import { useState, useEffect } from "react";
import ButtonIcon from "@/components/ButtonIcon";
import Link from "next/link";
import Circle from "../../components/Circle";
import { ENDPOINTS } from "@/path/PathObject";

type BudgetData = Record<string, [number, number]>;
type ResponseData = {
  result: boolean;
  data: BudgetData;
};

type CategoryExpense = {
  category: string;
  amount: number;
};

const Page = () => {
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  const [selectedMonth, setSelectedMonth] = useState<string>(currentMonth);
  const [responseData, setResponseData] = useState<ResponseData>();
  const [expenseData, setExpenseData] = useState<CategoryExpense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const [year, month] = selectedMonth.split('-');

    const fetchBudget = async () => {
      const response = await fetch(ENDPOINTS.budget + `?year=${year}&month=${month}`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) throw new Error("予算APIエラー");
      const data: ResponseData = await response.json();

      // ✅ amount（支出金額）を正の数に修正
      const fixedData: BudgetData = {};
      for (const [category, [amount, budget]] of Object.entries(data.data)) {
        fixedData[category] = [Math.abs(amount), budget];
      }

      setResponseData({
        result: data.result,
        data: fixedData,
      });
    };

    const fetchExpenses = async () => {
      const response = await fetch(ENDPOINTS.home,{
            method:"GET",
            credentials: "include",
      });
      if (!response.ok) throw new Error("支出APIエラー");
      const data = await response.json();

      const mergedExpenses: Record<string, number> = {};
      data.forEach((item: any) => {
        if (item.amount < 0) {
          const category = item.label;
          const amount = Math.abs(item.amount);
          mergedExpenses[category] = (mergedExpenses[category] || 0) + amount;
        }
      });

      const expenses: CategoryExpense[] = Object.entries(mergedExpenses).map(
        ([category, amount]) => ({ category, amount })
      );
      setExpenseData(expenses);
    };

    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchBudget(), fetchExpenses()]);
      } catch (error) {
        console.error("データ取得失敗:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedMonth]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMonth(e.target.value);
  };

  const calculate = (amount: number, budget: number) => {
    const result = (amount / budget) * 100;
    return result > 100 ? 100 : result;
  };

  if (loading) {
    return (
      <div className="h-[100svh] flex flex-col justify-center items-center bg-white">
        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <div className="text-xl text-green-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-[100svh] w-screen overflow-hidden bg-green-300">
      <div className="flex flex-row mt-8 justify-between">
        <div className="text-3xl md:text-5xl ml-4">予算管理</div>
        <input
          type="month"
          min="2020-01"
          max="2030-12"
          value={selectedMonth}
          onChange={handleChange}
          className="mr-4 border bg-white rounded-md w-[40vw]"
        />
      </div>

      <div className="mt-4 mx-auto w-[90vw] h-[70svh] bg-white rounded-lg">
        <div className="grid grid-cols-2 text-center pt-2">
          <div className="text-xl">カテゴリ</div>
          <div className="text-xl">利用金額 / 予算</div>
        </div>
        <hr />
        <div className="h-[56svh] w-[85vw] mt-2 mx-auto relative">
          <div className="w-full h-[38svh] overflow-y-scroll bg-green-100">
            {responseData && Object.entries(responseData.data).map(([category, [amount, budget]]) => {
              const rocate = calculate(amount, budget);
              const isOver = rocate === 100;

              return (
                <div key={category} className={`mb-${isOver ? '10' : '4'} mt-4`}>
                  <div className="flex justify-between items-center px-4">
                    <div className="text-2xl text-black">{category}</div>
                    <div className="text-xl">￥{Math.abs(amount)} / ￥{budget}</div>
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

          <div className="w-full h-[19svh] flex items-center justify-center">
            <Circle
              expenseData={expenseData}
              width="w-[85vw]"
              height="h-[19svh]"
              budget={true}
              size={140}
            />
          </div>
        </div>

        <Link href="/budget/add">
          <div className="flex justify-center items-center w-[85vw] h-[6svh] mx-auto font-color-white bg-green-400 text-white font-bold rounded-md">
            予算を追加
          </div>
        </Link>
      </div>

      <div className="absolute w-screen bottom-0 h-[15svh]" style={{ backgroundColor: 'rgba(239, 239, 239, 1)' }}>
        <ButtonIcon name={"budget"} />
      </div>
    </div>
  );
};

export default Page;
