

export default function getRole(email:string | undefined | null) {
    let role = "user";
    if (email === process.env.ADMIN_EMAIL) {
        role = "admin";
    }
    return role;
}