import Image from 'next/image';
import flyManey from '../../public/flyManey.png';
import getmaney from '../../public/getmaney.png';

interface CardItemProps {
  date: string;
  label: string;
  amount: string;
  image: string;
}

const CardItem = ({ date, label, amount, image }: CardItemProps) => (
  <>
      <div className="flex items-center gap-4 mb-1 border border-gray-300 rounded-lg shadow-sm bg-white">
        {image === "true" ? (
          <Image
            src={flyManey}
            alt={`${label}アイコン`}
            className="w-12 h-w-12 md:w-20 md:h-20 ml-6 bg-blue-50 rounded-lg border border-black object-contain"
          />
        ) : (
          <Image
            src={getmaney}
            alt={`${label}アイコン`}
            className="w-12 h-12 md:w-20 md:h-20 ml-6 bg-blue-50 rounded-lg border border-black object-contain"
          />
        )}

        <div className="flex flex-col">
          <div className="text-xl md:text-2xl">{date}</div>
          <div className="text-xl md:text-2xl">{label}</div>
        </div>

        <div className="text-3xl md:text-4xl ml-auto mr-5">{amount}</div>
      </div>
  </>

);

export default CardItem;
