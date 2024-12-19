"use server";

export async function handleForm(prevState: any, formData: FormData) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    // console.log(password);
    const password = formData.get("password");

    if (password != '12345') {
        return { errors: "Wrong password" }
    }
    return { success: "Welcome back!" }
}