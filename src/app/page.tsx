"use client";

import MainPanel from "@/components/ui/main-panel";
import { AuthDialog } from "@/components/dialog/auth-dialog";
import { HelloToast } from "@/components/ui/hello-toast";
import { WorldMap } from "@/components/world-map";
import { useGeoData } from "@/hooks/useGeoData";
import Spinner from "@/components/ui/spinner";
import { ErrorCard } from "@/components/ui/error-card";

const DraggableWorldMap = () => {
    const { geoData, isLoading, error } = useGeoData();

    if (isLoading || !geoData) {
        return <Spinner />;
    }

    if (error) {
        return <ErrorCard error={error} />;
    }

    return (
        <>
            <WorldMap geoData={geoData} />
            <HelloToast />
            <AuthDialog />
            <MainPanel />
        </>
    );
};

export default DraggableWorldMap;
