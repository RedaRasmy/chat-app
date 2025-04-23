// import { z } from "zod";

// const emailSchema = z.string().email( "invalid email address" );

// const usernameSchema = z
//     .string()
//     .min(3, "Username must be at least 3 characters long")
//     .max(15, "Username must be at most 15 characters long")
//     .regex(/^[A-Za-z]+$/, "Username can only contain alphabetic characters");

// const passwordSchema = z
//     .string()
//     .min(8, "Password must be at least 8 characters long")
//     .max(50, "Password must be at most 50 characters long");


// export const registerSchema = z.object({
//     username: usernameSchema,
//     email: emailSchema,
//     password: passwordSchema,
// });

// export const loginSchema = z.object({
//     usernameOrEmail: z.union([usernameSchema, emailSchema]),
//     password: passwordSchema,
// });
