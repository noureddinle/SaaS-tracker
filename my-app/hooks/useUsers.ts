// hooks/useUsers.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/apiClient";
import {
  UserSchema,
  RegisterSchema,
  LoginSchema,
  AuthResponseSchema,
  type User,
  type RegisterData,
  type LoginData,
  type AuthResponse,
} from "@/lib/schemas";
import { saveTokens, clearTokens } from "@/lib/auth";
import { z } from "zod";

export function useCurrentUser() {
  return useQuery<User>({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await api.get("/auth/me/");
      return UserSchema.parse(res.data);
    },
    retry: false,
  });
}

export function useRegister() {
  return useMutation<AuthResponse, Error, RegisterData>({
    mutationFn: async (data) => {
      RegisterSchema.parse(data);
      const res = await api.post("/auth/register/", data);
      const result = AuthResponseSchema.parse(res.data);
      saveTokens(result.access, result.refresh);
      return result;
    },
  });
}

export function useLogin() {
  const qc = useQueryClient();
  return useMutation<AuthResponse, Error, LoginData>({
    mutationFn: async (data) => {
      LoginSchema.parse(data);
      const res = await api.post("/auth/login/", data);
      const result = AuthResponseSchema.parse(res.data);
      saveTokens(result.access, result.refresh);
      return result;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["me"] }),
  });
}

export function useLogout() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      clearTokens();
      qc.removeQueries({ queryKey: ["me"] });
    },
  });
}
