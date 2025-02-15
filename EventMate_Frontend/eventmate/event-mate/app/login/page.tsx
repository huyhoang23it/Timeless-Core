"use client";
import i18n from "i18next";

// import { AuthRepository } from "@/repositories/AuthRepository";
import { useLanguage } from "@/providers/LanguageProvider";
import Img from "@/public/next.svg"
import { toast } from "@/ultilities/toastMessageHelper";



const Login = () => {
const { t } = useLanguage();
const login = async () => {

localStorage.setItem("token", "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiIxMjM0QGdtYWlsLmNvbSIsInVzZXJJZCI6Ijk0ZTgzZGI3LTM5ZDktNGNlZi1lZmVlLTA4ZGNjN2RlNDA3NCIsInVzZXJuYW1lIjoiY2hhcmxpZV9icm93IiwianRpIjoiNzM2MGQ1YTktNGU1Mi00MWRlLTg1OGUtMDk0YjUwZGQwYmI2IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiVXNlciIsImV4cCI6MTczOTM3NTQwNCwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzEyMSIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcxMjEifQ.e_fAapXNumLIXxWEP_cGq31dtrJAkgpkhKo1FVpZCpI");
};
// const getNew = async () => {
//     const response = await AuthRepository.getNew();
//     console.log(response);
// }
const changeLanguage = async () => {
console.log("change language");
  toast.error("Change language successfully");
    // await i18n.changeLanguage("vi");
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
</div>

       
    );
}
export default Login;