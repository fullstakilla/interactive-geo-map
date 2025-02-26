import { Note } from "@prisma/client";
import { useMemo } from "react";
import Supercluster from "supercluster";

interface Cluster {
    coordinates: [number, number];
    notes: Note[];
    id: number;
    properties: {
        cluster: boolean;
        cluster_id: number;
        point_count: number;
    };
}

interface ClusterizationOptions {
    radius?: number;
    minZoom?: number;
    maxZoom?: number;
}

// Функция для проверки валидности координат
function isValidCoordinate(coord: any): coord is [number, number] {
    return (
        Array.isArray(coord) &&
        coord.length === 2 &&
        typeof coord[0] === "number" &&
        typeof coord[1] === "number" &&
        !isNaN(coord[0]) &&
        !isNaN(coord[1]) &&
        coord[0] >= -180 &&
        coord[0] <= 180 &&
        coord[1] >= -85 &&
        coord[1] <= 85
    );
}

export function useClusterization(
    notes: Note[],
    zoom: number,
    options: ClusterizationOptions = {}
) {
    const { radius = 75, minZoom = 1, maxZoom = 5 } = options;

    return useMemo(() => {
        if (!notes.length) return [];

        try {
            // Настраиваем Supercluster с измененными параметрами
            const index = new Supercluster({
                radius: radius,
                maxZoom: maxZoom,
                minZoom: minZoom,
                extent: 256,
                nodeSize: 64,
            });

            // Преобразуем заметки в GeoJSON Features
            const features = notes.map((note) => ({
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [
                        (note.userLocation as number[])[0],
                        (note.userLocation as number[])[1],
                    ],
                },
                properties: {
                    noteId: note.id,
                    note: note,
                },
            }));

            // Загружаем features
            index.load(features as any);

            // Получаем кластеры с учетом текущего зума
            const currentZoom = Math.floor(zoom);
            const clusters = index.getClusters(
                [-180, -85, 180, 85],
                currentZoom
            );

            console.log(
                `Zoom: ${currentZoom}, Total clusters: ${clusters.length}, Original points: ${notes.length}`
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
            return notes.map((note) => ({
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
    }, [notes, zoom, radius, minZoom, maxZoom]);
}

// import { Note } from "@prisma/client";
// import { useMemo } from "react";

// interface Cluster {
//     coordinates: [number, number];
//     notes: Note[];
// }

// interface ClusterizationOptions {
//     maxClusterDistance?: number;
//     minZoom?: number;
//     maxZoom?: number;
// }

// export function useClusterization(
//     notes: Note[],
//     zoom: number,
//     options: ClusterizationOptions = {}
// ) {
//     const { maxClusterDistance = 20, minZoom = 1, maxZoom = 4 } = options;

//     return useMemo(() => {
//         if (!notes.length) return [];

//         const clusterDistance = Math.max(
//             maxClusterDistance * (1 - (zoom - minZoom) / (maxZoom - minZoom)),
//             0.5
//         );

//         if (zoom >= maxZoom) {
//             return notes.map((note) => ({
//                 coordinates: note.userLocation as [number, number],
//                 notes: [note],
//             }));
//         }

//         const clustersMap = new Map<string, Cluster>();

//         notes.forEach((note) => {
//             const [lng, lat] = note.userLocation as [number, number];
//             const gridSize = clusterDistance;
//             const gridX = Math.floor(lng / gridSize);
//             const gridY = Math.floor(lat / gridSize);
//             const key = `${gridX}:${gridY}`;

//             if (!clustersMap.has(key)) {
//                 let shouldCreateNewCluster = true;

//                 for (const existingCluster of Array.from(
//                     clustersMap.values()
//                 )) {
//                     const [existingLng, existingLat] =
//                         existingCluster.coordinates;
//                     const distance = Math.sqrt(
//                         Math.pow(existingLng - lng, 2) +
//                             Math.pow(existingLat - lat, 2)
//                     );

//                     if (distance > maxClusterDistance) {
//                         continue;
//                     }

//                     existingCluster.notes.push(note);

//                     const newCenter: [number, number] = [
//                         (existingCluster.coordinates[0] *
//                             existingCluster.notes.length +
//                             lng) /
//                             (existingCluster.notes.length + 1),
//                         (existingCluster.coordinates[1] *
//                             existingCluster.notes.length +
//                             lat) /
//                             (existingCluster.notes.length + 1),
//                     ];
//                     existingCluster.coordinates = newCenter;

//                     shouldCreateNewCluster = false;
//                     break;
//                 }

//                 if (shouldCreateNewCluster) {
//                     clustersMap.set(key, {
//                         coordinates: [lng, lat],
//                         notes: [note],
//                     });
//                 }
//             } else {
//                 const cluster = clustersMap.get(key)!;
//                 cluster.notes.push(note);

//                 const sumCoords = cluster.notes.reduce(
//                     (acc, n) => {
//                         const [noteLng, noteLat] = n.userLocation as [
//                             number,
//                             number
//                         ];
//                         return [acc[0] + noteLng, acc[1] + noteLat];
//                     },
//                     [0, 0]
//                 );

//                 cluster.coordinates = [
//                     sumCoords[0] / cluster.notes.length,
//                     sumCoords[1] / cluster.notes.length,
//                 ];
//             }
//         });

//         return Array.from(clustersMap.values());
//     }, [notes, zoom, maxClusterDistance, minZoom, maxZoom]);
// }
