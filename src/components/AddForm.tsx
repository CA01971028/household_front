'use client';
import { useState, useRef, useEffect } from "react";

// カテゴリーでヒットする物を指定
const presetCategories: string[] = ['食費', '交通費', '娯楽', '光熱費'];

const AddForm = () => {
    // カテゴリーの中に入っている文字を格納
    const [input, setInput] = useState('');
    // ドロップダウンを管理
    const [showDropdown, setShowDropdown] = useState(false);
    // 金額を管理
    const [amount,setAmount] = useState<string>('');
    // 指定した要素以外のクリックを管理
    const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 入力を含む候補だけフィルター（空文字なら全部）
  const filtered = input
    ? presetCategories.filter(cat => cat.includes(input))
    : presetCategories;

  const selectCategory = (cat: string) => {
    setInput(cat);
    setShowDropdown(false);
  };

  return (
    <div className="grid grid-cols-3 grid-rows-4 w-[80vw] h-[60svh] mt-4 mx-auto bg-white rounded-md p-4 gap-2">
      {/* 日付 */}
      <div className="font-bold text-center col-span-1 h-full flex items-center justify-center">日付</div>
      <input
        type="date"
        defaultValue={new Date().toISOString().split('T')[0]}
        className="text-center col-span-2 h-full flex items-center justify-center rounded-md p-2 text-lg"
      />

      {/* カテゴリー */}
      <div className="font-bold text-center col-span-1 h-full flex items-center justify-center">カテゴリー</div>
      <div ref={containerRef} className="relative col-span-2 h-full flex flex-col justify-center">

        {/* 入力欄 */}
        <input
          type="text"
          value={input}
          onChange={e => {
            setInput(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          placeholder="カテゴリーを入力!"
          className="w-full p-2 border rounded-md text-lg"
        />

        {/* 候補リスト */}
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
        value={amount ? `￥${Number(amount).toLocaleString()}` : '￥'}
        onChange={(e) => {
            // 入力から数字だけを抽出（0-9 以外を削除）
            const rawValue = e.target.value.replace(/[^\d]/g, '');
            setAmount(rawValue);
        }}
        className=" col-span-2 h-[6svh] flex items-center justify-center rounded-md my-auto p-2 text-lg border"
        />


        {/* メモ */}
        <div className="font-bold text-center col-span-1 h-full flex items-center justify-center">メモ</div>
        <textarea
        className="col-span-2 h-full rounded-md p-2 text-lg border resize-none"
        rows={3}
        placeholder="購入の詳細を入力..."
        />
    </div>
  );
};

export default AddForm;
