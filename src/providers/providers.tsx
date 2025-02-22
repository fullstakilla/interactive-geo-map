"use client";

import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import { NoteDialogProvider } from "@/providers/note-dialog-context";

interface Props {
    children: ReactNode;
}

const Providers = (props: Props) => {
    return (
        <SessionProvider>
            <NoteDialogProvider>{props.children}</NoteDialogProvider>
        </SessionProvider>
    );
};

export default Providers;
