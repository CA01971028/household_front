'use client';
import { useState,useEffect } from "react";

type FlowResult = {
    date: string;
    label: string;
    amount: number;
    memo: string;
};

type Props = {
  filter: "All" | "Income" | "Expense";
  data:FlowResult[];
};

// yearMonthで指定された年月を表示
const Item = ({ filter,data}: Props) => {

  const [filItem,setFilItem] = useState<FlowResult[]>(data); 

  const formatDate = (isoDate:string):string =>{
    const dateObj = new Date(isoDate);
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    return `${month}/${day}`;
  }

  useEffect(()=>{
    if(filter === "Income"){
        setFilItem(data.filter(item => item.amount >= 0));
    }else if(filter === "Expense"){
        setFilItem(data.filter(item => item.amount < 0));
    }else{
        setFilItem(data);
    }
  },[filter,data])

  return (
    <div
        className="grid grid-cols-[15%_20%_20%_45%] max-h-[30svh] overflow-y-auto text-sm"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
        {
            filItem && filItem.map((value, index) => (
                <div key={index} className="contents w-full">
                    <div className={`border-b px-2 py-1 flex justify-center ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                        {formatDate(value.date)}
                    </div>
                    <div className={`border-b px-2 py-1 flex justify-center ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                        {value.label}
                    </div>
                    <div className={`border-b px-2 py-1 flex justify-center ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                        {value.amount}
                    </div>
                    <div className={`border-b px-2 py-1 flex justify-start ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                        {value.memo}
                    </div>
                </div>
            ))
        }
    </div>

  );
};

export default Item;
