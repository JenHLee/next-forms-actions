"use server";

import bcrypt  from 'bcrypt';
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR, USERNAME_MIN_LENGTH } from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import getSession from '@/lib/session';
import { redirect } from 'next/navigation';

const checkEmailExists = async (email: string) => {
    const user = await db.user.findUnique({
        where: {
            email,
        },
        select: {
            id: true,
        }
    })
    return Boolean(user)
}

const formSchema = z.object({
    email: z.string({required_error: "Email is required"}).email().toLowerCase().refine((email) => email.endsWith("@zod.com"), {
        message: "Only @zod.com emails are allowed."
    }).refine(await checkEmailExists, " An account with this email is not exists."),
    password: z.string().min(PASSWORD_MIN_LENGTH).regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR)
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
        return result.error.flatten()
    } else {
        const user = await db.user.findUnique({
            where: {
                email: result.data.email
            },
            select: {
                id: true,
                password: true
            }
        })

        const ok = await bcrypt.compare(result.data.password, user!.password ?? "xxxx")
        console.log("ok: ", ok);

        if (ok) {
            const session = await getSession();
            session.id = user!.id;
            await session.save();
            redirect("/profile")
        } else {
            return {
                fieldError: {
                    password: ["Wrong password."],
                    email: []
                }
            }
        }
    }
}