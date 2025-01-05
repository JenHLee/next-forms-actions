"use client";

import { startTransition, useOptimistic, useState } from "react";
import { responseTweet, unresponseTweet } from "@/app/tweets/[id]/actions";

interface InputResponseProps {
  tweetId: number;
  isResponsed: boolean;
  response: string | null;
}

export default function InputResponse({
  tweetId,
  isResponsed,
  response,
}: InputResponseProps) {
  const [inputValue, setInputValue] = useState(response || "");

  const [state, reducerFn] = useOptimistic(
    { isResponsed, response },
    (previousState, payload) => {
      console.log("Payload received by reducerFn:", payload); // Log payload

      return {
        isResponsed: !previousState.isResponsed,
        response: payload 
      };
    }
  );

  const onDelete = async () => {
    startTransition(() => {
      reducerFn("");
    });

    console.log("response is here - 그래서 응답 삭제할거야");
    await unresponseTweet(tweetId); //응답 취소
  };

  const onSubmit = async () => {
    const trimmedInputValue = inputValue.trim();
    if (trimmedInputValue === "") {
      console.log("Input is empty, nothing to submit.");
      return; // 빈 값 제출 방지
    }
    startTransition(() => {
      reducerFn(inputValue.trim());
    });

    await responseTweet(tweetId, inputValue); // 응답
  };
  return (
    <div>
      {state.isResponsed ? (
        <>
          <span>{state.response}</span>
          <button onClick={onDelete}>응답 삭제</button>
        </>
      ) : (
        <div className="p-5 items-center">
          <input
            className=" p-3 border border-neutral-300"
            name="response"
            required
            placeholder="답변"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            type="text"
          />
          <button onClick={onSubmit}>응답 제출</button>
        </div>
      )}
    </div>
  );
}
