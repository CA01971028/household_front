'use client';
import { useState, useRef, useEffect } from "react";
import { ENDPOINTS } from "../path/PathObject"; // ← あなたの設定に応じて調整

const presetCategories: string[] = ['食費', '交通費', '娯楽', '光熱費'];

const AddForm = () => {
  const [input, setInput] = useState<string>('');
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>('');
  const [isEditingAmount, setIsEditingAmount] = useState<boolean>(true);
  const [moneyFlow, setMoneyFlow] = useState<boolean>(false); // false=支出, true=収入
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [memo, setMemo] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);

  // 支出 or 収入 ボタン切り替え
  const handleClickExpense = () => setMoneyFlow(false);
  const handleClickIncome = () => setMoneyFlow(true);

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

  // 送信処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || Number(amount) === 0) {
      alert("金額を入力してください！");
      return;
    }

    const payload = {
      date,
      category: input,
      amount: moneyFlow ? Number(amount) : -Number(amount),
      memo,
      userId:1,
    };

    try {
      const response = await fetch(ENDPOINTS.flowPost, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok && result.success === "true") {
        alert("登録に成功しました！");
        setInput('');
        setAmount('');
        setMemo('');
        setDate(new Date().toISOString().split('T')[0]);
      } else {
        alert(`登録失敗: ${result.message}`);
      }
    } catch (error) {
      console.error("通信エラー:", error);
      alert("サーバーとの通信に失敗しました");
    }
  };

  return (
    <>
      <div className="flex flex-row w-full h-[8svh] mt-4 items-center justify-center">
        <div
          className={`flex items-center justify-center text-3xl w-[40vw] h-full ${!moneyFlow ? 'bg-green-500' : 'bg-gray-300'} rounded-md rounded-r-none`}
          onClick={handleClickExpense}
        >
          支出
        </div>
        <div
          className={`flex items-center justify-center text-3xl w-[40vw] h-full ${moneyFlow ? 'bg-green-500' : 'bg-gray-300'} rounded-md rounded-l-none`}
          onClick={handleClickIncome}
        >
          収入
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
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

        {/* 送信ボタン */}
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
