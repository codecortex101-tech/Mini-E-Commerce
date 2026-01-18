export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem("user");
    if (!user) return null;
    return JSON.parse(user);
  } catch {
    return null;
  }
};

export const isAdmin = () => {
  const user = getCurrentUser();
  return user?.role === "admin";
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};
