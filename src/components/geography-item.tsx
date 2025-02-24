import { Geography } from "react-simple-maps";
import { toast } from "sonner";

interface GeographyItemProps {
    geo: any;
}

export const GeographyItem: React.FC<GeographyItemProps> = ({ geo }) => {
    const handleClick = () => {
        toast.success(`Clicked on: ${geo.properties.name}`);
    };

    return (
        <Geography
            geography={geo}
            fill="#ccc"
            stroke="black"
            strokeWidth={0.1}
            className="transition-colors duration-200 focus:outline-none"
            onMouseEnter={(e: any) => {
                e.target.style.fill = "#ff6347";
            }}
            onMouseLeave={(e: any) => {
                e.target.style.fill = "#ccc";
            }}
            onClick={handleClick}
        />
    );
};
