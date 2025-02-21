import CredentailsProvider from "next-auth/providers/credentials";
import { NextAuthOptions,  } from "next-auth";
import User from "@/app/Models/User";
import bcrypt from "bcryptjs";
import parsedEnv from "../../../../../env";
import connectMongoDB from "@/lib/mongodb";

export const options: NextAuthOptions = {
    providers: [
        CredentailsProvider({
            name: "credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "Username",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "password",
                },
            },
            async authorize(credentials) {
                try {
                    if (!credentials) return null;
                    const {username , password } = credentials

                    await connectMongoDB()

                    const foundUser = await User.findOne({
                        username ,
                    });

                    if (!foundUser) return null;

                    const match = await bcrypt.compare(
                        password,
                        foundUser.password
                    );

                    if (!match) return null

                    return {
                        id: foundUser._id,
                        username: foundUser.username,
                        role: "user",
                    }
                    
                } catch (error) {
                    console.log(error);
                }
                return null;
            },
        }),
    ],
    session : {
        strategy: 'jwt'
    },
    secret: parsedEnv.NEXTAUTH_SECRET ,

    callbacks: {
        
        // async jwt({ token, user }) {
        //     if (user) {
        //         token.role = user.role;
        //     }
        //     return token;
        // },
        // async session({session,token}) {
        //     if (session?.user) {
        //         session.user.role = token.role
        //     }
        //     return session
        // }
    },
    pages: {
        signIn:"/auth/login",
        newUser:'/auth/register',
        // signOut:"/auth/signout"
    }
};
