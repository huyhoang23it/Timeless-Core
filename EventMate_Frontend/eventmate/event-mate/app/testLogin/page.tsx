"use client";

import { useState } from "react";
import Image from "next/image";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/bg-01.svg')" }}
    >
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Account Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span>Remember Me</span>
            </label>
            <a href="#" className="text-blue-600 hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <p>
            Don't have an account?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Sign Up
            </a>
          </p>
        </div>

        <div className="text-center my-4">— Or Sign In With —</div>

        <div className="flex justify-center space-x-4">
          <a
            href="#"
            className="flex items-center space-x-2 px-4 py-2 border rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            <i className="fab fa-facebook-f"></i>
            <span>Facebook</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-2 px-4 py-2 border rounded bg-red-600 text-white hover:bg-red-700"
          >
            <i className="fab fa-google"></i>
            <span>Gmail</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
