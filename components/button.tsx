"use client";

import { useFormStatus } from "react-dom";

interface FormButtonProps {
  text: string;
}

export default function Button({ text }: FormButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="p-3 bg-gray-200 text-neutral-950 font-medium rounded-full text-center hover:bg-gray-300 transition-colors
      disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed"
    >
      {pending ? "Loading..." : text}
    </button>
  );
}
