import LoginForm from "@/components/login-form";

export const metadata = {
    title: "Login | Nest Store",
    description: "Login to your account to start shopping.",
};

export default function LoginPage() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="text-center">
                    <h1 className="text-3xl font-black text-gray-900">Welcome Back</h1>
                    <p className="text-gray-500 mt-2">Login to your Nest account</p>
                </div>

                <LoginForm />

            </div>
        </div>
    );
}