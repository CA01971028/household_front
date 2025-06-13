'use client';
import ButtonIcon from "@/components/ButtonIcon";
import Link from "next/link";
import { useState,useEffect } from "react";

const page = () => {

    // 月の値を管理
    const [selectedMonth, setSelectedMonth] = useState<string>('2025-05');
    const [input, setInput] = useState<string>('');
    const [amount, setAmount] = useState<string>(''); // 金額を文字列として管理
    const [isEditingAmount, setIsEditingAmount] = useState<boolean>(true); // ★ 金額編集中かどうか
    // 年月を指定
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedMonth(e.target.value);
    };

    useEffect(() => {
        console.log("月が変更されました:", selectedMonth);
    }, [selectedMonth]);

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
                onSubmit={(e)=>{
                    e.preventDefault();

                    // 金額のバリデーション
                    if (!amount || Number(amount) === 0) {
                        alert("金額を入力してください！");
                        return; // 処理を中断
                    }

                    console.log(input)
                }}
            >
                <div className="flex flex-row justify-end pt-4">
                    {/* 月選択 */}
                    <input
                        type="month"
                        min="2020-01"
                        max="2030-12"
                        defaultValue="2025-05"
                        onChange={handleChange}
                        className="mr-4 border bg-white rounded-md h-[5svh] w-[40vw]"
                    />
                </div>
                {/* カテゴリーを表示 */}
                <div className="text-2xl mt-4 mx-auto">カテゴリ</div>
                <div className="flex justify-center mt-2">
                    <input
                    type="text"
                    name="category"
                    onChange={e => setInput(e.target.value)}
                    placeholder="カテゴリーを入力!"
                    className="p-2 border rounded-md text-lg w-[60vw]"
                    required
                    />
                </div>

                <div className="text-2xl mt-4 mx-auto">予算</div>
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
                    className="col-span-2 h-[6svh] flex items-center justify-center rounded-md my-auto p-2 text-lg border"
                    required
                />
                </div>
                <div className="mt-4 flex justify-center items-center">
                    {/* 予算登録ボタン */}
                    <input
                        type="submit"
                        value="予算を登録"
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    />
                </div>

            </form>

            {/* フッター */}
            <div className="absolute w-screen bottom-0 h-[15svh]" style={{ backgroundColor: 'rgba(239, 239, 239, 1)' }}>
                <ButtonIcon name = {"budget"}/>
            </div>
        </div>
    );
}

export default page;