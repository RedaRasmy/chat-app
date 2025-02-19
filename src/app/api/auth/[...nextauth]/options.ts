import GithubProvider, { GithubProfile } from "next-auth/providers/github";
import CredentailsProvider from "next-auth/providers/credentials";
import { NextAuthOptions,  } from "next-auth";
import User from "@/app/Models/User";
import bcrypt from "bcrypt";
import getRole from "./utils/getRole";

export const options: NextAuthOptions = {
    providers: [
        CredentailsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "Username",
                },
                email: { label: "Email", type: "email", placeholder: "Email" },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "password",
                },
            },
            async authorize(credentials) {
                try {
                    if (credentials) {
                        const foundUser = await User.findOne({
                            email: credentials.email,
                        });
                        if (foundUser) {
                            const match = await bcrypt.compare(
                                credentials.password,
                                foundUser.password
                            );
                            if (match) {
                                return {
                                    id: foundUser._id,
                                    username: foundUser.username,
                                    email: foundUser.email,
                                    role: "Unverified Email",
                                };
                            }
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
                return null;
            },
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
            // i can access to github profile with profile function
            profile(profile: GithubProfile) {
                const role = getRole(profile.email);
                return {
                    ...profile,
                    image: profile.avatar_url ,
                    role,
                    id: profile.id.toString(),
                };
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        // i need to store the users in mongodb
        // async signIn(user, account, profile) {
        //     const providerId = profile.id;
        //     const provider = account.provider;
        //     const email = user.email;
        //     const name = user.name;
        //     const image = user.image;

        //     // Check if the user already exists in the database
        //     let existingUser = await User.findOne({ providerId, provider });
        //     if (!existingUser) {
        //         // If the user does not exist, create a new user
        //         existingUser = new User({
        //             email,
        //             name,
        //             image,
        //             provider,
        //             providerId,
        //         });
        //         await existingUser.save();
        //     }
        //     return true;
        // },

        async jwt({ token, user }) {
            if (user) {
                token.role = getRole(user.email);
            }
            return token;
        },
    },
    // pages: {
    //     signIn:"/auth/signin",
    //     signOut:"/auth/signout"
    // }
};
