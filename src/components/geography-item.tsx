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
    const ifPicked = pickedCountry === geo.properties.name;

    return (
        <Geography
            geography={geo}
            fill="#2C3639"
            stroke={ifPicked ? "#FFA500" : "#DCD7C9"}
            strokeWidth={ifPicked ? 0.4 : 0.2}
            className={cn(
                "transition-colors duration-200 focus:outline-none hover:fill-[#445D48]",
                ifPicked ? "fill-[#445D48]" : ""
            )}
            onClick={onClick}
        />
    );
};
