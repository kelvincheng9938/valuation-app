// /lib/auth.js
import GoogleProvider from "next-auth/providers/google";

/** @type {import("next-auth").NextAuthOptions} */
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  // 你有自訂登入頁就保留，冇就刪走呢行
  pages: { signIn: "/login" },
  // （可按需要加 callbacks / events）
};
