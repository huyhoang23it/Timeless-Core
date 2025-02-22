"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LanguageProvider from "@/providers/LanguageProvider";
import ReactPortal from "@/components/basic/ReactPortal";
import { cssTransition, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SessionWrapper from "@/providers/SessionWrapper";
import UserProvider from "@/providers/UserProvider";

const customTransition = cssTransition({
  enter: 'custom-enter',
  exit: 'custom-exit',
});
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionWrapper>

          <LanguageProvider>
            <UserProvider>
              
                <ReactPortal wrapperId="global-toast-wrapper">
                  {children}
                  <ToastContainer
                  transition={customTransition}
                  limit={1}
                  position={'top-left'}
                  theme="colored"
                  className="display-linebreak"
                  draggable={false}
                  closeButton={false}
                  hideProgressBar={true} 
                  aria-label={undefined}                  
                  />
                </ReactPortal>
             
            </UserProvider>
          </LanguageProvider>

        </SessionWrapper>

      </body>
    </html >


  );
}
