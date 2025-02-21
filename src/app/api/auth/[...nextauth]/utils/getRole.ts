import parsedEnv from "@/../env";


export default function getRole(email:string | undefined | null) {
    let role = "user";
    if (email === parsedEnv.ADMIN_EMAIL) {
        role = "admin";
    }
    return role;
}