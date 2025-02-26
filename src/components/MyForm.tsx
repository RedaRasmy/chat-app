import { z } from "zod";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import errorToShow from "@/utils/errorToShow";

export const insertUserSchema = z.object({
    username: z.string().min(3).max(15),
    password: z.string().min(8).max(50),
});

type InsertUserSchemaType = z.infer<typeof insertUserSchema>;

export default function Form() {
    const {
        register,
        formState: { errors, isSubmitting },
        // setError,
        handleSubmit,
    } = useForm<InsertUserSchemaType>({
        resolver: zodResolver(insertUserSchema),
    });

    async function onSubmit() {}

    const error = errorToShow(errors)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <p className="text-red-600">{error}</p>
            <Input {...register("username")} placeholder="username" />
            <Input {...register("password")} placeholder="password" />
            <Button disabled={isSubmitting}>submit</Button>
        </form>
    );
}
