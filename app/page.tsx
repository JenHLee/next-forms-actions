import AddTweet from "@/components/addTweet/add-tweet";
import TweetList from "@/components/tweet-list";
import "@/lib/db";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

async function getInitialTweets() {
  const tweets = await db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      created_at: true,
      Like: true,
    },
    take: 1,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}

export type initialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>; 

export default async function Home() {
  const initialTweets = await getInitialTweets();
  return <>
  <AddTweet />
  <TweetList initialTweets={initialTweets} />
  </>
}
