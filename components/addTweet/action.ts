'use server'

import { z } from "zod";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const productSchema = z.object({
    tweet: z.string({
        required_error: "tweet is required"
    }),
})

export async function createNewTweet(prevState: any, formData: FormData) {
    const data = {
        tweet: formData.get("tweet"),
    };
    console.log("data:", data);
    const result = productSchema.safeParse(data);
    console.log("result: ", result);

    if (!result.success) {
        console.error("Validation errors:", result.error.flatten());
        return result.error.flatten();
    } else {
        console.log("Validation passed, creating product...")
        const session = await getSession();
        if (session.id) {
            const tweet = await db.tweet.create({
                data: {
                    tweet: result.data.tweet,
                    user: {
                        connect: {
                            id: session.id
                        }
                    }
                },
                select: {
                    id: true
                }
            });
            redirect(`/${tweet.id}`);

        }
    }
}
