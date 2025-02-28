import { Button } from "./button";
import { MapPin } from "lucide-react";
import { useMapZoomStore } from "@/store/useMapZoomStore";
import { useNotesStore } from "@/store/useNotesStore";
import { useSession } from "next-auth/react";

export function MyLocationButton() {
    const { data: session } = useSession();
    const { setPosition } = useMapZoomStore();
    const notes = useNotesStore((state) => state.notes);

    if (!session) return null;

    const myNote = notes.find((note) => note.userEmail === session.user!.email);
    if (!myNote) return null;

    const handleClick = () => {
        const [lng, lat] = myNote.userLocation as [number, number];
        const padding = 40;

        setPosition(6, myNote.userLocation as [number, number], [
            [lng - padding, lat - padding],
            [lng + padding, lat + padding],
        ]);
    };

    return (
        <div className="absolute top-5 left-5 z-10">
            <Button
                variant="default"
                size="icon"
                onClick={handleClick}
                className="bg-white hover:bg-white/90 text-black shadow-lg"
            >
                <MapPin className="h-4 w-4" />
            </Button>
        </div>
    );
}
