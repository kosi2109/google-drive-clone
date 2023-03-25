import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { googleUserLogin } from "../../../api/backendApi";

const MAX_AGE = 30 * 24 * 60 * 60; // 30 days;

export default (req : NextApiRequest, res : NextApiResponse)=> {
  return NextAuth(req, res, {
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
          const u : any = (await googleUserLogin({
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
          
          res.setHeader('Set-Cookie', serialize('jwt', JSON.stringify(user.access_token), { path: '/', maxAge : MAX_AGE}))
          
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
    secret : process.env.NEXT_PUBLIC_SESSION_SECRET,
    pages : {
      signIn : '/auth'
    },
    session : {
      maxAge: MAX_AGE,
    }
  });
} 

