// frontend/src/utils/auth.ts

export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem("user");
};

export const isAdmin = (): boolean => {
  const user = getCurrentUser();
  return user?.role === "admin";
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};
