// checkout shadcn/form and react-hook-form documentation

"use client";
import { useForm, UseFormSetError } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters") ,
    password: z.string().min(8,"Password must be at least 8 characters"),
})


type FormData = z.infer<typeof formSchema>

export type SubmitFunction = (data: FormData, setError: UseFormSetError<FormData>) => Promise<unknown>




export default function MyForm({onSubmit,buttonText}:{
    onSubmit : SubmitFunction,
    buttonText:string
}) {



    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    async function onSub(values:FormData) {
        await onSubmit(values,form.setError)
    }

    return (
        <Form {...form} >
            <form
                onSubmit={form.handleSubmit(onSub)}
                className="space-y-4 border px-12 py-8 rounded-lg 
                shadow-xl "
            >
                <ErrorMessage error={form.formState.errors.root?.message}/>
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter username"
                                    {...field}
                                />
                            </FormControl>
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
                                    placeholder="Enter password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button 
                type="submit" 
                disabled={form.formState.isSubmitting} 
                className="">
                    {buttonText}
                </Button>
            </form>
        </Form>
    );
}


const ErrorMessage = ({error}:{error?:string}) => {
    return (
        <h1 className="text-red-700 ">{error}</h1>
    )
}