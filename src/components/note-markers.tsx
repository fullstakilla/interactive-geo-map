"use client";

import { Note } from "@prisma/client";
import { Marker } from "react-simple-maps";
import { memo } from "react";
import { useNoteDialog } from "@/providers/note-dialog-context";

export const NoteMarkers = memo(function NoteMarkers({
    notes,
}: {
    notes: Note[];
}) {
    const { openDialog } = useNoteDialog();

    return (
        <>
            {notes.map((note) => (
                <Marker
                    key={note.id}
                    coordinates={note.userLocation as [number, number]}
                    onClick={() => openDialog(note)}
                >
                    <g
                        style={{ cursor: "pointer" }}
                        className="transition-transform hover:scale-125"
                    >
                        <circle
                            r={2}
                            fill="#10B981"
                            stroke="#FFF"
                            strokeWidth={0.5}
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
            ))}
        </>
    );
});
