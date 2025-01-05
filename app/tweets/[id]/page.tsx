import LikeButton from "@/components/like-button";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound } from "next/navigation";
import { unstable_cache as nextCache } from "next/cache";
import InputResponse from "@/components/input-response";

async function getIsOwner(userId: number) {
  const session = await getSession();
  if (session.id) {
    return session.id === userId;
  }
  return false;
}

async function getTweets(id: number) {
  const tweet = await db.tweet.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
  return tweet;
}

async function getLikeStatus(tweetId: number, userId: number) {
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        tweetId,
        userId,
      },
    },
  });
  const likeCount = await db.like.count({
    where: {
      tweetId,
    },
  });
  return {
    likeCount,
    isLiked: Boolean(isLiked),
  };
}

async function getResponseStatus(tweetId: number, userId: number) {
  const isResponsed = await db.response.findUnique({
    where: {
      id: {
        tweetId,
        userId,
      },
    },
  });
  const response = await db.response.findUnique({
    where: {
      id: {
        userId,
        tweetId,
      },
    },
  });
  return {
    response,
    isResponsed: Boolean(isResponsed),
  };
}

async function getCachedLikeStatus(tweetId: number) {
  const session = await getSession();
  const userId = session.id;
  const cachedOperation = nextCache(getLikeStatus, ["tweet-like-status"], {
    tags: [`like-status-${tweetId}`],
  });
  return cachedOperation(tweetId, userId!);
}

async function getCachedResponseStatus(tweetId: number) {
  const session = await getSession();
  const userId = session.id;
  const cachedOperation = nextCache(
    getResponseStatus,
    ["tweet-response-status"],
    {
      tags: [`response-status-${tweetId}`],
    }
  );
  return cachedOperation(tweetId, userId!);
}

export type paramsType = Promise<{ id: string }>;


export default async function TweetDetail(props: { params: paramsType}) {
  const id = Number((await props.params).id);

  if (isNaN(id)) {
    return notFound();
  }
  const tweet = await getTweets(id);
  if (!tweet) {
    return notFound();
  }

  const isOwner = await getIsOwner(tweet.userId);

  const { likeCount, isLiked } = await getCachedLikeStatus(id);
  const { isResponsed, response } = await getCachedResponseStatus(id);

  return (
    <div>
      <div className="p-5 flex items-center gap-3 border-b border-neutral-700">
        <div>
          <h3>{tweet.user.username}</h3>
        </div>
      </div>
      <div className="p-5">
        <p>{tweet.tweet}</p>
      </div>
      <LikeButton isLiked={isLiked} likeCount={likeCount} tweetId={id} />
      <InputResponse
        isResponsed={isResponsed}
        response={response?.payload || ""}
        tweetId={id}
      />
      <div className="fixed w-full bottom-0 left-0 p-5 pb-10 bg-neutral-800 flex justify-between items-center">
        {isOwner ? (
          <button className="bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold">
            Delete tweet
          </button>
        ) : null}
      </div>
    </div>
  );
}
