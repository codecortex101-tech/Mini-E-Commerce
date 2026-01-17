import api from "../services/api";

export type UserRole = "admin" | "user";

export type User = {
  _id?: string;
  email: string;
  name?: string;
  role: UserRole;
};

/* =====================
   LOCAL STORAGE HELPERS
===================== */

export const getCurrentUser = (): User | null => {
  try {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  } catch {
    return null;
  }
};

export const getToken = (): string | null =>
  localStorage.getItem("token");

export const getUserRole = (): UserRole | null =>
  getCurrentUser()?.role || null;

export const isAdmin = (): boolean =>
  getUserRole() === "admin";

export const isAuthenticated = (): boolean =>
  Boolean(getToken());

/* =====================
        LOGIN
===================== */

export const login = async (
  email: string,
  password: string
): Promise<{ success: boolean; user?: User; error?: string }> => {
  try {
    const res = await api.post("/auth/login", { email, password });

    const { token, user } = res.data;

    if (!token || !user) {
      return { success: false, error: "Invalid server response" };
    }

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("isAuth", "true");

    return { success: true, user };
  } catch (error: any) {
    return {
      success: fal
