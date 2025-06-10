'use client';
import { useState, useRef, useEffect } from "react";

// カテゴリーでヒットする物を指定
const presetCategories: string[] = ['食費', '交通費', '娯楽', '光熱費'];

const AddForm = () => {
    const [input, setInput] = useState<string>('');
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [amount, setAmount] = useState<string>(''); // 金額を文字列として管理
    const [isEditingAmount, setIsEditingAmount] = useState<boolean>(true); // ★ 金額編集中かどうか
    const [moneyFlow,setMoneyFlow] = useState<boolean>(false);// 支出か収入かのボタンを管理
    const containerRef = useRef<HTMLDivElement>(null);
    const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [memo, setMemo] = useState<string>('');

    //ボタンを押されたら実行
    const handleClickExpense = ()=>{
        setMoneyFlow(false);
    }
    const handleClickIncome = ()=>{
        setMoneyFlow(true);
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filtered = input
        ? presetCategories.filter(cat => cat.includes(input))
        : presetCategories;

    const selectCategory = (cat: string) => {
        setInput(cat);
        setShowDropdown(false);
    };

    return (
        <>
            <div className="flex flex-row w-full h-[8svh] mt-4 items-center justify-center">
                <div className={`flex items-center justify-center text-3xl w-[40vw] h-full ${!moneyFlow ? 'bg-green-500' : 'bg-gray-300'} rounded-md rounded-r-none`}onClick={handleClickExpense}>
                    支出
                </div>
                <div className={`flex items-center justify-center text-3xl w-[40vw] h-full ${moneyFlow ? 'bg-green-500' : 'bg-gray-300'} rounded-md rounded-r-none`}onClick={handleClickIncome}>
                    収入
                </div>
            </div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();

                    // 金額のバリデーション
                    if (!amount || Number(amount) === 0) {
                        alert("金額を入力してください！");
                        return; // 処理を中断
                    }

                    // 通常の処理
                    console.log({
                        moneyFlow: moneyFlow ? "収入" : "支出",
                        date,
                        category: input,
                        amount,
                        memo,
                    });
                }}
                className="grid grid-cols-3 grid-rows-4 w-[80vw] h-[60svh] mt-4 mx-auto bg-white rounded-md p-4 gap-2"
            >
                {/* 日付 */}
                <div className="font-bold text-center col-span-1 h-full flex items-center justify-center">日付</div>
                <input
                type="date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="text-center col-span-2 h-full flex items-center justify-center rounded-md p-2 text-lg"
                required
                />

                {/* カテゴリー */}
                <div className="font-bold text-center col-span-1 h-full flex items-center justify-center">カテゴリー</div>
                <div ref={containerRef} className="relative col-span-2 h-full flex flex-col justify-center">
                    <input
                    type="text"
                    name="category"
                    value={input}
                    onChange={e => {
                        setInput(e.target.value);
                        setShowDropdown(true);
                    }}
                    onFocus={() => setShowDropdown(true)}
                    placeholder="カテゴリーを入力!"
                    className="w-full p-2 border rounded-md text-lg"
                    required
                    />
                    {showDropdown && (
                    <ul className="absolute top-full left-0 right-0 bg-white border rounded-md mt-1 max-h-48 overflow-auto shadow-lg z-10">
                        {filtered.length > 0 ? (
                        filtered.map(cat => (
                            <li
                            key={cat}
                            onClick={() => selectCategory(cat)}
                            className="p-2 cursor-pointer hover:bg-blue-100"
                            >
                            {cat}
                            </li>
                        ))
                        ) : (
                        <li className="p-2 text-gray-500">「{input}」は新しいカテゴリーとして使われます</li>
                        )}
                    </ul>
                    )}
                </div>

                {/* 金額 */}
                <div className="font-bold text-center col-span-1 h-full flex items-center justify-center">金額</div>
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

                {/* メモ */}
                <div className="font-bold text-center col-span-1 h-full flex items-center justify-center">メモ</div>
                <textarea
                name="memo"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                className="col-span-2 h-full rounded-md p-2 text-lg border resize-none"
                rows={3}
                placeholder="購入の詳細を入力..."
                />

                <button
                type="submit"
                className="col-span-3 mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    登録する
                </button>
            </form>
        </>
    );
};

export default AddForm;
