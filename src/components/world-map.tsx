"use client";

import { ComposableMap, Geographies } from "react-simple-maps";
import worldData from "@/data/world-110m.json";
import { GeographyItem } from "./geography-item";
import { useMemo, useCallback, memo } from "react";
import { projectionConfig, useMapControls } from "@/hooks/useMapControls";
import { NoteMarkers } from "./note-markers";
import { useNotes } from "@/hooks/useNotes";

const MemoizedGeographies = memo(Geographies);

export const WorldMap: React.FC = () => {
    const { transform, bind } = useMapControls();
    const { notes, isLoading, error } = useNotes();

    const handleTransformStyle = useMemo(
        () => ({
            background: "transparent",
            transform: `translate(${transform.translateX}px, ${transform.translateY}px) scale(${transform.scale})`,
            transformOrigin: "center center",
            cursor: "grab",
        }),
        [transform.translateX, transform.translateY, transform.scale, notes]
    );

    const renderGeographies = useCallback(
        ({ geographies }: { geographies: any[] }) =>
            geographies.map((geo, i) => {
                if (geo.properties.continent === "Antarctica") return null;
                return <GeographyItem key={i} geo={geo} />;
            }),
        []
    );

    return (
        <div
            className="
            relative
            w-screen h-screen overflow-hidden bg-[#a4d9eb]"
            {...bind()}
        >
            <ComposableMap
                projection="geoMercator"
                projectionConfig={projectionConfig}
                className="w-full h-full bg-red-50"
                style={handleTransformStyle}
            >
                <MemoizedGeographies geography={worldData}>
                    {renderGeographies}
                </MemoizedGeographies>

                {!isLoading && !error && <NoteMarkers notes={notes} />}
            </ComposableMap>
        </div>
    );
};
