import { useNotesStore } from "@/store/useNotesStore";
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
