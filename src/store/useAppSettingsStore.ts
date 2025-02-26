import { create } from "zustand";

type ProjectionType = "geoMercator" | "geoOrthographic";

interface AppSettings {
    projection: ProjectionType;
    setProjection: (projection: ProjectionType) => void;
}

export const useAppSettingsStore = create<AppSettings>((set) => ({
    projection: "geoMercator",
    setProjection: (projection) => set({ projection }),
}));
