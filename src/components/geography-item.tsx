import { cn } from "@/lib/utils";
import { useGeoDataStore } from "@/store/useGeoDataStore";
import { Geography } from "react-simple-maps";

interface GeographyItemProps {
    geo: any;
    onClick: (geography: any) => void;
}

export const GeographyItem: React.FC<GeographyItemProps> = ({
    geo,
    onClick,
}) => {
    const pickedCountry = useGeoDataStore((state) => state.pickedCountry);

    return (
        <Geography
            geography={geo}
            fill="#ccc"
            stroke="black"
            strokeWidth={0.1}
            className={cn(
                "transition-colors duration-200 focus:outline-none hover:fill-green-600",
                pickedCountry === geo.properties.name ? "fill-green-600" : ""
            )}
            onClick={onClick}
        />
    );
};
