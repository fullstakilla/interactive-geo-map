import { useMapZoomStore } from "@/store/useMapZoomStore";
import { Note } from "@prisma/client";
import { useMemo } from "react";
import Supercluster from "supercluster";

interface ClusterizationOptions {
    radius?: number;
    minZoom?: number;
    maxZoom?: number;
}

function isValidLocation(location: any): location is [number, number] {
    return (
        Array.isArray(location) &&
        location.length === 2 &&
        typeof location[0] === "number" &&
        typeof location[1] === "number" &&
        !isNaN(location[0]) &&
        !isNaN(location[1])
    );
}

export function useClusterization(
    notes: Note[],
    zoom: number,
    options: ClusterizationOptions = {}
) {
    const bounds = useMapZoomStore((state) => state.bounds);
    const { radius, minZoom, maxZoom } = options;

    return useMemo(() => {
        if (!notes.length) return [];

        try {
            const index = new Supercluster({
                radius: radius,
                maxZoom: maxZoom,
                minZoom: minZoom,
                extent: 256,
                nodeSize: 64,
            });

            const currentZoom = Math.floor(zoom);
            const isLowZoom = currentZoom <= 2;

            const visibleNotes = isLowZoom
                ? notes.filter((note) => isValidLocation(note.userLocation))
                : notes.filter((note) => {
                      if (!isValidLocation(note.userLocation)) return false;

                      const [lng, lat] = note.userLocation;
                      const padding = isLowZoom ? 50 : 10;

                      const [minLng, maxLng] = isLowZoom
                          ? [-180, 180]
                          : [
                                Math.min(bounds[0][0], bounds[1][0]) - padding,
                                Math.max(bounds[0][0], bounds[1][0]) + padding,
                            ];

                      const [minLat, maxLat] = isLowZoom
                          ? [-85, 85]
                          : [
                                Math.min(bounds[0][1], bounds[1][1]) - padding,
                                Math.max(bounds[0][1], bounds[1][1]) + padding,
                            ];

                      return (
                          lng >= minLng &&
                          lng <= maxLng &&
                          lat >= minLat &&
                          lat <= maxLat
                      );
                  });

            const features = visibleNotes.map((note) => ({
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: note.userLocation as [number, number],
                },
                properties: {
                    noteId: note.id,
                    note: note,
                },
            }));

            index.load(features as any);

            const clusterBounds = isLowZoom
                ? [-180, -85, 180, 85]
                : [
                      Math.min(bounds[0][0], bounds[1][0]),
                      Math.min(bounds[0][1], bounds[1][1]),
                      Math.max(bounds[0][0], bounds[1][0]),
                      Math.max(bounds[0][1], bounds[1][1]),
                  ];

            const clusters = index.getClusters(
                clusterBounds as any,
                currentZoom
            );

            return clusters.map((cluster) => {
                if (cluster.properties.cluster) {
                    const leaves = index.getLeaves(
                        cluster.properties.cluster_id,
                        Infinity
                    );

                    return {
                        coordinates: cluster.geometry.coordinates as [
                            number,
                            number
                        ],
                        notes: leaves.map((leaf) => leaf.properties.note),
                        id: cluster.properties.cluster_id,
                        properties: {
                            cluster: true,
                            cluster_id: cluster.properties.cluster_id,
                            point_count: cluster.properties.point_count,
                        },
                    };
                } else {
                    return {
                        coordinates: cluster.geometry.coordinates as [
                            number,
                            number
                        ],
                        notes: [cluster.properties.note],
                        id: cluster.properties.noteId,
                        properties: {
                            cluster: false,
                            cluster_id: -1,
                            point_count: 1,
                        },
                    };
                }
            });
        } catch (error) {
            console.error("Clustering error:", error);

            const isLowZoom = Math.floor(zoom) <= 2;
            return (
                isLowZoom
                    ? notes
                    : notes.filter((note) => {
                          if (!isValidLocation(note.userLocation)) return false;
                          const [lng, lat] = note.userLocation;
                          return (
                              lng >= bounds[0][0] - 10 &&
                              lng <= bounds[1][0] + 10 &&
                              lat >= bounds[0][1] - 10 &&
                              lat <= bounds[1][1] + 10
                          );
                      })
            ).map((note) => ({
                coordinates: note.userLocation as [number, number],
                notes: [note],
                id: note.id,
                properties: {
                    cluster: false,
                    cluster_id: -1,
                    point_count: 1,
                },
            }));
        }
    }, [notes, zoom, radius, minZoom, maxZoom, bounds]);
}
