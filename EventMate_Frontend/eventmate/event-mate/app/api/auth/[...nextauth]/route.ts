
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from 'axios';
import { Agent } from 'https';
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  interface User {
    role?: string;
    avatar?: string;
    token?: string;
  }
  interface Profile {
    picture?: string;
  }

}

const handler = NextAuth({
  session: { strategy: "jwt" },
  secret: "NEXTAUTH_SECRET",
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          avatar: profile.picture,
        };
      }
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Danh sách tài khoản mẫu
        if (!credentials) {
          return null;
        }

        const agent = new Agent({ rejectUnauthorized: false });
        const res = await axios.post("https://localhost:7121/api/Auth/login", { email: 'string', password: 'string' }, { httpsAgent: agent });
        const user = res.data.data.user;
        return {
          id: user.userId,
          name: user.fullName,
          email: user.email,
          avatar: user.avatar,
          role: user.role,
          token: res.data.data.token
        };
      }

    })
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account?.provider === "google" && profile) {
              try {
                const agent = new Agent({ rejectUnauthorized: false });
                const res = await axios.post(
                  "https://localhost:7121/api/Auth/login-google",
                  {
                    googleId: profile.sub, 
                    fullName: profile.name,
                    email: profile.email,
                    avatar: profile.picture
                  },
                  { httpsAgent: agent }
                );
                const userData = res.data.data.user;
                token.id = userData.userId;
                token.email = userData.email;
                token.name = userData.fullName;
                token.role = userData.role;
                token.avatar = userData.avatar;
                token.token = res.data.data.token; 
                return token;
              } catch (error) {
                console.error("Error authenticating with backend:", error);
              }
            }
      if (user){
        token.id = user.id;
              token.email = user.email;
              token.name = user.name;
              token.role = user.role;
              token.avatar = user.avatar;
              token.token = user.token;
      
            return token;
     
      } 
      return token;
    },
      async session({ session, token }) {
       
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.role = token.role as string;
        session.user.avatar = token.avatar as string;
        session.user.token = token.token as string;
      }
      
      return session;
    }
  },
  pages: {
    signIn: "/login"
  },
});
export { handler as GET, handler as POST };