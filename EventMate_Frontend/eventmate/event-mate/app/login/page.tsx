"use client";
import i18n from "i18next";

// import { AuthRepository } from "@/repositories/AuthRepository";
import { useLanguage } from "@/providers/LanguageProvider";

import { toast } from "@/ultilities/toastMessageHelper";
import { AuthRepository } from "@/repositories/AuthRepository";
import LoginPage from "@/components/basic/LoginComponent";

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
  <button onClick={changeLanguage} className="bg-gray-500 text-white px-4 py-2 rounded ml-2">
    Change Lang
  </button>
<LoginPage />  
</div>

       
    );
}
export default Login;