"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userAuthenticated = false;
    if (userAuthenticated) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 rounded-md p-2 mb-4 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 rounded-md p-2 mb-4 w-full"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white rounded-md p-2 w-full"
        >
          Login
        </button>
      </div>
    </div>
  );
}