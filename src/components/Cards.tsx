
import CardItem from './CardItem';

const Cards = () => {
  return (
    <div className="flex flex-col h-[29svh] md:h-[27svh] overflow-y-scroll overflow-hidden">
      <CardItem date="4/18" label="買い物" amount="￥2,500" image="true" />
      <CardItem date="4/18" label="給料" amount="￥2,500" image="false" />
      <CardItem date="4/18" label="買い物" amount="￥2,500" image="true" />
      <CardItem date="4/18" label="買い物" amount="￥2,500" image="true" />
    </div>
  );
};

export default Cards;
