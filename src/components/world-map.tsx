import React from "react";
import {
    ComposableMap,
    Geographies,
    ProjectionConfig,
} from "react-simple-maps";
import worldData from "@/data/world-110m.json";
import { GeographyItem } from "./geography-item";

const projection: ProjectionConfig = {
    scale: 80,
    center: [0, 0],
};

interface WorldMapProps {
    transform: {
        scale: number;
        translateX: number;
        translateY: number;
    };
}

export const WorldMap: React.FC<WorldMapProps> = ({ transform }) => {
    return (
        <ComposableMap
            projection="geoMercator"
            projectionConfig={projection}
            className="w-full h-full outline-none focus:outline-none"
            style={{
                background: "transparent",
                transform: `translate(${transform.translateX}px, ${transform.translateY}px) scale(${transform.scale})`,
                transformOrigin: "center center",
                cursor: "grab",
            }}
        >
            <Geographies geography={worldData} stroke="none">
                {({ geographies }) =>
                    geographies.map((geo, i) => {
                        // вода + антарктида
                        if (geo.properties.continent === "Antarctica")
                            return null;

                        return <GeographyItem key={i} geo={geo} />;
                    })
                }
            </Geographies>
        </ComposableMap>
    );
};
