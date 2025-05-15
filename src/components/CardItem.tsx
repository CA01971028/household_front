// components/CardItem.tsx
import Image from 'next/image';

interface CardItemProps {
  date: string;
  label: string;
  amount: string;
  image: string;
}

const CardItem = ({ date, label, amount, image }: CardItemProps) => (
  <div className="flex items-center gap-4 mb-4">
    <Image
      src={image}
      alt={`${label}アイコン`}
      className="w-[10vw] h-[10svh] bg-blue-50 rounded-lg border border-black"
    />
    <div className="flex flex-col">
      <div>{date}</div>
      <div>{label}</div>
    </div>
    <div className="text-3xl ml-auto">{amount}</div>
  </div>
);

export default CardItem;
