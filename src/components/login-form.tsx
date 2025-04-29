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
import { loginSchema } from "@/db/zod-schemas"
import Link from "next/link"
import { useAction } from "next-safe-action/hooks"
import { loginUsername } from "@/app/server-actions/auth-actions"

export function LoginForm() {
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
        },
    })

    const { execute, isPending, result , } = useAction(loginUsername)

    function onSubmit(values: z.infer<typeof loginSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        execute(values)
    }
    // ...
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 border py-5 px-5 rounded-md w-[clamp(300px,50%,350px)]"
            >
                <div>
                    <h1 className="font-semibold">Login to your account</h1>
                    <p className="text-red-700 -mb-3">{result.serverError}</p>
                </div>
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="username..."
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription></FormDescription>
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
                                    autoComplete="off"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    disabled={isPending}
                    className="w-full"
                    type="submit"
                >
                    Login
                </Button>
                <div className="text-center -mt-5">
                    <p>
                        Don&apos;t have an account?{" "}
                        <Link
                            className="underline"
                            href={"/signup"}
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </form>
        </Form>
    )
}
