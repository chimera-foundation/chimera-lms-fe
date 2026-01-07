"use client";

import { useEffect } from "react";

export default function TokenMonitor() {
  useEffect(() => {
    const checkTokenExpiry = () => {
      const expiryCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("access_token_expiry="))
        ?.split("=")[1];

      if (expiryCookie) {
        const expiryTime = parseInt(expiryCookie);
        const now = Date.now();
        const remainingMs = expiryTime - now;
        const remainingSeconds = Math.floor(remainingMs / 1000);
        const remainingMinutes = Math.floor(remainingSeconds / 60);
        const seconds = remainingSeconds % 60;

        console.log("===========================");
        console.log("Token Expiry Monitor");
        console.log("Remaining time:", `${remainingMinutes}m ${seconds}s`);
        console.log("Remaining seconds:", remainingSeconds);
        console.log("===========================");

        if (remainingSeconds <= 0) {
          console.warn("⚠️ Token has expired!");
        } else if (remainingSeconds <= 60) {
          console.warn("⚠️ Token expiring soon!");
        }
      } else {
        console.log("No token expiry cookie found");
      }
    };

    checkTokenExpiry();

    const interval = setInterval(checkTokenExpiry, 5000);

    return () => clearInterval(interval);
  }, []);

  return null;
}
