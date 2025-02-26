/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Modal, { ModalProps } from "../basic/Modal";
import Input from "../common/Input";
import { useLanguage } from "@/providers/LanguageProvider";
import { Button } from "../common/button";
import { AuthRepository } from "@/repositories/AuthRepository";
import { useRouter } from "next/navigation";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

type CheckOTPModalProps = {
  email: string;
  token: string;
  modalProps: ModalProps;
  setToken: (token: string) => void;
  companyName?: string;
  phoneNumber?: string;
  address?: string;
  businessLicense?: File;
  isSignUpOrganization?: boolean;
};

const CheckOTPModal = ({
  email,
  token,
  setToken,
  modalProps,
  isSignUpOrganization,
}: CheckOTPModalProps) => {
  const { t } = useLanguage();
  const router = useRouter();

  const [otp, setOTP] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingResend, setLoadingResend] = useState<boolean>(false);

  // Validate OTP: chỉ cho phép số và phải đủ 6 ký tự
  const validateOTP = (value: string): boolean => {
    if (!/^\d*$/.test(value)) {
      setError(t("errors:otp-invalid"));
      return false;
    }
    if (value.length !== 6) {
      setError(t("errors:otp-invalid"));
      return false;
    }
    setError("");
    return true;
  };

  const handleChangeOTP = (e: any) => {
    const value = e.target.value;
    setOTP(value);
    validateOTP(value);
  };

  const handleCheckOTP = async () => {
    if (!validateOTP(otp)) return;
    setLoading(true);
    try {
      const res = isSignUpOrganization 
      ? await AuthRepository.verifyOTP(token, otp) 
      : await AuthRepository.verifyOTPOrganization(token, otp);

      if (!res.error) {
        router.push("/login");
        modalProps.closeModal();
        setToken("");
      } else {
        // Giả sử API trả về lỗi với mã "expired" nếu OTP đã hết hạn
        if (res.error === "expired") {
          setError(t("errors:otp-expired"));
        } else {
          setError(t("errors:otp-invalid"));
        }
      }
    } catch (e) {
      setError(t("errors:otp-invalid"));
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setLoadingResend(true);
      const res = await AuthRepository.createOTP(email, token);
      if (!res.error) {
        setToken(res.data);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingResend(false);
    }
  };

  // OTP hợp lệ khi đủ 6 ký tự và không có lỗi
  const isOTPValid = otp.length === 6 && error === "";

  return (
    <Modal {...modalProps} widthMd="max-w-md">
      <div className="rounded-xl px-6 py-6 w-full bg-white shadow-lg">
        {/* Tiêu đề */}
        <h2 className="text-xl font-semibold text-center text-gray-900">
          {t("authen:otp-input-lable")}
        </h2>

        {/* Thông báo OTP */}
        <p className="text-sm text-center text-gray-600 mt-2">
          {t("authen:otp-note")}
        </p>
        <p className="text-center font-medium text-gray-700 mt-2">{email}</p>

        {/* Input OTP */}
        <div className="mt-4">
          <Input
            className={`h-10 w-full rounded-lg border ${error ? "border-red-500" : "border-gray-300"
              } focus:border-primary-500 text-center text-lg tracking-widest`}
            type="text"
            name="otp"
            maxLength={6}
            value={otp}
            onChange={handleChangeOTP}
            onKeyDown={(e: any) => {
              if (e.key === "Enter") {
                handleCheckOTP();
              }
            }}
            placeholder="123456"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        {/* Nút xác nhận OTP */}
        <Button
          className="w-full mt-4 font-semibold text-white bg-primary-600 hover:bg-primary-700 transition-all rounded-lg"
          label={t("authen:continue")}
          disabled={!isOTPValid}
          isLoading={loading}
          onClickButton={handleCheckOTP}
        />

        {/* Resend OTP */}
        <p className="text-center text-sm text-gray-600 mt-4">
          {t("authen:otp-missing")}
        </p>
        <div className="flex justify-center mt-1">
          {loadingResend ? (
            <div className="flex items-center gap-2 text-primary-600">
              <ArrowPathIcon className="w-5 h-5 animate-spin" />
              <span>{t("authen:resend-otp")}</span>
            </div>
          ) : (
            <button
              className="text-primary-600 hover:underline transition-all text-sm"
              onClick={handleResendOTP}
            >
              {t("authen:resend-otp")}
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CheckOTPModal;
