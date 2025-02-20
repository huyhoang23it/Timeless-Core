"use client";

import { useState } from "react";
import { motion } from "framer-motion"; // Import thư viện animation
import { FaFacebookF } from "react-icons/fa";
import { SiGmail } from "react-icons/si"; // Gmail không có icon chính thức trong Heroicons, nên dùng react-icons

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== "123456") {
      setError(true);
      setTimeout(() => setError(false), 500); // Xóa hiệu ứng rung sau 0.5s
    } else {
      console.log("Email:", email, "Password:", password);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/bg-01.jpg')" }}>

      {/* Container chính với hiệu ứng scale */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white/80 backdrop-blur-lg shadow-xl rounded-xl px-8 py-10 w-full max-w-md mx-4"
      >
        {/* Tiêu đề */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Account Login</h2>

        {/* Form đăng nhập */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-5"
          animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.2 }}
        >
          {/* Input Email */}
          <motion.div className="relative" whileFocus={{ scale: 1.05 }}>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <motion.input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-400 px-4 py-2 outline-none 
      text-lg font-semibold text-gray-900 bg-white/90 
      transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 
      focus:shadow-lg placeholder:text-gray-500 placeholder:text-sm focus:placeholder-opacity-50"
            />
          </motion.div>

          {/* Input Password */}
          <motion.div className="relative mt-4" whileFocus={{ scale: 1.05 }}>
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <motion.input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full rounded-md border border-gray-400 px-4 py-2 outline-none 
      text-lg font-semibold text-gray-900 bg-white/90 
      transition-all duration-300 focus:ring-2 
      ${error ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:border-blue-500 focus:ring-blue-400"} 
      focus:shadow-lg placeholder:text-gray-500 placeholder:text-sm focus:placeholder-opacity-50`}
            />

            {/* Hiển thị lỗi nếu sai mật khẩu */}
            {error && (
              <motion.p
                className="text-red-500 text-sm mt-1"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                ⚠ Incorrect Password
              </motion.p>
            )}
          </motion.div>


          {/* Ghi nhớ + Quên mật khẩu */}
          <div className="flex items-center justify-between text-sm">
            <label
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setChecked(!checked)}
            >
              <motion.div
                className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors ${checked ? "bg-blue-500" : "bg-gray-300"
                  }`}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  className={`w-4 h-4 rounded-full shadow-md transform transition-transform ${checked ? "translate-x-5 bg-white" : "translate-x-0 bg-blue-500"
                    }`}
                />
              </motion.div>
              <span className={checked ? "text-blue-600 font-medium" : "text-gray-600"}>
                Remember Me
              </span>
            </label>
            <a
              href="#"
              className="relative text-blue-600 font-medium transition-all duration-300
             before:absolute before:-bottom-1 before:left-1/2 before:w-0 before:h-[2px] 
             before:bg-blue-600 before:transition-all before:duration-300 
             hover:text-blue-700 hover:before:w-full hover:before:left-0 
             hover:scale-105"
            >
              Forgot Password?
            </a>

          </div>

          {/* Nút Login */}
          <motion.button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold transition-all duration-300
                      hover:bg-blue-700 hover:shadow-lg hover:scale-105"
            whileHover={{ scale: 1.05, boxShadow: "0px 4px 10px rgba(0, 0, 255, 0.3)" }}
          >
            Login
          </motion.button>
        </motion.form>

        {/* Đăng ký */}
        <div className="text-center mt-4">
          <p className="text-gray-600">Don&apos;t have an account?{" "}
            <a
              href="#"
              className="relative text-blue-600 font-medium transition-all duration-300
             before:absolute before:-bottom-1 before:left-1/2 before:w-0 before:h-[2px] 
             before:bg-blue-600 before:transition-all before:duration-300 
             hover:text-blue-700 hover:before:w-full hover:before:left-0 
             hover:scale-105"
            >
              Sign Up
            </a>

          </p>
        </div>

        {/* Hoặc đăng nhập với mạng xã hội */}
        <div className="relative flex py-4 items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-2 text-gray-500">Or Sign In With</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Nút mạng xã hội */}
        <div className="flex justify-center space-x-4">
          {/* Nút Facebook */}
          <motion.a
            href="#"
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: "0px 4px 10px rgba(0, 0, 255, 0.3)" }}
          >
            <FaFacebookF className="w-5 h-5" />
            <span>Facebook</span>
          </motion.a>

          {/* Nút Gmail */}
          <motion.a
            href="#"
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: "0px 4px 10px rgba(255, 0, 0, 0.3)" }}
          >
            <SiGmail className="w-5 h-5" />
            <span>Gmail</span>
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
}
