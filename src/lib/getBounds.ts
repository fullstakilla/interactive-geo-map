import { geoMercator } from "d3-geo";

export function getBounds(
    coordinates: [number, number],
    zoom: number
): [[number, number], [number, number]] {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const projectionInstance = geoMercator()
        .scale(160 * zoom)
        .translate([width / 2, height / 2])
        .center(coordinates);

    let bounds: [[number, number], [number, number]] = [
        [-180, -85],
        [180, 85],
    ];

    try {
        const bottomLeft = projectionInstance.invert?.([0, height]);
        const topRight = projectionInstance.invert?.([width, 0]);

        if (bottomLeft && topRight) {
            bounds = [
                [Math.max(-180, bottomLeft[0]), Math.max(-85, bottomLeft[1])],
                [Math.min(180, topRight[0]), Math.min(85, topRight[1])],
            ];
        }
    } catch (error) {
        console.warn("Failed to calculate bounds, using defaults");
    }

    return bounds;
}
