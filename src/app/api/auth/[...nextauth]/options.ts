import GithubProvider from "next-auth/providers/github";
import { AuthOptions,  } from 'next-auth';

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