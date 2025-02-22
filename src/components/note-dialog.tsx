"use client";

import { useNoteDialog } from "@/providers/note-dialog-context";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import DeleteNoteButton from "./ui/delete-note-button";

export function NoteDialog() {
    const { isOpen, closeDialog, selectedNote } = useNoteDialog();

    if (!selectedNote) return null;

    return (
        <Dialog open={isOpen} onOpenChange={closeDialog}>
            <DialogContent className="sm:max-w-[425px]">
                <DeleteNoteButton
                    noteId={selectedNote.id}
                    ownerEmail={selectedNote.userEmail}
                    className="absolute -right-11"
                />
                <DialogHeader>
                    <DialogTitle>{selectedNote.userName}</DialogTitle>
                </DialogHeader>

                <div className="text-base">{selectedNote.content}</div>

                <div className="mt-4 pt-3 border-t text-xs text-muted-foreground space-y-1">
                    <div>{selectedNote.userEmail}</div>
                    {selectedNote.socialUrl && (
                        <a
                            href={selectedNote.socialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block hover:underline"
                        >
                            {selectedNote.socialUrl}
                        </a>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
