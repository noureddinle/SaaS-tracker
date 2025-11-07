import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { z, ZodSchema } from "zod";
import { api } from "@/lib/apiClient";

/**
 * Fetch and validate data using a Zod schema
 */
export function useQueryValidated<T>(
  key: string[],
  url: string,
  schema: ZodSchema<T>,
  options?: UseQueryOptions<T>
) {
  return useQuery<T>({
    queryKey: key,
    queryFn: async () => {
      const res = await api.get(url);
      const validated = schema.parse(res.data);
      return validated;
    },
    ...options,
  });
}
