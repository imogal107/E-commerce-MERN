// components/AuthProvider.jsx
import { useEffect } from "react";
import { useUserStore } from "../stores/useUserStore.js";
import { useCartStore } from "../stores/useCartStore.js";
import { useRefreshOnFocus, useSilentRefresh } from "../hooks/useUpdateAccessToken.js";
import LoadingSpinner from "./LoadingSpinner.jsx";

const AuthProvider = ({ children }) => {
  const { user, checkAuth, checkingAuth } = useUserStore();
  const { getCartItems } = useCartStore();

  useSilentRefresh();
  useRefreshOnFocus();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (user) getCartItems();
  }, [getCartItems, user]);

  if (checkingAuth) return <LoadingSpinner />;

  return children;
};

export default AuthProvider;
