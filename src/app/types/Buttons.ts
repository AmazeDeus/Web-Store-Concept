export interface DeleteButtonProps {
  label: string;
  onDelete: () => void;
}

export interface AddToCartButtonProps {
  hasSizesOrExtras: boolean;
  onClick: () => void;
  basePrice: number;
  image: string;
}
