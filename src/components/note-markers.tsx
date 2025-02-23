import { Marker } from "react-simple-maps";
import { useNotes } from "@/hooks/useNotes";
import { DialogClose, DialogDescription, DialogTitle } from "./ui/dialog";
import {
    Dialog,
    DialogHeader,
    DialogContent,
    DialogTrigger,
} from "./ui/dialog";
import DeleteNoteButton from "./ui/delete-note-button";

export default function NoteMarkers() {
    const { notes, isLoading, error, refetch } = useNotes();

    if (isLoading || error !== null || notes.length === 0) return null;

    console.log("note markers render", notes);

    return (
        <>
            {notes.map((note) => (
                <Dialog key={note.id}>
                    <DialogTrigger asChild>
                        <Marker
                            coordinates={note.userLocation as [number, number]}
                        >
                            <g
                                style={{ cursor: "pointer" }}
                                className="transition-transform hover:scale-125"
                            >
                                <circle
                                    r={2}
                                    fill="#10B981"
                                    stroke="#FFF"
                                    strokeWidth={1}
                                />

                                <text
                                    textAnchor="middle"
                                    y={-8}
                                    style={{
                                        fontSize: "8px",
                                        fill: "#10B981",
                                        fontWeight: "500",
                                        opacity: 0,
                                    }}
                                    className="pointer-events-none select-none transition-opacity group-hover:opacity-100"
                                >
                                    {note.userName}
                                </text>
                            </g>
                        </Marker>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>{note.userName}</DialogTitle>
                            <DialogDescription />
                        </DialogHeader>

                        <div className="text-base">{note.content}</div>

                        <div className="mt-4 pt-3 border-t text-xs text-muted-foreground space-y-1">
                            <div>{note.userEmail}</div>
                            {note.socialUrl && (
                                <a
                                    href={note.socialUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block hover:underline"
                                >
                                    {note.socialUrl}
                                </a>
                            )}
                        </div>

                        <DialogClose asChild>
                            <DeleteNoteButton
                                noteId={note.id}
                                ownerEmail={note.userEmail}
                                onSubmit={refetch}
                                className="absolute -right-11"
                            />
                        </DialogClose>
                    </DialogContent>
                </Dialog>
            ))}
        </>
    );
}
