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
import { useAppSettingsStore } from "@/store/useAppSettingsStore";

const projectionConfig: ProjectionConfig = {
    scale: 160,
    center: [0, 0],
};

interface WorldMapProps {
    geoData: any;
}

export const WorldMap: React.FC<WorldMapProps> = ({ geoData }) => {
    const { zoom, center, zoomToGeography, setPosition } = useMapZoomStore();
    const setPickedCountry = useGeoDataStore((state) => state.setPickedCountry);
    const setGeoJSONData = useGeoDataStore((state) => state.setGeoJSONData);
    const projection = useAppSettingsStore((state) => state.projection);

    const handleGeographyClick = useCallback((geography: any) => {
        setPickedCountry(geography.properties.name);
        zoomToGeography(geography);
    }, []);

    const handleMoveEnd = useCallback(
        ({
            coordinates,
            zoom,
        }: {
            coordinates: [number, number];
            zoom: number;
        }) => {
            setPosition(zoom, coordinates);
        },
        []
    );

    console.log("worldmap render");

    return (
        <div className="relative w-full h-screen">
            <div className="absolute inset-0 bg-[url('/4049458.jpg')] bg-cover bg-center bg-no-repeat" />
            <div className="absolute inset-0 bg-black/10" />
            <ComposableMap
                projection={projection}
                projectionConfig={projectionConfig}
                className="relative w-full h-screen bg-transparent"
            >
                <ZoomableGroup
                    center={center}
                    zoom={zoom}
                    translateExtent={[
                        [-100, -300],
                        [900, 800],
                    ]}
                    onMoveEnd={handleMoveEnd}
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
        </div>
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
