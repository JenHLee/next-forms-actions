interface FormInputProps {
  name: string;
  type: string;
  placeholder: string;
  required: boolean;
  errors: string;
}
export default function FormInput({
  name,
  type,
  placeholder,
  required,
  errors,
}: FormInputProps) {
  return (
    <>
    <div className="flex items-center border-2 border-gray-300 rounded-full px-3 py-2 focus-within:border-blue-500 transition">
      {name === "email" && (
        <svg
        className="h-5 w-5 m-2 text-gray-500"
        data-slot="icon"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        >
          <path d="M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Z"></path>
          <path d="m19 8.839-7.77 3.885a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z"></path>
        </svg>
      )}

      {name === "username" && (
        <svg
        className="h-5 w-5 m-2  text-gray-500"
        data-slot="icon"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        >
          <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z"></path>
        </svg>
      )}

      {name === "password" && (
        <svg
        className="h-5 w-5 m-2  text-gray-500"
        data-slot="icon"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M8 7a5 5 0 1 1 3.61 4.804l-1.903 1.903A1 1 0 0 1 9 14H8v1a1 1 0 0 1-1 1H6v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-2a1 1 0 0 1 .293-.707L8.196 8.39A5.002 5.002 0 0 1 8 7Zm5-3a.75.75 0 0 0 0 1.5A1.5 1.5 0 0 1 14.5 7 .75.75 0 0 0 16 7a3 3 0 0 0-3-3Z"
            ></path>
        </svg>
      )}
      <input
        className="bg-transparent w-full h-10 -none placeholder:text-gray-400 flex-1 focus:ring-0 focus:outline-none"
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        />
    </div>
      {errors && <span className="text-red-500 font-medium">{errors} </span>}
        </>
  );
}
