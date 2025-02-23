"use client";

import {
    ComposableMap,
    Geographies,
    ProjectionConfig,
    ZoomableGroup,
} from "react-simple-maps";
import worldData from "@/data/world-110m.json";
import { GeographyItem } from "./geography-item";
import NoteMarkers from "./note-markers";

const projectionConfig: ProjectionConfig = {
    scale: 150,
    center: [0, 0],
};

export const WorldMap: React.FC = () => {
    console.log("world-map render");

    return (
        <ComposableMap
            projection="geoMercator"
            projectionConfig={projectionConfig}
            className="w-screen h-screen bg-[#a4d9eb]"
        >
            <ZoomableGroup center={[0, 0]} zoom={1} height="100%" maxZoom={15}>
                <Geographies geography={worldData}>
                    {({ geographies }) =>
                        geographies.map((geo, i) => {
                            if (geo.properties.continent === "Antarctica")
                                return null;
                            return <GeographyItem key={i} geo={geo} />;
                        })
                    }
                </Geographies>

                <NoteMarkers />
            </ZoomableGroup>
        </ComposableMap>
    );
};
