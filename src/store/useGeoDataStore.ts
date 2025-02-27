import { create } from "zustand";
import { toast } from "sonner";
import { getGeoData } from "@/actions/geo-data";
import { GeoJSONFeature, TopoJSON } from "@/types/geo";

interface GeoDataState {
    data: TopoJSON | null;
    geoJSONData: GeoJSONFeature[];
    pickedCountry: string | null;
    isLoading: boolean;
    error: string | null;
    fetchGeoData: () => Promise<void>;
    setPickedCountry: (name: string | null) => void;
    setGeoJSONData: (data: GeoJSONFeature[]) => void;
}

const CACHE_KEY = "world-map-data";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export const useGeoDataStore = create<GeoDataState>((set) => ({
    data: null,

    geoJSONData: [],
    setGeoJSONData: (data: GeoJSONFeature[]) => set({ geoJSONData: data }),

    pickedCountry: null,
    setPickedCountry: (value: string | null) => {
        set({ pickedCountry: value });
    },

    isLoading: false,
    error: null,
    fetchGeoData: async () => {
        try {
            set({ isLoading: true });

            const cached = localStorage.getItem(CACHE_KEY);
            if (cached) {
                const { data, timestamp } = JSON.parse(cached);
                if (Date.now() - timestamp < CACHE_DURATION) {
                    set({
                        data,
                        error: null,
                    });
                    return;
                }
            }

            const data = await getGeoData();

            localStorage.setItem(
                CACHE_KEY,
                JSON.stringify({
                    data,
                    timestamp: Date.now(),
                })
            );

            set({
                data,
                error: null,
            });
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : "Failed to load map data";
            set({ error: errorMessage });
            toast.error("Failed to load map data");
        } finally {
            set({ isLoading: false });
        }
    },
}));
