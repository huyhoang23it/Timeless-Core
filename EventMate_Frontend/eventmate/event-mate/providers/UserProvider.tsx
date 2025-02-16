// "use client";
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { AUTHENTICATION_ERROR_CODE } from "@/constants/constant";
// import { PUB_TOPIC } from "@/constants/pubTopic";
// import { clearAuthInfo, getAuthInfo, setAuthInfo } from "@/ultilities/auth";
// import { getSession, signOut, useSession } from "next-auth/react";
// import { usePathname, useRouter } from "next/navigation";
// import {
//   ReactNode,
//   useEffect,
//   createContext,
//   useContext,
//   useMemo,
// } from "react";
// import PubSub from "pubsub-js";


// interface UserState {
//   session: any | null; // Nếu có kiểu cụ thể, thay thế `any`
//   status: "loading" | "authenticated" | "unauthenticated";
//   logout: () => void;
// }

// // 📌 2️⃣ Khai báo giá trị mặc định
// const initialState: UserState = {
//   session: null,
//   status: "loading",
//   logout: () => {},
// };

// // 📌 3️⃣ Tạo Context với kiểu dữ liệu `UserState`
// export const UserContext = createContext<UserState>(initialState);

// // 📌 4️⃣ Custom hook để sử dụng Context
// export const useUserContext = () => useContext(UserContext);

// // 📌 5️⃣ Tạo Provider component
// function UserProvider({ children }: { children: ReactNode }) {
//   // const router = useRouter();
//   // const currentPage = usePathname();
//   const { data: session, status } = useSession();

//   // Lưu thông tin user vào local storage khi đăng nhập thành công
//   useEffect(() => {

//     console.log(status);
    
//     if (session && status === "authenticated") {
//       setAuthInfo(session);
//     }
//   }, [session, status]);

//   // Kiểm tra trạng thái đăng nhập và điều hướng
//   // useEffect(() => {
//   //   if (status === "loading") return;

//   //   if (currentPage === "/login" && status === "authenticated") {
//   //     router.push("/");
//   //   } else if (status === "unauthenticated") {
//   //     router.push(
//   //       currentPage === "/"
//   //         ? "/login"
//   //         : `/intro?error=${AUTHENTICATION_ERROR_CODE.UNAUTHORIZED}`
//   //     );
//   //   }
//   // }, [currentPage, router, status]);

//   // Lắng nghe sự kiện UNAUTHORIZED_REQUEST từ PubSub
//   useEffect(() => {
//     const token = PubSub.subscribe(PUB_TOPIC.UNAUTHORIZED_REQUEST, handleLogout);
//     return () => {
//       PubSub.unsubscribe(token);
//     };
//   }, []);

//   // Hàm logout
//   const handleLogout = async () => {
//     clearAuthInfo();
//     signOut({ redirect: true });
//   };


//   const userContextValue = useMemo(
//     () => ({
//       session,
//       status,
//       logout: handleLogout,
//     }),
//     [session, status]
//   );

//   return (
//     <UserContext.Provider value={userContextValue}>
//       {children}
//     </UserContext.Provider>
//   );
// }

// export default UserProvider;
