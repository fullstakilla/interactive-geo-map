import { create } from "zustand";
import { toast } from "sonner";
import { getGeoData } from "@/actions/geoData";
import { Country } from "@/types/TopoJSON";

interface GeoDataState {
    data: any | null;
    countries: Country[];
    isLoading: boolean;
    error: string | null;
    fetchGeoData: () => Promise<void>;
}

const CACHE_KEY = "world-map-data";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export const useGeoDataStore = create<GeoDataState>((set) => ({
    data: null,
    countries: [],
    isLoading: false,
    error: null,

    fetchGeoData: async () => {
        try {
            set({ isLoading: true });

            const cached = localStorage.getItem(CACHE_KEY);
            if (cached) {
                const { data, timestamp, countries } = JSON.parse(cached);
                if (Date.now() - timestamp < CACHE_DURATION) {
                    set({
                        data,
                        countries,
                        error: null,
                    });
                    return;
                }
            }

            const data = await getGeoData();

            const countries = data?.objects?.countries?.geometries
                ? data.objects.countries.geometries.map((geometry: any) => ({
                      name: geometry.properties.name,
                      coordinates: geometry.arcs || [0, 0],
                  }))
                : [];

            // Cache the fresh data with countries
            localStorage.setItem(
                CACHE_KEY,
                JSON.stringify({
                    data,
                    countries,
                    timestamp: Date.now(),
                })
            );

            set({
                data,
                countries,
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
