import { InputProps } from "@/app/types/Elements";
import { useState, useEffect, ChangeEvent } from "react";

type UseInputs = (inputProps: InputProps, validationProps: any) => InputProps[];

const useInputs: UseInputs = (inputProps, validationProps) => {
  const [inputs, setInputs] = useState<InputProps[]>([]);

  useEffect(() => {
    const newInputs = Array.from({ length: inputProps?.amount || 1 }).map(
      (_, index) => {
        let input = {
          ...inputProps,
        };

        Object.keys(inputProps).forEach((key) => {
          if (Array.isArray(inputProps[key])) {
            input[key] = inputProps[key][index];
          }
        });

        if (validationProps?.required) {
          input.required = Array.isArray(validationProps.required)
            ? validationProps.required[index]
            : eval(`${index + 1} ${validationProps.required}`);
        }

        if (validationProps?.disabled !== undefined) {
          input.disabled = validationProps.disabled;
        }

        return input;
      }
    );

    setInputs(newInputs);
  }, [inputProps, validationProps]);

  return inputs;
};

export default useInputs;
