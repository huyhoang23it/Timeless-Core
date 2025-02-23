"use client";

import CheckOTPModal from "@/components/authen/CheckOTPModal";
import { Button } from "@/components/common/button";
import Input from "@/components/common/Input";
import InputSecret from "@/components/common/InputSecret";
import { useLanguage } from "@/providers/LanguageProvider";
import { AuthRepository } from "@/repositories/AuthRepository";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignUpPage = () => {
  const { t } = useLanguage();
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isShowChecoOTPModal, setIsShowForgotPasswordModal] = useState<boolean>(false);
 
  const [token, setToken] = useState<string>('');
  const handleSignUp = async () => {
    try {
      setLoading(true);
      const res = await AuthRepository.createOTP(email, newPassword);
      if (!res.error) {
      setToken(res.data); 
        setIsShowForgotPasswordModal(true);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
    >
      {/* Container chính với hiệu ứng scale */}
      <div

        className=" backdrop-blur-lg shadow-xl rounded-xl px-8 py-10 w-full max-w-md mx-4"
      >
        {/* Tiêu đề */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>

        {/* Form đăng ký */}
        <div className="relative" >
          <label className="block mb-1 font-medium text-gray-700">Email</label>
          <Input
            className=" !h-[44px] md:w-[400px] w-[350px] !rounded-xl pr-8"
            type="text"
            name="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
            }}
            placeholder={t('email-input')}
          />
          <label className="block mb-1 font-medium text-gray-700">New Password</label>
          <InputSecret
            className=" !h-[44px] md:w-[400px] w-[350px] !rounded-xl pr-8"
            type="text"
            name="password"
            value={newPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setNewPassword(e.target.value);
            }}
            placeholder={t('password-input')}
          />
          <label className="block mb-1 font-medium text-gray-700">Confirm Password</label>
          <InputSecret
            className=" !h-[44px] md:w-[400px] w-[350px] !rounded-xl pr-8"
            type="text"
            name="password"
            value={confirmPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setConfirmPassword(e.target.value);
            }}
            placeholder={t('password-input')}
          />

        </div>


        <Button
          className="w-full font-semibold text-white items-center justify-center"
          label={t('authen:continue')}
          isLoading={loading}
          onClickButton={handleSignUp}
        ></Button>

        {/* Điều hướng đến Login */}
        <div className="text-center mt-4">
          <p className="text-gray-600"
            onClick={() => router.push('/login')}>Already have an account?

          </p>
        </div>

      </div>
      <CheckOTPModal
        email={email}
        token={token}
        setToken={setToken}
        modalProps={{
          isOpen: isShowChecoOTPModal,
          closeModal: () => setIsShowForgotPasswordModal(false),
          title: t('authen:otp-title'),
         
        }}
      />
    </div>
  );
}
export default SignUpPage;