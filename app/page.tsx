"use client";
import FormInput from "@/components/form-input";
import { useActionState } from "react";
import { handleForm } from "./action";
import FormButton from "@/components/form-btn";

export default function Home() {
  const [state, action] = useActionState(handleForm, null);
  //console.log(state);

  return (
    <div className="flex flex-col justify-center items-center mt-10 gap-5">
      <span className="text-4xl	">🔥</span>
      <form action={action} className="flex flex-col gap-3 w-1/2">
        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          required
          errors=""

        />
        <FormInput
          name="username"
          type="text"
          placeholder="Username"
          required
          errors=""
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          required
          errors={[state?.errors] || ""}
        />
        <FormButton text="Log In" />
        {state?.success && (
          <span className="p-4 bg-green-500 text-neutral-950 font-medium rounded-2xl flex">
            <svg
              className="h-6 w-6 mx-2"
              data-slot="icon"
              fill="none"
              stroke-width="1.5"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              ></path>
            </svg>
            {state?.success}
          </span>
        )}
      </form>
    </div>
  );
}
