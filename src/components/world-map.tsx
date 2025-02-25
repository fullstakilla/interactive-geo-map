import {
    ComposableMap,
    Geographies,
    ProjectionConfig,
    ZoomableGroup,
} from "react-simple-maps";
import { GeographyItem } from "./geography-item";
import NoteMarkers from "./note-markers";
import { useCallback, useEffect, useState } from "react";
import { useGeoDataStore } from "@/store/useGeoDataStore";
import { useMapZoomStore } from "@/store/useMapZoomStore";

const projectionConfig: ProjectionConfig = {
    scale: 160,
    center: [0, 0],
};

interface WorldMapProps {
    geoData: any;
}

export const WorldMap: React.FC<WorldMapProps> = ({ geoData }) => {
    const { zoom, center, zoomToGeography, isZooming } = useMapZoomStore();
    const setPickedCountry = useGeoDataStore((state) => state.setPickedCountry);
    const setGeoJSONData = useGeoDataStore((state) => state.setGeoJSONData);

    const handleGeographyClick = useCallback((geography: any) => {
        setPickedCountry(geography.properties.name);

        zoomToGeography(geography);
    }, []);

    console.log("worldmap render");

    return (
        <ComposableMap
            projection="geoMercator"
            // projection="geoOrthographic"
            // projection="geoAlbers"
            projectionConfig={projectionConfig}
            className="w-full h-screen bg-[#a4d9eb]"
        >
            <ZoomableGroup
                center={center}
                zoom={zoom}
                translateExtent={[
                    [-100, -300],
                    [900, 800],
                ]}
                className={
                    isZooming
                        ? "transition-transform duration-200 ease-in-out"
                        : ""
                }
            >
                <Geographies geography={geoData}>
                    {({ geographies }) => (
                        <GeographiesWrapper
                            geographies={geographies}
                            setGeoJSONData={setGeoJSONData}
                            handleGeographyClick={handleGeographyClick}
                        />
                    )}
                </Geographies>
                <NoteMarkers />
            </ZoomableGroup>
        </ComposableMap>
    );
};

const GeographiesWrapper = ({
    geographies,
    setGeoJSONData,
    handleGeographyClick,
}: any) => {
    useEffect(() => {
        setGeoJSONData(geographies);
    }, [geographies, setGeoJSONData]);

    return geographies.map((geo: any, i: number) => (
        <GeographyItem
            key={i}
            geo={geo}
            onClick={() => handleGeographyClick(geo)}
        />
    ));
};
