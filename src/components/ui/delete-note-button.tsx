import { Trash2 } from "lucide-react";
import { Button } from "./button";
import { deleteNote } from "@/actions/notes";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";

interface DeleteNoteButtonProps {
    noteId: string;
    className?: string;
    ownerEmail: string;
    onSubmit: () => void;
}

export default function DeleteNoteButton({
    noteId,
    className,
    ownerEmail,
    onSubmit,
}: DeleteNoteButtonProps) {
    const { data: session } = useSession();
    const { t } = useAppSettingsStore();

    if (!session || !session.user || session.user.email !== ownerEmail)
        return null;

    const handleDelete = async () => {
        const result = await deleteNote(noteId);
        if (result.success) {
            toast.success(t("note.delete.success"));
            onSubmit();
        } else {
            toast.error(t("note.delete.error"));
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
