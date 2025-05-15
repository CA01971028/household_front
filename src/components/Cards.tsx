// components/Cards.tsx
import flyManey from '../../public/flyManey.png';
import getmaney from '../../public/getmaney.png';
import CardItem from './CardItem';

const Cards = () => {
  return (
    <div className="flex flex-col">
      <CardItem date="4/18" label="買い物" amount="￥2,500" image={flyManey} />
      <CardItem date="4/18" label="給料" amount="￥2,500" image={getmaney} />
    </div>
  );
};

export default Cards;
