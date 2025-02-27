"use client";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import CheckOTPModal from "@/components/authen/CheckOTPModal";
import TermsModal from "@/components/authen/TermModal";
import { Button } from "@/components/common/button";
import Input from "@/components/common/Input";
import InputSecret from "@/components/common/InputSecret";
import { validatePassword } from "@/lib/helpers";
import { useLanguage } from "@/providers/LanguageProvider";
import { AuthRepository } from "@/repositories/AuthRepository";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import EmailValidator from "email-validator";
import { toastHelper } from "@/ultilities/toastMessageHelper";

const SignUpPage = () => {
  const { t } = useLanguage();
  const router = useRouter();

  // Các state chính
  const [email, setEmail] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isShowCheckOTPModal, setIsShowCheckOTPModal] = useState<boolean>(true);
  const [agree, setAgree] = useState<boolean>(false);
  const [showTermsModal, setShowTermsModal] = useState<boolean>(false);
  const [checks, setChecks] = useState<{ [key: string]: boolean }>({
    length: false,
    uppercase: false,
    number: false,
    specialChar: false,
    match: false,
  });
  const [token, setToken] = useState<string>("");

  // Cập nhật trạng thái kiểm tra mật khẩu khi nhập newPassword và confirmPassword
  useEffect(() => {
    setChecks(validatePassword(newPassword, confirmPassword));
  }, [newPassword, confirmPassword]);

  // Validate email khi input mất focus
  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.trim().length === 0) {
      setIsEmailValid(true);
      return;
    }
    const valid = EmailValidator.validate(value);
    setIsEmailValid(valid);
    if (!valid) {
      toastHelper.error(t("errors:validate-email-failed"));
    }
  };

  // Xử lý đăng ký
  const handleSignUp = async () => {
    if (!email || !isEmailValid) {
      toastHelper.error(t("errors:validate-email-failed"));
      return;
    }
    try {
      setLoading(true);
      const res = await AuthRepository.createOTP(email, newPassword);
      if (!res.error) {
        setToken(res.data);
        setIsShowCheckOTPModal(true);
      } else {
        toastHelper.error(t("authen:signup-failed"));
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  // Form hợp lệ khi email không rỗng, hợp lệ, mật khẩu đạt các tiêu chí và checkbox "I agree" được tick
  const isFormValid =
    email &&
    isEmailValid &&
    Object.values(checks).every(Boolean) &&
    agree;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-gray-50 shadow-2xl rounded-lg px-10 py-12 w-full max-w-md mx-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {t("authen:signup")}
        </h2>

        {/* Form đăng ký */}
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              {t("authen:email")}
            </label>
            <Input
              className="h-12 w-full rounded-lg pr-4 border border-gray-300 focus:border-primary-500"
              type="email"
              name="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              onBlur={handleEmailBlur}
              placeholder={t("authen:email-input")}
            />
            {!isEmailValid && (
              <p className="text-red-500 text-sm mt-1">
                {t("errors:validate-email-failed")}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              {t("authen:new-pass")}
            </label>
            <InputSecret
              className="h-12 w-full rounded-lg pr-4 border border-gray-300 focus:border-primary-500"
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
              placeholder={t("authen:password-input")}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              {t("authen:confirm-pass")}
            </label>
            <InputSecret
              className="h-12 w-full rounded-lg pr-4 border border-gray-300 focus:border-primary-500"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
              placeholder={t("authen:password-input")}
            />
          </div>
        </div>

        {/* Danh sách kiểm tra mật khẩu */}
        <ul className="mt-4 mb-4 space-y-1">
          {[
            { key: "length", message: t("authen:password-validation:length") },
            { key: "uppercase", message: t("authen:password-validation:uppercase") },
            { key: "number", message: t("authen:password-validation:number") },
            { key: "specialChar", message: t("authen:password-validation:specialChar") },
            { key: "match", message: t("authen:password-validation:match") },
          ].map((item) => (
            <li
              key={item.key}
              className="flex items-center text-sm"
              style={{ color: checks[item.key] ? "green" : "red" }}
            >
              {checks[item.key] ? (
                <CheckCircleIcon className="w-5 h-5 mr-2 text-green-500" />
              ) : (
                <XCircleIcon className="w-5 h-5 mr-2 text-red-500" />
              )}
              {item.message}
            </li>
          ))}
        </ul>

        {/* Checkbox "I agree" với link gọi modal */}
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="agree"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="agree" className="text-gray-700 text-sm cursor-pointer">
              {t("authen:agree-to")}{" "}
              <a
                href="#"
                className="text-blue-600 hover:underline font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  setShowTermsModal(true);
                }}
              >
                {t("authen:term")}
              </a>
            </label>
          </div>

          {showTermsModal && (
            <TermsModal
              modalProps={{
                isOpen: showTermsModal,
                closeModal: () => setShowTermsModal(false),
                title: t("authen:terms-title"),
              }}
            />
          )}

          <Button
            className="w-full font-semibold text-white py-3"
            label={t("authen:continue")}
            disabled={!isFormValid}
            isLoading={loading}
            onClickButton={handleSignUp}
          />
          <div className="text-center">
            <p className="text-gray-600 cursor-pointer" onClick={() => router.push("/login")}>
              {t("authen:already-have-account")}{" "}
              <a className="text-blue-600 hover:underline font-medium">
                {t("authen:login")}
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* OTP Modal */}
      <CheckOTPModal
        email={email}
        token={token}
        setToken={setToken}
        modalProps={{
          isOpen: isShowCheckOTPModal,
          closeModal: () => setIsShowCheckOTPModal(false),
          title: t("authen:otp-title"),
        }}
      />
      {/* Terms Modal */}
      <TermsModal
        modalProps={{
          isOpen: showTermsModal,
          closeModal: () => setShowTermsModal(false),
          title: t("authen:terms-title"),
        }}
      />

    </div>
  );
};

export default SignUpPage;
