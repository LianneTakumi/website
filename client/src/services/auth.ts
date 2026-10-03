import api from "./api";

export interface RegisterData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export async function registerUser(data: RegisterData) {
  const response = await api.post("/auth/register", data);
  return response.data;
}

export async function loginUser(data: LoginData) {
  const response = await api.post("/auth/login", data);
  return response.data;
}

export async function forgotPassword(email: string) {
  const response = await api.post("/auth/forgot-password", {
    email,
  });
  return response.data;
}

export async function resetPassword(
  token: string,
  password: string,
  confirmPassword: string
) {
  const response = await api.post("/auth/reset-password", {
    token,
    password,
    confirmPassword,
  });

  return response.data;
}