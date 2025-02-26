"use client";
import { useEffect, useRef, useState } from "react";
import EmailValidator from "email-validator";

import { toastHelper } from "@/ultilities/toastMessageHelper";
import { validatePassword } from "@/lib/helpers";
import { useLanguage } from "@/providers/LanguageProvider";
import { AuthRepository } from "@/repositories/AuthRepository";
import CheckOTPModal from "@/components/authen/CheckOTPModal";
import Input from "@/components/common/Input";
import InputSecret from "@/components/common/InputSecret";
import { Button } from "@/components/common/button";
import { BUTTON_COMMON_TYPE } from "@/constants/constant";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import TermsModal from "@/components/authen/TermModal";
interface SignUpOrganizationComponentProps {
    setIsSignUpOrganization: (value: boolean) => void;
}
const SignUpOrganizationComponent = ({setIsSignUpOrganization}: SignUpOrganizationComponentProps) => {
  const { t } = useLanguage();


  // Các trường thông tin
  const [email, setEmail] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [isPhoneValid, setIsPhoneValid] = useState<boolean>(true);
  const [businessLicense, setBusinessLicense] = useState<File | null>(null);
  const [agree, setAgree] = useState<boolean>(false);
  const [showTermsModal, setShowTermsModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isShowCheckOTPModal, setIsShowCheckOTPModal] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");

  // Kiểm tra mật khẩu (độ dài, chữ hoa, số, ký tự đặc biệt, khớp)
  const [checks, setChecks] = useState<{ [key: string]: boolean }>({
    length: false,
    uppercase: false,
    number: false,
    specialChar: false,
    match: false,
  });

  useEffect(() => {
    setChecks(validatePassword(password, confirmPassword));
  }, [password, confirmPassword]);

  // Validate email
  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value.trim()) {
      setIsEmailValid(true);
      return;
    }
    const valid = EmailValidator.validate(value);
    setIsEmailValid(valid);
    if (!valid) toastHelper.error(t("errors:validate-email-failed"));
  };

  // Validate phone number: chỉ chấp nhận số với 10-15 chữ số
  const handlePhoneBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value.trim()) {
      setIsPhoneValid(false);
      toastHelper.error(t("errors:validate-phone-required"));
      return;
    }
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(value)) {
      setIsPhoneValid(false);
      toastHelper.error(t("errors:validate-phone-failed"));
    } else {
      setIsPhoneValid(true);
    }
  };

  // Form hợp lệ khi tất cả các điều kiện đều đáp ứng
  const isFormValid =
    !!email &&
    isEmailValid &&
    Object.values(checks).every(Boolean) &&
    !!companyName &&
    !!phoneNumber &&
    isPhoneValid &&
    !!businessLicense &&
    agree;

  // Xử lý chọn file thông qua Button
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleChooseFile = () => fileInputRef.current?.click();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setBusinessLicense(e.target.files[0]);
    }
  };

  // Xử lý đăng ký: sử dụng chung hàm tạo OTP
  const handleSignUp = async () => {
    if (!isFormValid) {
      toastHelper.error(t("authen:please-complete-all-fields"));
      return;
    }
    try {
      setLoading(true);
      const res = await AuthRepository.createOTP(email, password);
      if (!res.error) {
        setToken(res.data);
        setIsShowCheckOTPModal(true);
      } else {
        toastHelper.error(t("authen:signup-failed"));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-gray-50 shadow-2xl rounded-lg px-10 py-12 w-full max-w-4xl mx-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {t("authen:event-signup")}
        </h2>
        <div className="space-y-6">
          {/* Chia làm 2 cột */}
          <div className="md:flex md:space-x-6">
            {/* Cột bên trái */}
            <div className="flex-1 space-y-4">
              {/* Email */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  {t("authen:email")}
                </label>
                <Input
                  className="h-12 w-full rounded-lg pr-4 border border-gray-300 focus:border-primary-500"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={handleEmailBlur}
                  placeholder={t("authen:email-input")}
                />
                {!isEmailValid && (
                  <p className="text-red-500 text-sm mt-1">
                    {t("errors:validate-email-failed")}
                  </p>
                )}
              </div>
              {/* Password */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  {t("authen:new-pass")}
                </label>
                <InputSecret
                  className="h-12 w-full rounded-lg pr-4 border border-gray-300 focus:border-primary-500"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("authen:password-input")}
                />
              </div>
              {/* Confirm Password */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  {t("authen:confirm-pass")}
                </label>
                <InputSecret
                  className="h-12 w-full rounded-lg pr-4 border border-gray-300 focus:border-primary-500"
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={t("authen:password-input")}
                />
              </div>
            </div>
            {/* Cột bên phải */}
            <div className="flex-1 space-y-4 mt-6 md:mt-0">
              {/* Company Name */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">{t("authen:company-name")}</label>
                <Input
                  className="h-12 w-full rounded-lg pr-4 border border-gray-300 focus:border-primary-500"
                  type="text"
                  name="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder={t("authen:company-input")}
                />
              </div>
              {/* Phone Number */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">{t("authen:phone-number")}</label>
                <Input
                  className="h-12 w-full rounded-lg pr-4 border border-gray-300 focus:border-primary-500"
                  type="text"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  onBlur={handlePhoneBlur}
                  placeholder={t("authen:phone-input")}
                />
                {!isPhoneValid && (
                  <p className="text-red-500 text-sm mt-1">
                    {t("errors:validate-phone-failed")}
                  </p>
                )}
              </div>
                  {/*Address*/}
                  <div>
                <label className="block mb-1 font-medium text-gray-700">{t("authen:phone-number")}</label>
                <Input
                  className="h-12 w-full rounded-lg pr-4 border border-gray-300 focus:border-primary-500"
                  type="text"
                  name="phoneNumber"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  onBlur={handlePhoneBlur}
                  placeholder={t("authen:address-input")}
                />
                {!isPhoneValid && (
                  <p className="text-red-500 text-sm mt-1">
                    {t("errors:validate-phone-failed")}
                  </p>
                )}
              </div>
              
              {/* Business License */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">{t("authen:license")}</label>
                <div className="flex items-center space-x-4">
                  <Button
                    label={t("authen:choose-file")}
                    variant={BUTTON_COMMON_TYPE.PRIMARY}
                    onClickButton={handleChooseFile}
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {businessLicense && (
                    <p className="text-gray-600 text-sm">{businessLicense.name}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Checklist validate mật khẩu */}
          <ul className="mt-4 mb-4 space-y-1">
            {[
              {
                key: "length",
                message: t("authen:password-validation:length"),
              },
              {
                key: "uppercase",
                message: t("authen:password-validation:uppercase"),
              },
              {
                key: "number",
                message: t("authen:password-validation:number"),
              },
              {
                key: "specialChar",
                message: t("authen:password-validation:specialChar"),
              },
              {
                key: "match",
                message: t("authen:password-validation:match"),
              },
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

          {/* Checkbox Terms và Nút Sign Up */}
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
              <p className="text-gray-600 cursor-pointer" onClick={() => setIsSignUpOrganization(false)}>
                {t("authen:already-have-account")}{" "}
                <a className="text-blue-600 hover:underline font-medium">
                  {t("authen:login")}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

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

export default SignUpOrganizationComponent;
