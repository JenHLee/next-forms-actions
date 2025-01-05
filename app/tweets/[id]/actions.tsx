"use server";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidateTag } from "next/cache";

export async function likeTweet(tweetId: number) {
  // await new Promise((r) => setTimeout(r, 10000));
  const session = await getSession();
  try {
    await db.like.create({
      data: {
        tweetId,
        userId: session.id!,
      },
    });
    revalidateTag(`like-status-${tweetId}`);
  } catch (e) {}
}

export async function dislikeTweet(tweetId: number) {
  // await new Promise((r) => setTimeout(r, 10000));
  try {
    const session = await getSession();
    await db.like.delete({
      where: {
        id: {
          tweetId,
          userId: session.id!,
        },
      },
    });
    revalidateTag(`like-status-${tweetId}`);
  } catch (e) {}
}

export async function responseTweet(tweetId: number, payload:string) {
  // await new Promise((r) => setTimeout(r, 20000));
  console.log("response Tweet: ", payload);
  const session = await getSession();
  try {
    const newResponse = await db.response.create({
      data: {
        tweetId,
        userId: session.id!,
        created_at: new Date(),
        payload: payload
      },
    });
    revalidateTag(`response-status-${tweetId}`);
    return newResponse;
  } catch (e) {  // 에러 로그 출력
    console.error("Error creating response: ", e);
    throw new Error("Failed to create response");
}
}

export async function unresponseTweet(tweetId: number) {
  // await new Promise((r) => setTimeout(r, 10000)); // 시뮬레이션: 서버 응답 지연
  const session = await getSession();
  try {
    // 응답 취소 (좋아요 취소)
    await db.response.delete({
      where: {
        id: {
          tweetId,
          userId: session.id!, // 세션에서 가져온 사용자 ID
        },
      },
    });

    // 해당 트윗의 응답 상태를 새로 고침
    revalidateTag(`response-status-${tweetId}`);
  } catch (e) {}
}
