import { fetchWrapper } from "@/lib/fetchWrapper";
import { LoginCredentials, LoginResponse } from "@/types/auth";

export const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  return fetchWrapper<LoginResponse>("/auth/login", {
    method: "POST",
    cache: "no-store",
    body: JSON.stringify(credentials),
  });
};