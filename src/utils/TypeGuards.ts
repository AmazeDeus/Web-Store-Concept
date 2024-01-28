import { FieldError } from "@/app/types/Product";

export function isErrorType(obj: any): obj is FieldError {
  return (
    obj &&
    typeof obj === "object" &&
    !Array.isArray(obj) &&
    Object.values(obj).every((value) => Array.isArray(value))
  );
}
