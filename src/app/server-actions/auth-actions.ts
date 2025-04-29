'use server'

import { loginSchema ,signupSchema } from "@/db/zod-schemas"
import { auth } from "@/lib/auth"
import { actionClient } from "@/lib/safe-action"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export const signUpEmail = actionClient
    .metadata({actionName:'sign-up-email'})
    .schema(signupSchema)
    .action(async ({parsedInput}) => {

        const {email,username,password } = parsedInput

        await auth.api.signUpEmail({
            body : {
                email,
                password,
                username,
                name : username
            }
        })

        redirect('/')
    })

export const loginUsername = actionClient
    .metadata({actionName:'login-username'})
    .schema(loginSchema)
    .action(async ({parsedInput}) => {
        const {username,password} = parsedInput

        await auth.api.signInUsername({
            body : {
                username,
                password
            }
        })

        redirect('/')
    })


export const logout = actionClient
    .metadata({actionName:'logout'})
    .action(async () => {

        await auth.api.signOut({
            headers : await headers()
        })

        redirect('/login')
    })