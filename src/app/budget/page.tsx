'use client';
import { useState } from "react";
import ButtonIcon from "@/components/ButtonIcon";
import Link from "next/link";

const page = () => {

    // 月の値を管理
    const [selectedMonth, setSelectedMonth] = useState<string>('2025-05');

    // 年月を指定
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedMonth(e.target.value);
        console.log(selectedMonth);
    };

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
                <div className="h-[50svh] w-[85vw] mt-2 mx-auto bg-blue-200 ">

                </div>
                <Link href="/budget/add">
                    <div className="flex justify-center items-center w-[85vw] h-[6svh] mx-auto font-color-white bg-green-400 rounded-md">予算を追加</div>
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