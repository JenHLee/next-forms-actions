export const PASSWORD_MIN_LENGTH = 10;
export const USERNAME_MIN_LENGTH = 5;
export const PASSWORD_REGEX = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
);

export const PASSWORD_REGEX_ERROR = "A password must have lowercare UPPERCASE, a number and special characters"

