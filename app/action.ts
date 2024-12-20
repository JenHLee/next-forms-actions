"use server";
import { z } from "zod";

const formSchema = z.object({
    email: z.string().email().refine((email) => email.endsWith("@zod.com"), {
        message: "Only @zod.com emails are allowed"
    }),
    username: z.string().min(5,
        {
            message: "Username should be at least 5 characters long.",
        }),
    password: z.string().min(10, {
        message: "Password should be at least 10 characters long."
        ,
    }).refine((password) => /\d/.test(password), {
        message: "Password should contain at least one number.",
    }),
})


export async function handleForm(prevState: any, formData: FormData) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const data = {
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
    }
    const result = formSchema.safeParse(data);
    console.log(result);
    if (!result.success) {
        return result.error.flatten()
    }
    return { success: true, message: "Welcome back!", fieldErrors: {} };
}