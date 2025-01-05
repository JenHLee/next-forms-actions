import { initialTweets } from '@/app/page';
import { formatToTimeAgo } from '@/lib/utils';
import Link from 'next/link';


interface TweetListProps{
    initialTweets: initialTweets;
}

export default function ListTweet({  
    id,
    tweet,
    created_at,
    like,
}:TweetListProps) {
    return (
        <Link href={`/tweets/${id}`} className="flex gap-5">
          <div className="flex flex-col gap-1">
            <span className="text-lg">{tweet}</span>
            <span className="text-sm text-neutral-500">{formatToTimeAgo(created_at.toString())}</span>
            <span className="text-lg font-semibold">{like}</span>
          </div>
        </Link>
      );
}
