import GithubProvider from "next-auth/providers/github";
import CredentailsProvider from "next-auth/providers/credentials";
import { AuthOptions,   } from 'next-auth';
import User from "@/app/Models/User";
import bcrypt from 'bcrypt';

export const options:AuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID ?? '',
            clientSecret: process.env.GITHUB_SECRET ?? '',
            // i can access to github profile with profile function 
            profile(profile) {
                const role = getRole(profile.email);
                return {
                    ...profile,
                    role,
                }
            }
        }),
        CredentailsProvider({
            name: "Credentials",
            credentials: {
                username : {label:"Username", type:"text"},
                email: {label: "Email", type: "email"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials) {
                try {
                    if (credentials) {
                        const foundUser = await User.findOne({email: credentials.email})
                        if (foundUser) {
                            const match = await bcrypt.compare(credentials.password, foundUser.password);
                            if (match) {
                                return {
                                    id: foundUser._id,
                                    username: foundUser.username,
                                    email: foundUser.email,
                                    role: 'Unverified Email',
                                } 
                            }
                        }
                    }
                } catch (error) {
                    console.log(error)
                }
                return null;
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.role = getRole(user.email);
            }
            return token;
        },
    },
};



function getRole(email:string | undefined | null) {
    let role = "user";
    if (email === process.env.ADMIN_EMAIL) {
        role = "admin";
    }
    return role;
}