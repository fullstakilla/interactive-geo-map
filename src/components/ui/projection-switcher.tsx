import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { Globe2, Map } from "lucide-react";
import { Switch } from "./switch";

export function ProjectionSwitcher() {
    const { projection, setProjection } = useAppSettingsStore();

    return (
        <div className="absolute bottom-5 right-5 z-10 bg-white rounded-lg shadow-lg p-3">
            <div className="flex items-center gap-2">
                <Map className="h-4 w-4 text-muted-foreground" />
                <Switch
                    checked={projection === "geoOrthographic"}
                    onCheckedChange={(checked) =>
                        setProjection(
                            checked ? "geoOrthographic" : "geoMercator"
                        )
                    }
                    id="projection-mode"
                />
                <Globe2 className="h-4 w-4 text-muted-foreground" />
            </div>
        </div>
    );
}
