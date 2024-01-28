import { NestedInputsProps } from "@/app/types/Elements";
import { FC } from "react";

const NestedInputs: FC<NestedInputsProps> = ({ inputs }) => {
  return (
    <div className="nested_inputs">
      {inputs.map((input: any, index) => (
        <label
          key={index}
          className={`nested_inputs-i ${
            input.required ? "has-required-child" : ""
          }`}
        >
          <input required={false} className="nested_inputs-i" {...input} />
        </label>
      ))}
    </div>
  );
};

export default NestedInputs;
