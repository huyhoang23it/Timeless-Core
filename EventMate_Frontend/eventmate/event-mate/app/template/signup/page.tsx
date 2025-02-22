"use client";

import { useState } from "react";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState<{ email?: string; password?: string; confirmPassword?: string; agree?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let newError: { email?: string; password?: string; confirmPassword?: string; agree?: string } = {};

    if (!email) {
      newError.email = "⚠ Email is required";
    }
    if (password.length < 6) {
      newError.password = "⚠ Password must be at least 6 characters";
    }
    if (password !== confirmPassword) {
      newError.confirmPassword = "⚠ Passwords do not match";
    }
    if (!agree) {
      newError.agree = "⚠ You must read and agree to the terms";
    }

    setError(newError);

    if (Object.keys(newError).length === 0) {
      console.log("Signed Up:", { username, email, password });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat">
      <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-xl px-8 py-10 w-full max-w-md mx-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-md border px-4 py-2 outline-none text-lg font-semibold bg-white/90 transition-all duration-300 text-gray-900" />
            {error.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>}
          </div>

          <div className="relative mt-4">
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <input type="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-md border px-4 py-2 outline-none text-lg font-semibold bg-white/90 transition-all duration-300 text-gray-900" />
            {error.password && <p className="text-red-500 text-sm mt-1">{error.password}</p>}
          </div>

          <div className="relative mt-4">
            <label className="block mb-1 font-medium text-gray-700">Confirm Password</label>
            <input type="password" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full rounded-md border px-4 py-2 outline-none text-lg font-semibold bg-white/90 transition-all duration-300 text-gray-900" />
            {error.confirmPassword && <p className="text-red-500 text-sm mt-1">{error.confirmPassword}</p>}
          </div>

          <div className="relative mt-4">
            <input type="checkbox" id="agree" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mr-2" />
            <label htmlFor="agree" className="text-gray-700 text-sm cursor-pointer">
              I agree to
              <a href="#" className="text-blue-600 font-medium ml-1 hover:text-blue-700">
                Event Mate's terms
              </a>
            </label>
            {error.agree && <p className="text-red-500 text-sm mt-1">{error.agree}</p>}
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold transition-all duration-300 hover:bg-blue-700">
            Sign Up
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-gray-600">
            Already have an account?
            <a href="#" className="text-blue-600 font-medium ml-1 hover:text-blue-700">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
