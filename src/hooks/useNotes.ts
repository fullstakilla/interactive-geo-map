import { useState, useEffect } from "react";
import { Note } from "@prisma/client";
import { getNotes } from "@/actions/notes";
import { toast } from "sonner";

export function useNotes() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [updateTrigger, setUpdateTrigger] = useState(0);

    const fetchNotes = async () => {
        try {
            setIsLoading(true);
            const result = await getNotes();

            if (!result.success) {
                throw new Error(result.error);
            }

            setNotes([...result.data!]);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
            toast.error("Failed to fetch notes");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchNotes();
        const interval = setInterval(fetchNotes, 5000);

        return () => clearInterval(interval);
    }, [updateTrigger]);

    // Функция для ручного обновления списка
    const mutateNotes = (mutator: (currentNotes: Note[]) => Note[]) => {
        setNotes((currentNotes) => mutator(currentNotes));
    };

    return {
        notes,
        isLoading,
        error,
        refetch: () => setUpdateTrigger((prev) => prev + 1),
        mutateNotes, // Экспортируем функцию мутации
    };
}
