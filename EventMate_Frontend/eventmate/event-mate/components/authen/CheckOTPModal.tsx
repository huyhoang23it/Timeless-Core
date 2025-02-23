/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Modal, { ModalProps } from "../basic/Modal";
import Input from "../common/Input";
import { useLanguage } from "@/providers/LanguageProvider";
import { Button } from "../common/button";
type CheckOTPModalProps = {
    modalProps: ModalProps;
}

const CheckOTPModal = ({
    modalProps
}: CheckOTPModalProps) => {
    const { t } = useLanguage();
    const [otp, setOTP] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const handleCheckOTP = async () => {
        setLoading(true);
        
        setLoading(false);
    };

    return (
        <Modal {...modalProps} widthMd="max-w-xl">
            <div className="rounded-xl px-8 py-10 w-full max-w-md mx-4"
            >
                {/* Tiêu đề */}
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Enter OTP</h2>

                <div className="relative" >

                    <Input
                        className=" !h-[44px] md:w-[400px] w-[350px] !rounded-xl pr-8"
                        type="text"
                        name="email"
                        value={otp}
                        onChange={(e: any) => {
                            setOTP(e.target.value);
                        }}
                        onKeyDown={(e: any) => {
                            if (e.key === 'Enter') {
                                handleCheckOTP();
                            }
                        }}
                        placeholder={t('email-input')}

                    />
                </div>
                <Button
                    className="w-full font-semibold text-white items-center justify-center"
                    label={t('payment:resume-your-plan')}
                    isLoading={loading}
                    onClickButton={handleCheckOTP}
                ></Button>




            </div>
        </Modal>
    );
}
export default CheckOTPModal;