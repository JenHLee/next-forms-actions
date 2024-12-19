"use server";

export async function handleForm(prevState: any, formData: FormData) {
    const password = formData.get("password");
   // console.log(password);
    if (password != '12345') {
        return {errors: "Wrong password" }
    }
    return {success: "Welcome back!"}
}