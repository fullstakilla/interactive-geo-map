import { Marker } from "react-simple-maps";
import { DialogClose, DialogDescription, DialogTitle } from "./ui/dialog";
import {
    Dialog,
    DialogHeader,
    DialogContent,
    DialogTrigger,
} from "./ui/dialog";
import DeleteNoteButton from "./ui/delete-note-button";
import { useNotesStore } from "@/store/useNotesStore";
import { useMapZoomStore } from "@/store/useMapZoomStore";
import { useEffect, useMemo } from "react";
import { Note } from "@prisma/client";
import { useClusterization } from "@/hooks/useClusterization";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

interface Cluster {
    coordinates: [number, number];
    notes: Note[];
}

export default function NoteMarkers() {
    const { data: session } = useSession();
    const notes = useNotesStore((state) => state.notes);
    const isLoading = useNotesStore((state) => state.isLoading);
    const error = useNotesStore((state) => state.error);
    const fetchNotes = useNotesStore((state) => state.fetchNotes);
    const { zoom, zoomToCluster } = useMapZoomStore();

    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    const clusters = useClusterization(notes, zoom, {
        radius: 60,
        minZoom: 2,
        maxZoom: 5,
    });

    if (isLoading || error !== null || notes.length === 0) return null;

    console.log("clusters:", clusters.length, "notes total:", notes.length);

    return (
        <>
            {clusters.map((cluster, i) => {
                if (cluster.notes.length === 1) {
                    const note = cluster.notes[0];
                    const isMyNote = session?.user?.email === note.userEmail;

                    return (
                        <Dialog key={note.id}>
                            <DialogTrigger asChild>
                                <Marker
                                    coordinates={
                                        note.userLocation as [number, number]
                                    }
                                >
                                    <g
                                        style={{ cursor: "pointer" }}
                                        className="transition-transform hover:scale-125"
                                    >
                                        <circle
                                            r={isMyNote ? 4 : 2}
                                            fill={
                                                isMyNote ? "#FF4444" : "#10B981"
                                            }
                                            stroke="#FFF"
                                            strokeWidth={isMyNote ? 2 : 1}
                                        />
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
                                        onSubmit={fetchNotes}
                                        className="absolute -right-11"
                                    />
                                </DialogClose>
                            </DialogContent>
                        </Dialog>
                    );
                } else {
                    return (
                        <Marker
                            key={cluster.coordinates[0]}
                            coordinates={cluster.coordinates}
                            onClick={() => zoomToCluster(cluster.coordinates)}
                        >
                            <g
                                style={{ cursor: "pointer" }}
                                className="transition-transform hover:scale-125"
                            >
                                <circle
                                    r={Math.min(
                                        Math.max(cluster.notes.length * 1.5, 8),
                                        15
                                    )}
                                    fill="#10B981"
                                    fillOpacity={0.7}
                                    stroke="#FFF"
                                    strokeWidth={2}
                                />
                                <text
                                    textAnchor="middle"
                                    dy=".3em"
                                    style={{
                                        fontSize: "11px",
                                        fill: "#FFF",
                                        fontWeight: "bold",
                                    }}
                                    className="pointer-events-none select-none"
                                >
                                    {cluster.notes.length}
                                </text>
                            </g>
                        </Marker>
                    );
                }
            })}
        </>
    );
}
