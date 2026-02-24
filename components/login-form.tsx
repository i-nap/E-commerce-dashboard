"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LockIcon, UserIcon, Loader2, AlertCircleIcon } from "lucide-react";
import Button from "@/components/button";
import { loginUser } from "@/services/api/auth";

export default function LoginForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {

            const data = await loginUser(formData);

            localStorage.setItem("token", data.token);

            router.push("/products");
            router.refresh();

        } catch (err: unknown) {
            if (err && typeof err === "object" && "message" in err) {
                setError((err as { message?: string }).message || "Failed to login. Please try again.");
            } else {
                setError("Failed to login. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        required
                        placeholder="Username"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary transition-colors"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />
                </div>

                <div className="relative">
                    <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="password"
                        required
                        placeholder="Password"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary transition-colors"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                </div>
            </div>

            {error && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-xl text-sm border border-red-100 animate-in fade-in zoom-in-95">
                    <AlertCircleIcon className="w-4 h-4 shrink-0" />
                    {error}
                </div>
            )}

            <Button
                type="submit"
                className="w-full py-6 text-lg"
                disabled={isLoading}
            >
                {isLoading ? (
                    <span className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" /> Signing in...
                    </span>
                ) : (
                    "Sign In"
                )}
            </Button>
        </form>
    );
}