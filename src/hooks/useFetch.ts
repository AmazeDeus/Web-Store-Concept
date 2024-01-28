import { ErrorType, FieldError } from "@/app/types/Product";
import { isErrorType } from "@/utils/TypeGuards";

type Options = {
  method: string;
  headers: Record<string, string>;
  body?: string;
};

export function useFetch() {
  return async (
    url: string,
    options: Options,
    setError: (error: ErrorType | null) => void
  ) => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const data = await response.json();
        throw data.error;
      } else {
        setError(null);
        return await response.json();
      }
    } catch (error: any) {
      if (isErrorType(error)) {
        setError(error);
      } else {
        setError(`Unexpected error: ${error.message}`);
      }
      throw error;
    }
  };
}
