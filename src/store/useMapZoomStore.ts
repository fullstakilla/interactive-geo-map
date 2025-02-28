import { geoMercator, geoPath } from "d3-geo";
import { create } from "zustand";

interface MapZoomState {
    zoom: number;
    center: [number, number];
    bounds: [[number, number], [number, number]];
    setPosition: (
        zoom: number,
        center: [number, number],
        bounds: [[number, number], [number, number]]
    ) => void;
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
    bounds: [
        [-180, -85],
        [180, 85],
    ],
    setPosition: (
        zoom: number,
        center: [number, number],
        bounds: [[number, number], [number, number]]
    ) => set({ zoom, center, bounds }),
    zoomToGeography: (geography) => {
        const projectionInstance = projection();
        if (!projectionInstance || !projectionInstance.invert) return;

        const path = geoPath().projection(projectionInstance);
        const bounds = path.bounds(geography);
        const pathCentroid = path.centroid(geography);
        const centroid = projectionInstance.invert(pathCentroid) ?? [15, 38];

        const [[x0, y0], [x1, y1]] = bounds;
        const geoBounds: [[number, number], [number, number]] = [
            projectionInstance.invert([x0, y0]) as [number, number],
            projectionInstance.invert([x1, y1]) as [number, number],
        ];

        set({
            center: centroid as [number, number],
            zoom: 6,
            bounds: geoBounds,
        });
    },
    zoomToCluster: (coordinates: [number, number]) => {
        set((state) => ({
            center: coordinates,
            zoom: state.zoom + 2,
        }));
    },
}));
