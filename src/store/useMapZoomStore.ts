import { geoMercator, geoPath } from "d3-geo";
import { create } from "zustand";

interface MapZoomState {
    zoom: number;
    center: [number, number];
    setPosition: (zoom: number, center: [number, number]) => void;
    zoomToGeography: (geography: any) => void;
    zoomToCluster: (coordinates: [number, number]) => void;
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
    setPosition: (zoom: number, center: [number, number]) =>
        set({ zoom, center }),
    zoomToGeography: (geography) => {
        const projectionInstance = projection();
        if (!projectionInstance) return;

        const path = geoPath().projection(projectionInstance);
        const pathCentroid = path.centroid(geography);
        const centroid = projectionInstance?.invert?.(pathCentroid) ?? [15, 38];

        set({
            center: centroid || [15, 38],
            zoom: 5,
        });
    },
    zoomToCluster: (coordinates: [number, number]) => {
        set((state) => ({
            center: coordinates,
            zoom: state.zoom + 2,
        }));
    },
}));
