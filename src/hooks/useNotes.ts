import { useNotesStore } from "@/store/notes";
import { useEffect } from "react";

export function useNotes() {
    const { notes, isLoading, error, fetchNotes } = useNotesStore();

    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    return {
        notes,
        isLoading,
        error,
        refetch: fetchNotes,
    };
}
