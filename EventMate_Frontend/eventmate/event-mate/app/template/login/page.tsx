"use client";


import { motion } from "framer-motion"; // Import thư viện animation
import { SiGoogle } from "react-icons/si";
import { Button } from "@/components/common/button";
import { useLanguage } from "@/providers/LanguageProvider";
import Input from "@/components/common/Input";

export default function LoginPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
    >

      {/* Container chính với hiệu ứng scale */}
      <div
        className="bg-white/80 backdrop-blur-lg shadow-xl rounded-xl px-8 py-10 w-full max-w-md mx-4"
      >
        {/* Tiêu đề */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>

        {/* Form đăng nhập */}
        {/* Input Email */}
        <div className="relative" >
          <label className="block mb-1 font-medium text-gray-700">Email</label>
          <Input
            className=" !h-[44px] md:w-[400px] w-[350px] !rounded-xl pr-8"
            type="text"
            name="email"
            value={''}
            onChange={() => {
            }}
            placeholder={t('email-input')}
          />
           <label className="block mb-1 font-medium text-gray-700">Password</label>
          <Input
            className=" !h-[44px] md:w-[400px] w-[350px] !rounded-xl pr-8"
            type="text"
            name="password"
            value={''}
            onChange={() => {
            }}
            placeholder={t('password-input')}
          />
          
        </div>
        {/* Ghi nhớ + Quên mật khẩu */}
        <div className="flex items-center justify-between text-sm">
          <a
            href="#"
            className="relative text-blue-600 font-medium transition-all duration-300 
      before:absolute before:-bottom-1 before:right-0 before:w-0 before:h-[2px] 
      before:bg-blue-600 before:transition-all before:duration-300 
      hover:text-blue-700 hover:before:w-full hover:before:right-0 
      hover:scale-105 text-right block ml-auto"
          >
            Forgot Password?
          </a>


        </div>

        <Button
          className="w-full font-semibold transition-all text-white"
          label={t('payment:resume-your-plan')}
          isLoading={false}
        ></Button>
        {/* Đăng ký */}
        <div className="text-center mt-4">
          <p className="text-gray-600">Dont have an account?
          </p>
          <p className="text-gray-600">
            <a
              href="#"
              className="relative text-blue-600 font-medium transition-all duration-300
             before:absolute before:-bottom-1 before:left-1/2 before:w-0 before:h-[2px] 
             before:bg-blue-600 before:transition-all before:duration-300 
             hover:text-blue-700 hover:before:w-full hover:before:left-0 
             hover:scale-105"
            >
              Sign Up {" "}
            </a>
            Or{" "}
            <a
              href="#"
              className="relative text-blue-600 font-medium transition-all duration-300
             before:absolute before:-bottom-1 before:left-1/2 before:w-0 before:h-[2px] 
             before:bg-blue-600 before:transition-all before:duration-300 
             hover:text-blue-700 hover:before:w-full hover:before:left-0 
             hover:scale-105"
            >
              Sign up As Event Organizer
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
          {/* Nút Gmail */}
          <motion.a
            href="#"
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: "0px 4px 10px rgba(255, 0, 0, 0.3)" }}
          >
            <SiGoogle className="w-5 h-5" />
            <span>Google</span>
          </motion.a>
        </div>
      </div>
    </div>
  );
}
