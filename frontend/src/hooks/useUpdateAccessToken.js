import { useEffect } from "react";
import { useUserStore } from "../stores/useUserStore.js";

export function useSilentRefresh() {
  const refreshToken = useUserStore((state) => state.refreshToken);

  useEffect(() => {
    // Run immediately on app load
    refreshToken().catch(() => {});

    // Refresh every 14 minutes
    const intervalId = setInterval(async () => {
      try {
        await refreshToken();
        console.log("Access token refreshed silently");
      } catch (err) {
        console.log("Refresh failed, logging out");
      }
    }, 14 * 60 * 1000);

    return () => clearInterval(intervalId); // clean up on unmount
  }, [refreshToken]);
}


export function useRefreshOnFocus() {
  const refreshToken = useUserStore((state) => state.refreshToken);

  useEffect(() => {
    const handleFocus = () => {
      refreshToken().catch(() => {});
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [refreshToken]);
}