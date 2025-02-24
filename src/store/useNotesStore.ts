import { create } from "zustand";
import { Note } from "@prisma/client";
import { getNotes } from "@/actions/notes";
import { toast } from "sonner";

interface NotesState {
    notes: Note[];
    isLoading: boolean;
    error: string | null;
    fetchNotes: () => Promise<void>;
}

export const useNotesStore = create<NotesState>((set, get) => ({
    notes: [],
    isLoading: false,
    error: null,

    fetchNotes: async () => {
        try {
            set({ isLoading: true });
            const result = await getNotes();

            if (!result.success) {
                throw new Error(result.error);
            }

            set({
                notes: result.data!,
                error: null,
            });
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : "An error occurred";
            set({ error: errorMessage });
            toast.error("Failed to fetch notes");
        } finally {
            set({ isLoading: false });
        }
    },
}));
