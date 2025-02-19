"use client";
import i18n from "i18next";

// import { AuthRepository } from "@/repositories/AuthRepository";
import { useLanguage } from "@/providers/LanguageProvider";

import { toast } from "@/ultilities/toastMessageHelper";
import { AuthRepository } from "@/repositories/AuthRepository";
import LoginPage from "@/components/basic/LoginComponent";
import { Button } from "@/components/common/button";
import { BUTTON_COMMON_TYPE } from "@/constants/constant";

const Login = () => {
const { t } = useLanguage();
const login = async () => {
  const response = await AuthRepository.login("string", "string");
  console.log(response);
localStorage.setItem("token", response.data);
};
// const getNew = async () => {
//     const response = await AuthRepository.getNew();
//     console.log(response);
// }
const changeLanguage = async () => {
console.log("change language");
  toast.error("Change language successfully");
   await i18n.changeLanguage("vi");
}
    return (
        <div className="bg-white p-4">
  <h2>{t("intro-name")}</h2>
  <h2>{t("login:welcome-message")}</h2>

  <button onClick={login} className="bg-blue-500 text-white px-4 py-2 rounded">
    Login
  </button>
  <button onClick={changeLanguage} className=" bg-primary-700 text-white px-4 py-2 rounded ml-2">
    Change Lang
  </button>
<LoginPage />  
<div className="flex gap-2 items-center">
                    <Button
                        className="text-sm"
                        variant={BUTTON_COMMON_TYPE.PRIMARY}
                        type="button"
                        label={t('payment:resume-your-plan')}
                        isLoading={false}
                      
                       
                    />
                    <Button
                        className="text-sm"
                        variant={BUTTON_COMMON_TYPE.CANCEL}
                        type="button"
                        label={t('payment:delete-your-plan')}
                      
                    />
                </div>
</div>

       
    );
}
export default Login;