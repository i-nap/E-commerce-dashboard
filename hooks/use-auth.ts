"use client"
import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
    window.addEventListener("storage", callback);
    return () => window.removeEventListener("storage", callback);
}

const getSnapshot = () => localStorage.getItem("token");

const getServerSnapshot = () => null;

export function useAuth() {
    const token = useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot
    );

    const isLoggedIn = !!token;

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("cart");
        window.dispatchEvent(new Event("storage"));
        window.location.reload();
    };

    const login = (newToken: string) => {
        localStorage.setItem("token", newToken);
        window.dispatchEvent(new Event("storage"));
    };

    return { token, isLoggedIn, logout, login };
}