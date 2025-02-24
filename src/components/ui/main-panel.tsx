"use client";

import { useSession } from "next-auth/react";
import { AddNoteForm } from "../form/add-note-form";
import FindCountryBtn from "../dialog/find-country-btn";

export default function MainPanel() {
    const { data: session } = useSession();

    if (session === undefined) {
        return null;
    }

    return (
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-50 p-2 flex gap-3">
            <FindCountryBtn />
            {session?.user && (
                <AddNoteForm
                    userName={session.user.name ?? ""}
                    userEmail={session.user.email ?? ""}
                />
            )}
        </div>
    );
}
