"use client";
import FormInput from "@/components/input";
import { useActionState } from "react";
import { handleForm } from "./action"
import FormButton from "@/components/button";

export default function CreateAccount() {
  const [state, dispatch] = useActionState(handleForm, null);

  return (
    <div className="flex flex-col justify-center items-center mt-10 gap-5">
      <span className="text-4xl	">🔥</span>
      <form action={dispatch} className="flex flex-col gap-3 w-1/2">
        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={state?.fieldErrors?.email || ""}
        />
        <FormInput
          name="username"
          type="text"
          placeholder="Username"
          required
          errors={state?.fieldErrors?.username || ""}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          required
          errors={state?.fieldErrors?.password || ""}
        />
        <FormButton text="Create Account" />
        {state?.success && (
          <span className="p-4 bg-green-500 text-neutral-950 font-medium rounded-2xl flex">
            <svg
              className="h-6 w-6 mx-2"
              data-slot="icon"
              fill="none"
              strokeWidth="1.5"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              ></path>
            </svg>
            {state.message}
          </span>
        )}
      </form>
    </div>
  );
}
