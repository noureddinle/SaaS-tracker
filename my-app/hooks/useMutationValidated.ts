import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { ZodSchema } from "zod";
import { api } from "@/lib/apiClient";

export function useMutationValidated<TInput, TOutput>(
  url: string,
  schema: ZodSchema<TOutput>,
  method: "post" | "put" | "patch" | "delete" = "post",
  options?: UseMutationOptions<TOutput, Error, TInput>
) {
  return useMutation<TOutput, Error, TInput>({
    mutationFn: async (data: TInput) => {
      const response = await api.request({
        url,
        method,
        data,
      });
      return schema.parse(response.data);
    },
    ...options,
  });
}
