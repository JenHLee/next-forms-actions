"use client";

import { initialTweets } from "@/app/page";
import { getMoreTweets } from "@/app/tweets/action";
import { useState } from "react";
import ListTweet from "./list-tweet";

interface TweetListProps {
  initialTweets: initialTweets;
}

export default function TweetList({ initialTweets }: TweetListProps) {
  const [tweets, setTweets] = useState(initialTweets);
  const [isLoading, setIsLoading] = useState(false);

  const onLoadMoreClick = async () => {
    setIsLoading(true);
    const newTweets = await getMoreTweets(1);
    setTweets((prev) => [...prev, ...newTweets]);
    setIsLoading(false);
  };
  return (
    <div>
      {tweets.map((tweet) => (
        <ListTweet key={tweet.id} {...tweet} />
      ))}
      <button
        onClick={onLoadMoreClick}
        disabled={isLoading}
        className="text-sm font-semidbold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
      >
        {isLoading ? "Loading..." : "Load More"}
      </button>
    </div>
  );
}
