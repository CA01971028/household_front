'use client';
import ButtonIcon from "@/components/ButtonIcon";
import { ENDPOINTS } from "@/path/PathObject";
import Link from "next/link";
import { useState, useEffect } from "react";

const Page = () => {
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const [selectedMonth, setSelectedMonth] = useState<string>(currentMonth);
  const [input, setInput] = useState<string>('');
  const [amount, setAmount] = useState<string>(''); // 数値を文字列で管理
  const [isEditingAmount, setIsEditingAmount] = useState<boolean>(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMonth(e.target.value);
  };

  useEffect(() => {
    console.log("月が変更されました:", selectedMonth);
  }, [selectedMonth]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || Number(amount) === 0) {
      alert("金額を入力してください！");
      return;
    }

    const [yearStr, monthStr] = selectedMonth.split("-");
    const year = Number(yearStr);
    const month = String(Number(monthStr)); // "01" → "1"

    const body = {
      userId: "1", 
      category: input,
      amount: Number(amount),
      year: year,
      month: month,
    };

    try {
      const res = await fetch(ENDPOINTS.budgetPost, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || "予算が設定されました！");
        // リセット処理が必要ならここに追加
      } else {
        alert(data.message || "予算が設定できませんでした。");
      }
    } catch (error) {
      console.error("送信エラー:", error);
      alert("サーバーとの通信に失敗しました。");
    }
  };

  return (
    <div className="h-[100svh] w-screen overflow-hidden bg-green-300">
      <div className="flex flex-row items-center justify-between mt-4 px-4">
        <Link href="/budget">
          <div className="flex items-center justify-center w-[20vw] h-[7svh] text-3xl bg-gray-300 rounded-md">
            戻る
          </div>
        </Link>
      </div>

      <div className="text-4xl text-center flex-1">予算管理</div>

      <form 
        className="w-[80vw] h-[50svh] mt-4 rounded-lg mx-auto bg-white"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-row justify-end pt-4">
          <input
            type="month"
            min="2020-01"
            max="2030-12"
            defaultValue={selectedMonth}
            onChange={handleChange}
            className="mr-4 border bg-white rounded-md h-[5svh] w-[40vw]"
          />
        </div>

        <div className="text-2xl mt-4 ml-4 mx-auto">カテゴリ</div>
        <div className="flex justify-center mt-2">
          <input
            type="text"
            name="category"
            onChange={(e) => setInput(e.target.value)}
            placeholder="カテゴリーを入力!"
            className="p-2 border rounded-md text-lg w-[60vw]"
            required
          />
        </div>

        <div className="text-2xl mt-4 ml-4 mx-auto">予算</div>
        <div className="flex justify-center mt-2">
          <input
            type="text"
            name="amount"
            inputMode="numeric"
            value={
              isEditingAmount
                ? amount
                : amount
                ? `￥${Number(amount).toLocaleString()}`
                : '￥'
            }
            onChange={(e) => {
              const rawValue = e.target.value.replace(/[^\d]/g, '');
              setAmount(rawValue);
            }}
            onFocus={() => setIsEditingAmount(true)}
            onBlur={() => setIsEditingAmount(false)}
            className="col-span-2 w-[60vw] flex items-center justify-center rounded-md my-auto p-2 text-lg border"
            required
          />
        </div>

        <div className="mt-4 flex justify-center items-center">
          <input
            type="submit"
            value="予算を登録"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          />
        </div>
      </form>

      {/* フッター */}
      <div className="absolute w-screen bottom-0 h-[15svh]" style={{ backgroundColor: 'rgba(239, 239, 239, 1)' }}>
        <ButtonIcon name="budget" />
      </div>
    </div>
  );
};

export default Page;
