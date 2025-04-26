"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signupSchema } from "@/db/zod-schemas"
import Link from "next/link"
import { useAction } from "next-safe-action/hooks";
import {signUpEmail} from '@/app/server-actions/auth-actions'

export function SignupForm() {

    const form = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            username: "",
        },
    })

    const { execute, result ,isPending } = useAction(signUpEmail);

    function onSubmit(values: z.infer<typeof signupSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        execute(values)
        console.log(values)
    }

    // const usernameErrors = result.validationErrors?.username?._errors
    // const emailErrors = result.validationErrors?.email?._errors
    // const passwordErrors = result.validationErrors?.password?._errors

    // ...
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 border py-5 px-5 rounded-md w-[clamp(300px,50%,350px)]"
            >
                <h1 className="font-semibold">
                    Sing up for an account
                    <p>{result.validationErrors?._errors}</p>
                </h1>
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>username</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="username..."
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>username</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="name@example.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="password..."
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button 
                    className="w-full" 
                    type="submit"
                    disabled={isPending}
                    >
                        Sign up
                    </Button>
                <div className="text-center -mt-4">
                    <p>
                        Already have an account? 
                        {' '}
                        <Link className="underline" href={'/login'}>Login</Link>
                    </p>
                </div>
            </form>
        </Form>
    )
}
