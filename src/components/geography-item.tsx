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
            fill="#2C3639"
            stroke="#DCD7C9"
            strokeWidth={0.2}
            className={cn(
                "transition-colors duration-200 focus:outline-none hover:fill-[#445D48]", // бежевый для ховера
                pickedCountry === geo.properties.name ? "fill-[#445D48]" : "" // тот же бежевый для выбранной страны
            )}
            onClick={onClick}
        />
    );
};
