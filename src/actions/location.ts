import { toast } from "sonner";

type GetLocationResult = {
    success: boolean;
    coordinates?: [number, number];
    error?: string;
};

export const getCurrentLocation = async (): Promise<GetLocationResult> => {
    if (!navigator.geolocation) {
        toast.error("Geolocation is not supported by your browser");
        return {
            success: false,
            error: "Geolocation is not supported by your browser",
        };
    }

    try {
        const position = await new Promise<GeolocationPosition>(
            (resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            }
        );

        const coordinates: [number, number] = [
            position.coords.longitude,
            position.coords.latitude,
        ];

        return {
            success: true,
            coordinates,
        };
    } catch (error) {
        if (error instanceof GeolocationPositionError) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    toast.error("Location permission denied");
                    return {
                        success: false,
                        error: "Location permission denied",
                    };
                case error.POSITION_UNAVAILABLE:
                    toast.error("Location information unavailable");
                    return {
                        success: false,
                        error: "Location information unavailable",
                    };
                case error.TIMEOUT:
                    toast.error("Location request timed out");
                    return {
                        success: false,
                        error: "Location request timed out",
                    };
                default:
                    toast.error(
                        "An unknown error occurred while getting location"
                    );
                    return {
                        success: false,
                        error: "An unknown error occurred",
                    };
            }
        }

        toast.error("Failed to get location");
        return { success: false, error: "Failed to get location" };
    }
};
