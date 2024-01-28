import { FC } from "react";
import { AddToCartButtonProps } from "@/app/types/Buttons";

const AddToCartButton: FC<AddToCartButtonProps> = ({
  hasSizesOrExtras,
  onClick,
  basePrice,
  image,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`mt-4 ${
        hasSizesOrExtras
          ? "bg-primary text-white rounded-full px-8 py-2"
          : ""
      }`}
    >
      <span>Add to cart (from ${basePrice})</span>
    </button>
  );
};

export default AddToCartButton;
