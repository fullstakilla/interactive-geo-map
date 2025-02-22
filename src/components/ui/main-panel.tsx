"use client";

import { useSession } from "next-auth/react";
import { Button } from "./button";
import { Card } from "./card";
import { AddNoteForm } from "../form/add-note-form";

export default function MainPanel() {
    const { data: session } = useSession();

    return (
        <Card className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-50 p-2 flex gap-3">
            <Button variant="outline">
                <span>🔍</span>
            </Button>
            {session?.user && (
                <AddNoteForm
                    userName={session.user.name ?? ""}
                    userEmail={session.user.email ?? ""}
                />
            )}
        </Card>
    );
}
