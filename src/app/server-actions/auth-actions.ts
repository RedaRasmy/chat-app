'use server'

import { loginSchema ,signupSchema } from "@/db/zod-schemas"
import { auth } from "@/lib/auth"
import { actionClient } from "@/lib/safe-action"
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

        const res = await auth.api.signInUsername({
            body : {
                username,
                password
            }
        })

        console.log(res)

        redirect('/')
    })
