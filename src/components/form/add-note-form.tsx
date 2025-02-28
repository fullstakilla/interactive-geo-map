import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { createNote } from "@/actions/notes";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useEffect, useRef, useState } from "react";
import { getCurrentLocation } from "@/actions/location";
import { useSession } from "next-auth/react";
import { useNotesStore } from "@/store/useNotesStore";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";

export const noteSchema = z.object({
    userName: z.string().min(1, "Name is required"),
    content: z.string().min(1, "Message is required"),
    socialUrl: z
        .string()
        .optional()
        .refine((url) => {
            if (!url) return true;
            const patterns = [
                /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/.+/,
                /^https?:\/\/(www\.)?twitter\.com\/.+/,
                /^https?:\/\/(www\.)?instagram\.com\/.+/,
            ];
            return patterns.some((pattern) => pattern.test(url));
        }, "Only YouTube, Twitter, or Instagram URLs are allowed"),
});

type FormData = z.infer<typeof noteSchema>;

interface AddNoteFormProps {
    userName: string;
    userEmail: string;
}

export function AddNoteForm({ userName, userEmail }: AddNoteFormProps) {
    const [open, setOpen] = useState<boolean>(false);
    const { data: session } = useSession();
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const fetchNotes = useNotesStore((state) => state.fetchNotes);
    const { t } = useAppSettingsStore();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(noteSchema),
        defaultValues: {
            userName: session?.user?.name || "",
            socialUrl: "https://instagram.com/...",
        },
    });

    const onSubmit = async (data: FormData) => {
        const submitToast = toast.loading(t("note.create.loading"));

        try {
            const locationResult = await getCurrentLocation();
            if (!locationResult.success) {
                toast.dismiss(submitToast);
                return;
            }

            const coordinates = locationResult.coordinates ?? null;

            const result = await createNote({
                ...data,
                userLocation: coordinates!,
                userEmail: userEmail,
            });

            if (!result.success) {
                toast.dismiss(submitToast);
                toast.error(result.error || "Failed to create note");
                return;
            }

            fetchNotes();

            toast.dismiss(submitToast);
            toast.success(t("note.create.success"));

            closeButtonRef.current?.click();
            reset();
        } catch (error) {
            toast.dismiss(submitToast);
            toast.error(t("note.create.error"));
        }
    };

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (
                (e.key === "a" ||
                    e.key === "A" ||
                    e.key === "ф" ||
                    e.key === "Ф") &&
                (e.metaKey || e.ctrlKey)
            ) {
                e.preventDefault();
                e.stopPropagation();
                setOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down, true);
        return () => document.removeEventListener("keydown", down, true);
    }, []);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="gap-2 p-5"
                    onClick={() => setOpen(true)}
                >
                    <span>➕</span>
                    <span className="hidden md:inline">
                        {t("note.create.title")}
                    </span>
                    <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
                        <span className="text-xs">⌘</span>
                        {t("commandCombo.add")}
                    </kbd>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{t("note.create.title")}</DialogTitle>
                    <DialogDescription>
                        {t("note.create.description")}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        label={t("note.create.name")}
                        description={t("note.create.nameDescription")}
                        error={errors.userName?.message}
                    >
                        <Input
                            {...register("userName")}
                            className="w-full p-2 border rounded bg-gray-50 cursor-not-allowed"
                            placeholder="Your name"
                            defaultValue={userName || ""}
                            disabled
                        />
                    </FormField>

                    <FormField
                        label={t("note.create.message")}
                        description={t("note.create.messageDescription")}
                        error={errors.content?.message}
                    >
                        <Textarea
                            {...register("content")}
                            className="w-full min-h-[100px] p-2 border rounded"
                            placeholder={t("note.create.messagePlaceholder")}
                            rows={4}
                        />
                    </FormField>

                    <FormField
                        label={t("note.create.social")}
                        description={t("note.create.socialDescription")}
                        error={errors.socialUrl?.message}
                    >
                        <Input
                            {...register("socialUrl")}
                            className="w-full p-2 border rounded"
                            placeholder="https://instagram.com/..."
                        />
                    </FormField>

                    <Button type="submit" className="w-full">
                        {t("note.create.submit")}
                    </Button>
                </form>
                <DialogClose ref={closeButtonRef} className="hidden" />
            </DialogContent>
        </Dialog>
    );
}
