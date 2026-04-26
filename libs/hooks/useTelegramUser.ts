// hooks/useTelegramUser.ts
"use client";
import { useEffect, useState } from "react";

interface TelegramUser {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready: () => void;
        initDataUnsafe?: {
          user?: TelegramUser;
        };
      };
    };
  }
}

export function useTelegramUser(): TelegramUser | null {
  const [user, setUser] = useState<TelegramUser | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    console.log("Telegram WebApp:", window.Telegram?.WebApp);
    
    const tg = window.Telegram?.WebApp;
    if (!tg) {
      console.warn("window.Telegram.WebApp is missing. Is the script loaded?");
      return;
    }
    
    tg.ready();
    const unsafe = tg.initDataUnsafe;
    console.log("initDataUnsafe:", unsafe);
    console.log("initDataUnsafe.user:", unsafe?.user);
    
    setUser(unsafe?.user ?? null);
  }, []);

  return user;
}