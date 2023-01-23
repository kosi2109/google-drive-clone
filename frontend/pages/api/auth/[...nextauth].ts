import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { googleUserLogin } from "../../../api/backendApi";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Laravel",
      credentials : {
        email : {type : 'text'},
        googleId : {type : 'text'},
        imageUrl : {type : 'text'},
        name : {type : 'text'},
      },
      async authorize(credentials, req) {                
        const u = (await googleUserLogin({
          email: credentials?.email,
          google_id: credentials?.googleId,
          imageUrl: credentials?.imageUrl,
          name: credentials?.name,
        }));   
             
        const user = {
          name: u?.data?.user?.name,
          access_token: u?.data?.access_token,
          email : u?.data?.user?.email,
          image : u?.data?.user?.avatar
        };

        if (!user) {
          return null;
        }

        return user as any;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser } : any) {
      if (account) {
        token.account = {
          ...account,
          access_token: user?.access_token, // <-- add token to JWT (Next's) object
        };
      }
      return token;
    },
    async session({ session, token }) {
      return { ...session, token : token?.account };
    },
  },
  secret : process.env.SESSION_SECRET,
  pages : {
    signIn : '/auth'
  }
});
