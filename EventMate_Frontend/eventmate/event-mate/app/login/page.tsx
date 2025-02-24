"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import { toastHelper } from "@/ultilities/toastMessageHelper";
import { Button } from "@/components/common/button";
import ForgotpasswordModal from "@/components/authen/ForgotpasswordModal";
import Input from "@/components/common/Input";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import InputSecret from "@/components/common/InputSecret";
import { BUTTON_COMMON_TYPE } from "@/constants/constant";
import * as EmailValidator from 'email-validator';

const Login = () => {
  const { t } = useLanguage();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string, isNotify: boolean = true) => {
    if (!EmailValidator.validate(email)) {
      if (isNotify && email.length !== 0) {
        toastHelper.error(t('errors:validate-email-failed'));
      }
      return false;
    }
    return true;
  };

  const validateSubmit = () => {
    let checkSubmit = false;
    if (validateEmail(email)) {
      checkSubmit = true;
    }
    if (password.length > 0) {
      checkSubmit = true;
    } else {
      toastHelper.error(t('errors:validate-password-required'));
    }
    return checkSubmit;
  };

  const handleLoginGoogle = async () => {
    const result = await signIn("google", { callbackUrl: "/" });
    if (result?.error) {
      toastHelper.error(t(`authen:login-fail-${result.status}`));
    } else {
      toastHelper.success(t('authen:login-success'));
    }
  };

  const handleLogin = async () => {
    try {
      if (!validateSubmit()) return;
      setLoading(true);
      const result = await signIn("credentials", { email, password, redirect: false });
      if (result?.error) {
        toastHelper.error(t(`authen:login-fail-${result.status}`));
      } else {
        toastHelper.success(t('authen:login-success'));
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const [isShowForgotPasswordModal, setIsShowForgotPasswordModal] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-lg px-10 py-12 w-full max-w-md mx-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">{t("authen:login")}</h2>

        <div className="space-y-4">
          <div>
            <label className="block mb-2 font-medium text-gray-700">{t("authen:email")}</label>
            <Input
              className="h-12 w-full rounded-lg pr-4 border border-gray-300 focus:border-primary-500"
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('authen:email-input')}
            />
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-700">{t("authen:password")}</label>
            <InputSecret
              className="h-12 w-full rounded-lg pr-4 border border-gray-300 focus:border-primary-500"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('authen:password-input')}
            />
          </div>
        </div>

        <div className="flex justify-end mt-2">
          <button
            className="text-sm text-blue-600 hover:underline"
            onClick={() => setIsShowForgotPasswordModal(true)}
          >
            {t('authen:forgot-password')}
          </button>
        </div>

        <Button
          className="mt-6 w-full font-semibold text-white"
          label={t('authen:login')}
          isLoading={loading}
          onClickButton={handleLogin}
        />

        <div className="text-center mt-6">
          <p className="text-gray-600">{t("authen:no-account")}</p>
          <p className="text-gray-600 mt-1">
            <a href="#" className="text-blue-600 hover:underline font-medium">
            {t("authen:signup")}
            </a>{" "}
            {t("authen:or")}{" "}
            <a href="#" className="text-blue-600 hover:underline font-medium">
            {t("authen:signup-event-organizer")}
            </a>
          </p>
        </div>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-3 text-gray-500">{t("authen:or-sign")}</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <Button
          className="w-full font-semibold text-white"
          label={t('authen:login-google')}
          variant={BUTTON_COMMON_TYPE.GOOGLE}
          isLoading={loading}
          onClickButton={handleLoginGoogle}
        />

        {isShowForgotPasswordModal && (
          <ForgotpasswordModal
            modalProps={{
              isOpen: isShowForgotPasswordModal,
              closeModal: () => setIsShowForgotPasswordModal(false),
              title: 'Forgot Password',
              children: <div>Forgot Password</div>,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Login;
