"use client";

import { toast } from "sonner";

import { useEffect } from "react";

import { useSession } from "next-auth/react";
import { useState } from "react";

export function HelloToast() {
    const { data: session, status } = useSession();
    const [hasShownToast, setHasShownToast] = useState(false);

    // toast для приветствия
    useEffect(() => {
        if (status === "authenticated" && session?.user && !hasShownToast) {
            toast.success(`Welcome, ${session.user.name}!`);
            setHasShownToast(true);
        }
    }, [status, session, hasShownToast]);

    return null;
}
