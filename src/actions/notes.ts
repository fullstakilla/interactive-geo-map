"use server";

import prisma from "@/lib/prisma";
import { Note } from "@prisma/client";
import { getServerSession } from "next-auth";

type CreateNoteInput = {
    userLocation: [number, number];
    userEmail: string;
    content: string;
    userName: string;
    socialUrl?: string | undefined;
};

export async function createNote(data: CreateNoteInput) {
    try {
        if (!data.userName || data.userName === "") {
            throw new Error("Unauthorized");
        }

        const existingNote = await prisma.note.findFirst({
            where: {
                userEmail: data.userEmail,
            },
        });

        if (existingNote) {
            return {
                success: false,
                error: "You have already created a note. Only one note per user is allowed.",
            };
        }

        const note = await prisma.note.create({
            data: {
                content: data.content,
                userName: data.userName,
                socialUrl: data.socialUrl,
                userLocation: data.userLocation,
                userEmail: data.userEmail,
            },
        });

        return { success: true, data: note };
    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                error: error.message,
            };
        }

        return {
            success: false,
            error: "Something went wrong",
        };
    }
}

interface GetNotesResponse {
    success: boolean;
    data?: Note[];
    error?: string;
}

export async function getNotes(): Promise<GetNotesResponse> {
    try {
        const notes = await prisma.note.findMany();

        return {
            success: true,
            data: notes,
        };
    } catch (error) {
        console.error("Error fetching notes:", error);
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "Failed to fetch notes",
        };
    }
}

interface DeleteNoteResponse {
    success: boolean;
    error?: string;
}

export async function deleteNote(noteId: string): Promise<DeleteNoteResponse> {
    try {
        const session = await getServerSession();

        if (!session?.user?.email) {
            return {
                success: false,
                error: "Unauthorized",
            };
        }

        const note = await prisma.note.findUnique({
            where: { id: noteId },
        });

        if (!note) {
            return {
                success: false,
                error: "Note not found",
            };
        }

        if (note.userEmail !== session.user.email) {
            return {
                success: false,
                error: "You can only delete your own notes",
            };
        }

        await prisma.note.delete({
            where: { id: noteId },
        });

        return { success: true };
    } catch (error) {
        console.error("Error deleting note:", error);
        return {
            success: false,
            error: "Failed to delete note",
        };
    }
}
