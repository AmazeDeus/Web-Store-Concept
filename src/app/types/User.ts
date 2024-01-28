import { FormEvent } from "react";

export interface StreetAddress {
  streetName?: string;
  houseNumber?: string;
  stairwell?: string;
  apartment?: string;
}

export interface User {
  _id?: string;
  name?: string;
  image?: string;
  phone?: string;
  streetAddress?: StreetAddress;
  postalCode?: string;
  city?: string;
  admin: boolean;
  email: string;
}

export interface ProfileData {
  phone?: string;
  streetAddress?: StreetAddress;
  city?: string;
  postalCode?: string;
  admin: boolean;
}

export interface AddressProps {
  phone?: string;
  streetAddress?: StreetAddress;
  city?: string;
  postalCode?: string;
}

export interface AddressInputsProps {
  addressProps: AddressProps;
  setAddressProp: (field: keyof AddressProps, value: string, name?: string | StreetAddress) => void;
  disabled?: boolean;
}

export interface UserFormProps {
  user: User | null;
  onSave: (ev: FormEvent, data: User) => void;
  ownProfile?: boolean;
}
