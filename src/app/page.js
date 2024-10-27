"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';

export default function Login() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      alert("Correct!!");
      router.push("/admin/");
    }
  }, [isAuthenticated, router]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      console.log("Hi ")
      console.log("email: ", formData);
      console.log("password: ", formData.password);

      const response = await fetch("http://192.168.0.117:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // const data = await response.json();
      const { accessToken, refreshToken } = await response.json();

      Cookies.set('accessToken', accessToken, { expires: 7 });
      Cookies.set('refreshToken', refreshToken, { expires: 30 });

      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        setErrorMessage(data || "Invalid email or password.");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        {errorMessage && (
          <div className="text-red-500 mb-4">{errorMessage}</div>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md p-2 mb-4 w-full"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
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