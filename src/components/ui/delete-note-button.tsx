import { useNoteDialog } from "@/providers/note-dialog-context";
import { Trash2 } from "lucide-react";
import { Button } from "./button";
import { deleteNote } from "@/actions/notes";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useNotes } from "@/hooks/useNotes";

interface DeleteNoteButtonProps {
    noteId: string;
    className?: string;
    ownerEmail: string;
}

export default function DeleteNoteButton({
    noteId,
    className,
    ownerEmail,
}: DeleteNoteButtonProps) {
    const { data: session } = useSession();
    const { closeDialog } = useNoteDialog();
    const { mutateNotes } = useNotes();

    if (!session || !session.user || session.user.email !== ownerEmail)
        return null;

    const handleDelete = async () => {
        const result = await deleteNote(noteId);
        if (result.success) {
            mutateNotes((currentNotes) =>
                currentNotes.filter((note) => note.id !== noteId)
            );
            toast.success("Deleting from the map...");
            closeDialog();
        } else {
            toast.error(result.error || "Failed to delete note");
        }
    };

    return (
        <Button
            variant="destructive"
            size="icon"
            onClick={handleDelete}
            className={cn("flex items-center justify-center", className)}
        >
            <Trash2 />
        </Button>
    );
}
