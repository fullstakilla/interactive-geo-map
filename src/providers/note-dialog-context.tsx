"use client";

import { Note } from "@prisma/client";
import { createContext, useContext, useState, ReactNode } from "react";

interface NoteDialogContextType {
    openDialog: (note: Note) => void;
    closeDialog: () => void;
    selectedNote: Note | null;
    isOpen: boolean;
}

export const NoteDialogContext = createContext<NoteDialogContextType | null>(
    null
);

export function NoteDialogProvider({ children }: { children: ReactNode }) {
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const openDialog = (note: Note) => {
        setSelectedNote(note);
        setIsOpen(true);
    };

    const closeDialog = () => {
        setIsOpen(false);
        setTimeout(() => setSelectedNote(null), 200);
    };

    return (
        <NoteDialogContext.Provider
            value={{ openDialog, closeDialog, selectedNote, isOpen }}
        >
            {children}
        </NoteDialogContext.Provider>
    );
}

export const useNoteDialog = () => {
    const context = useContext(NoteDialogContext);
    if (!context) {
        throw new Error("useNoteDialog must be used within NoteDialogProvider");
    }
    return context;
};
