import { FC } from "react";
import AddToCartButton from "@/components/Menu/AddToCartButton";
import { MenuItemTileProps } from "@/app/types/Product";
import Image from "next/image";

const MenuItemTile: FC<MenuItemTileProps> = ({
  onAddToCart,
  image,
  description,
  name,
  basePrice,
  sizes,
  extraIngredientPrices,
}) => {
  const hasSizesOrExtras =
    sizes?.length > 0 || extraIngredientPrices?.length > 0;
  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center group hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
      <div className="text-center">
        <Image
          src={image || "/logo.png"}
          className="max-h-auto max-h-24 block mx-auto"
          alt={name}
          width={100}
          height={100}
        />
      </div>
      <h4 className="font-semibold text-xl my-3">{name}</h4>
      <p className="text-gray-500 text-sm line-clamp-3">{description}</p>
      <AddToCartButton
        image={image || "/logo.png"}
        hasSizesOrExtras={hasSizesOrExtras}
        onClick={onAddToCart}
        basePrice={basePrice}
      />
    </div>
  );
};

export default MenuItemTile;
