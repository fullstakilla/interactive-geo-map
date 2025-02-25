export interface TopoJSON {
    type: "Topology";
    objects: {
        countries: {
            type: "GeometryCollection";
            geometries: Array<{
                type: "Polygon" | "MultiPolygon";
                arcs: number[][] | number[][][];
                id: string;
                properties: {
                    name: string;
                    [key: string]: any;
                };
            }>;
        };
        [key: string]: any;
    };
    arcs: Array<Array<[number, number]>>;
    transform?: {
        scale: [number, number];
        translate: [number, number];
    };
    bbox?: [number, number, number, number];
}

export interface GeoJSONFeature {
    type: "Feature";
    geometry: {
        type: string;
        coordinates: number[][][] | number[][][][];
    };
    properties: {
        name: string;
        [key: string]: any;
    };
    id: string;
    rsmKey: string;
    svgPath: string | null;
}
