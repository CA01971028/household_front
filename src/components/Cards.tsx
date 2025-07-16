'use client';
import { useState } from 'react';
import CardItem from './CardItem';
import Image from 'next/image';
import notfound from "../../public/notfound.png";
import { isArrayEmpty } from '../app/utils/arrayUtils';

type homeResult = {
  date: string;
  label: string;
  amount: number;
  memo: string;
};

type Props = {
  data: homeResult[];
};

const Cards = ({ data }: Props) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false); // アニメーションが進行中かを管理

  // 画像をタッチした際に拡大と縮小を行う関数
  const handleImageClick = () => {
    if (isAnimating) return; // アニメーションが進行中の場合、クリックを無視

    setIsAnimating(true); // アニメーションを開始

    // 拡大 → 縮小
    setIsZoomed(true); // 拡大
    setTimeout(() => {
      setIsZoomed(false); // 縮小
      setIsAnimating(false); // アニメーション終了
    }, 600); // 600ms後に縮小開始（アニメーション時間と合わせる）
  };

  return (
    <div className="flex flex-col h-[29svh] md:h-[27svh] overflow-y-scroll overflow-hidden">
      {isArrayEmpty(data) ? (
        <Image
          src={notfound}
          alt="データがありません"
          className={`self-center transition-all duration-500 ${isZoomed ? 'scale-120' : 'scale-100'}`}
          width={210}
          height={210}
          onClick={handleImageClick} // クリックで拡大縮小
        />
      ) : (
        data.map((item: homeResult, index: number) => (
          <CardItem
            key={index}
            date={item.date}
            label={item.label}
            amount={"￥" + item.amount}
            image={item.amount > 0 ? "false" : "true"}
          />
        ))
      )}
    </div>
  );
};

export default Cards;


