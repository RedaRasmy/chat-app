import { useSession } from "@/lib/auth-client";
// import { useMemo } from "react";

export default function useUser() {
    const { data } = useSession();

    return data?.user

    // return useMemo(() => data?.user, [data?.user]); // ✅ Keeps reference stable
}
