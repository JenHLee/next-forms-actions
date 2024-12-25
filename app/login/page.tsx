"use client";
import FormInput from "@/components/input";
import { useActionState } from "react";
import { handleForm } from "./action"
import FormButton from "@/components/button";

export default function Login() {
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
          name="password"
          type="password"
          placeholder="Password"
          required
          errors={state?.fieldErrors?.password || ""}
        />
        <FormButton text="Log In" />
      </form>
    </div>
  );
}
