import { ChangeEvent } from "react";

export interface IconStyles {
  className?: string;
}

export interface SectionHeadersProps {
  subHeader?: string;
  mainHeader: string;
}

export interface HeaderProps {
  isAdmin: boolean | undefined;
}

export type InputProps = {
  amount?: number;
  name?: string[];
  type?: string;
  value?: string[];
  placeholder?: string[];
  onChange?: (event: ChangeEvent<HTMLInputElement>, index: number) => void;
  required?: any;
  disabled?: boolean;
  [key: string]: any;
};

export interface NestedInputsProps {
  inputs: InputProps[];
}