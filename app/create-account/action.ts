"use server";
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR, USERNAME_MIN_LENGTH } from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt"
import getSession from "@/lib/session";
import { redirect } from "next/navigation";


const formSchema = z.object({
    email: z.string().email().refine((email) => email.endsWith("@zod.com"), {
        message: "Only @zod.com emails are allowed"
    }),
    username: z.string()
        .min(USERNAME_MIN_LENGTH),
    password: z.string()
        .min(PASSWORD_MIN_LENGTH)
        .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR)
}).superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
        where: {
            email,
        },
        select: {
            id: true
        }
    });
    if (user) {
        ctx.addIssue({
            code: 'custom',
            message: "This email is already taken",
            path: ['email'],
            fatal: true
        })
        return z.NEVER
    }
}).superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
        where: {
            username,
        },
        select: {
            id: true
        }
    });
    if (user) {
        ctx.addIssue({
            code: 'custom',
            message: 'This username is already taken',
            path: ['username'],
            fatal: true
        })
        return z.NEVER;
    }
})


export async function handleForm(prevState: any, formData: FormData) {
    const data = {
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
    }
    const result = await formSchema.spa(data);
    console.log(result);
    if (!result.success) {
        console.log("Create Account Error: ", result.error.flatten());
        return result.error.flatten()
    } else {
        const hashedPassword = await bcrypt.hash(result.data.password, 12)
        const user = await db.user.create({
            data: {
                username: result.data.username,
                email: result.data.email,
                password: hashedPassword
            },
            select: {
                id: true
            }
        })

        console.log("create account user id: ", user);

        const session = await getSession();
        session.id = user.id;
        await session.save();

        redirect("/profile")
    }
    // return { success: true, message: "Welcome back!", fieldErrors: {} };
}