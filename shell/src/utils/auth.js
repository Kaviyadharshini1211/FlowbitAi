// shell/src/utils/auth.js
export function isLoggedIn() {
  const token = localStorage.getItem("token");
  return !!token;
}
export const getToken = () => localStorage.getItem('token'); // ✅ Add this
