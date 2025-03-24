'use client'
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import errorToShow from "@/utils/errorToShow";
import { insertUserSchema } from "@/db/zod-schemas";
import { IUser } from "@/db/types";


export default function PrepareForm() {
    const {
        register,
        formState: { errors, isSubmitting },
        // setError,
        handleSubmit,
    } = useForm<IUser>({
        resolver: zodResolver(insertUserSchema),
    });

    async function onSubmit() {}

    const error = errorToShow(errors)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <p className="text-red-600">{error}</p>
            <Input {...register("username")} placeholder="username" />
            <Input {...register("email")} value="email from auth" disabled />
            <Button disabled={isSubmitting}>submit</Button>
        </form>
    );
}