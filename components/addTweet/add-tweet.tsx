'use client'

import { useActionState } from "react";
import Button from "../button";
import { createNewTweet } from "./action";

export default function AddTweet() {
  const [state, action] = useActionState(createNewTweet, null);

  return (
    <div className="p-5 items-center">
      <span>New Tweet Form</span>
      <form action={action} className="gap-3 flex flex-col gap-5">
        <input
          className=" p-3 border border-neutral-300"
          name="tweet"
          required
          placeholder="tweet"
          type="text"
        />

        {state?.fieldErrors.tweet}
        <Button text="Submit" />
      </form>
    </div>
  );
}
