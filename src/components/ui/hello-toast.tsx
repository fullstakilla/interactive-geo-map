"use client";

import { toast } from "sonner";

import { useEffect } from "react";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";

export function HelloToast() {
    const { t } = useAppSettingsStore();
    const { data: session, status } = useSession();
    const [hasShownToast, setHasShownToast] = useState(false);

    useEffect(() => {
        if (status === "authenticated" && session?.user && !hasShownToast) {
            toast.success(
                t("common.welcome", { name: session.user.name as any })
            );
            setHasShownToast(true);
        }
    }, [status, session, hasShownToast, t]);

    return null;
}
