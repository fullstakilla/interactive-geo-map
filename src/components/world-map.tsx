import {
    ComposableMap,
    Geographies,
    ProjectionConfig,
    ZoomableGroup,
} from "react-simple-maps";
import { GeographyItem } from "./geography-item";
import NoteMarkers from "./note-markers";

const projectionConfig: ProjectionConfig = {
    scale: 160,
    center: [0, 0],
};

interface WorldMapProps {
    geoData: any;
}

export const WorldMap: React.FC<WorldMapProps> = ({ geoData }) => {
    console.log("worldmap render");

    return (
        <ComposableMap
            projection="geoMercator"
            projectionConfig={projectionConfig}
            className="w-full h-screen bg-[#a4d9eb]"
        >
            <ZoomableGroup
                center={[15, 38]}
                zoom={1}
                maxZoom={15}
                translateExtent={[
                    [-100, -300],
                    [900, 600],
                ]}
            >
                <Geographies geography={geoData}>
                    {({ geographies }) =>
                        geographies.map((geo, i) => {
                            if (geo.properties.name === "Antarctica")
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
