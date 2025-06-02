'use client';
import { useState,useEffect } from "react";

type Items = {
  "日付": string;
  "カテゴリー": string;
  "金額": number;
  "メモ": string;
};

type Props = {
  filter: "All" | "Income" | "Expense";
  yearMonth: string;
};
// yearMonthで指定された年月を表示
const Item = ({ filter,yearMonth}: Props) => {

  const [filItem,setFilItem] = useState<Items[]|null>([]); 

  const expenseItems: Items[] = [
    { "日付": "2025-01-24", "カテゴリー": "食費", "金額": -5000, "メモ": "ー" },
    { "日付": "2025-01-25", "カテゴリー": "食費", "金額": -5000, "メモ": "ー" },
    { "日付": "2025-02-24", "カテゴリー": "食費", "金額": -5000, "メモ": "ー" },
    { "日付": "2025-02-26", "カテゴリー": "食費", "金額": -5000, "メモ": "ー" },
    { "日付": "2025-03-28", "カテゴリー": "食費", "金額": -5000, "メモ": "ー" },
    { "日付": "2025-03-29", "カテゴリー": "食費", "金額": -5000, "メモ": "ー" },
    { "日付": "2025-03-30", "カテゴリー": "食費", "金額": -5000, "メモ": "ー" },
  ];


  const incomItems: Items[] = [
    { "日付": "2025-01-24", "カテゴリー": "食費", "金額": 5000, "メモ": "ー" },
    { "日付": "2025-01-25", "カテゴリー": "食費", "金額": 5000, "メモ": "ー" },
    { "日付": "2025-02-24", "カテゴリー": "食費", "金額": 5000, "メモ": "ー" },
    { "日付": "2025-02-26", "カテゴリー": "食費", "金額": 5000, "メモ": "ー" },
    { "日付": "2025-03-28", "カテゴリー": "食費", "金額": 5000, "メモ": "ー" },
    { "日付": "2025-03-29", "カテゴリー": "食費", "金額": 5000, "メモ": "ー" },
    { "日付": "2025-03-30", "カテゴリー": "食費", "金額": 5000, "メモ": "ー" },
  ];

  const formatDate = (isoDate:string):string =>{
    const dateObj = new Date(isoDate);
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    return `${month}/${day}`;
  }

  useEffect(()=>{
    if(filter === "All"){
       setFilItem(incomItems);
    }else if(filter === "Expense"){
       setFilItem(expenseItems);
    }else {
       setFilItem(incomItems);
    }
  },[filter])

  return (
    <div
      className="grid grid-cols-4 text-center h-[30svh] overflow-y-scroll"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    > 
      {filter === "Expense" ?
        (
          filItem && filItem.map((value, index) => (
              <div key={index} className="contents">
                <div className={`border-b h-[5svh] text-sm flex items-center justify-center ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                  {formatDate(value["日付"])}
                </div>
                <div className={`border-b h-[5svh] text-sm flex items-center justify-center ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                  {value["カテゴリー"]}
                </div>
                <div className={`border-b h-[5svh] text-sm flex items-center justify-center ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                  {value["金額"]}
                </div>
                <div className={`border-b h-[5svh] text-sm flex items-center justify-center ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                  {value["メモ"]}
                </div>
              </div>
            )
          )
        ):(
            filItem && filItem.map((value, index) => (
                <div key={index} className="contents">
                  <div className={`border-b h-[5svh] text-sm flex items-center justify-center ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                  {formatDate(value["日付"])}
                  </div>
                  <div className={`border-b h-[5svh] text-sm flex items-center justify-center ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                    {value["カテゴリー"]}
                  </div>
                  <div className={`border-b h-[5svh] text-sm flex items-center justify-center ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                    {value["金額"]}
                  </div>
                  <div className={`border-b h-[5svh] text-sm flex items-center justify-center ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                    {value["メモ"]}
                  </div>
                </div>
              )
            )
        )
      }
    </div>
  );
};

export default Item;
