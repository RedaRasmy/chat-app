import { FieldErrors } from "react-hook-form";

export default function errorToShow(errors:FieldErrors<{
    username: string;
    password: string;
}>) {
    if (errors.root) {
        return errors.root.message
    }
    if (errors.username) {
        return errors.username.message
    }
    if (errors.password) {
        return errors.password.message
    }
}