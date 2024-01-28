import { ChangeEvent, FC, useMemo } from "react";
import {
  AddressProps,
  AddressInputsProps,
  StreetAddress,
} from "@/app/types/User";
import NestedInputs from "../UI/NestedInput";
import useInputs from "@/hooks/useInputs";

const AddressInput: FC<AddressInputsProps> = ({
  addressProps,
  setAddressProp,
  disabled = false,
}) => {
  const { phone, streetAddress, postalCode, city } = addressProps;

  const handleChange =
    (field: keyof AddressProps) =>
    (event: ChangeEvent<HTMLInputElement>, index = 1) => {
      console.log(index, field, streetAddress);
      if (field === "streetAddress" && index !== undefined && streetAddress) {
        let newStreetAddress: StreetAddress = { ...streetAddress };
        newStreetAddress[event.target.name as keyof StreetAddress] = event.target.value;
        console.log(newStreetAddress);
        setAddressProp(field, event.target.value, event.target.name);
      } else {
        setAddressProp(field, event.target.value);
      }
    };

  let inputProps;
  let validationProps = useMemo(
    () => ({
      // required: "<=2", // Will make first two inputs required
      disabled: disabled,
    }),
    [disabled]
  );

  const defaultStreetAddress: StreetAddress = {
    streetName: "",
    houseNumber: "",
    stairwell: "",
    apartment: "",
  };

  const currentStreetAddress = streetAddress || defaultStreetAddress;

  const placeholders: (keyof StreetAddress)[] = [
    "streetName",
    "houseNumber",
    "stairwell",
    "apartment",
  ];

  inputProps = useMemo(
    () => ({
      amount: 4,
      type: "text",
      value: placeholders.map((key) => currentStreetAddress[key] || ""),
      onChange: handleChange("streetAddress"),
      placeholder: placeholders,
      name: placeholders,
    }),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [streetAddress]
  );

  const inputs = useInputs(inputProps, validationProps);

  return (
    <>
      <label>Phone</label>
      <input
        disabled={disabled}
        type="tel"
        placeholder="Phone number"
        value={phone || ""}
        onChange={handleChange("phone")}
      />
      <label>Street address</label>
      <NestedInputs inputs={inputs} />
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label>Postal code</label>
          <input
            disabled={disabled}
            type="text"
            placeholder="Postal code"
            value={postalCode || ""}
            onChange={handleChange("postalCode")}
          />
        </div>
        <div>
          <label>City</label>
          <input
            disabled={disabled}
            type="text"
            placeholder="City"
            value={city || ""}
            onChange={handleChange("city")}
          />
        </div>
      </div>
    </>
  );
};

export default AddressInput;
