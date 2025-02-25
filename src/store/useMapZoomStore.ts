import { geoMercator, geoPath } from "d3-geo";
import { create } from "zustand";

interface MapZoomState {
    zoom: number;
    center: [number, number];
    isZooming: boolean;
    setZoom: (zoom: number) => void;
    setCenter: (center: [number, number]) => void;
    zoomToGeography: (geography: any) => void;
}

export const projection = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    return geoMercator()
        .translate([width / 2, height / 2])
        .scale(160);
};

export const useMapZoomStore = create<MapZoomState>((set) => ({
    zoom: 1,
    center: [15, 38],
    isZooming: false,
    setZoom: (zoom: number) => set({ zoom }),
    setCenter: (center: [number, number]) => set({ center }),
    zoomToGeography: (geography) => {
        const projectionInstance = projection();
        if (!projectionInstance) return;

        const path = geoPath().projection(projectionInstance);
        const pathCentroid = path.centroid(geography);
        const centroid = projectionInstance?.invert?.(pathCentroid) ?? [15, 38];

        set({ isZooming: true });

        set({
            center: centroid || [15, 38],
            zoom: 3,
        });

        setTimeout(() => {
            set({ isZooming: false });
        }, 200);
    },
}));
