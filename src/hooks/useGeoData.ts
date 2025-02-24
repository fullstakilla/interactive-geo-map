import { useGeoDataStore } from "@/store/useGeoDataStore";
import { useEffect } from "react";

export function useGeoData() {
    const {
        data: geoData,
        isLoading,
        error,
        fetchGeoData,
        countries,
    } = useGeoDataStore();

    useEffect(() => {
        fetchGeoData();
    }, []);

    return {
        geoData,
        countries,
        isLoading,
        error,
        refetch: fetchGeoData,
    };
}
