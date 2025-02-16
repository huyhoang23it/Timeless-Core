// "use client";
// import { EM_STATUS } from '@/constants/constant';
// import { setAuthInfo } from '@/ultilities/auth';
// import { useSession } from 'next-auth/react';
// import { usePathname, useRouter } from 'next/navigation';
// import { ReactNode, useEffect, useState } from 'react';

// function UserProvider({ children }: Readonly<{ children: ReactNode }>) {
// const router = useRouter();
//     const currentPage = usePathname();
//     const { data, status } = useSession();
//     const [session, setSession] = useState<any>(null);
//     const [retryCall, setRetryCall] = useState<number>(0);

//     // const getSessionUser = async () => {
//     //     setAuthInfo(data);
//     // };
//     useEffect(() => {
//         const pathName = window.location.pathname;
//         // const whiteListCheckAuth = WHITELIST_URLS.filter((url) => url !== '/intro');
//         // const shouldCheckAuth = !whiteListCheckAuth.includes(pathName);
//         if (data && status === EM_STATUS.authenticated) {
//             setAuthInfo(data);
//         }
//     }, [retryCall, status]);

// return (
//     // <UserContext.Provider value={userContextValue}>
//     //          {children}
//     // </UserContext.Provider>
// );
// }
// export default UserProvider;