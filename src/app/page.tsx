"use client";

import MainPanel from "@/components/ui/main-panel";
import { AuthDialog } from "@/components/dialog/auth-dialog";
import { HelloToast } from "@/components/ui/hello-toast";
import { WorldMap } from "@/components/world-map";
import Spinner from "@/components/ui/spinner";
import { ErrorCard } from "@/components/ui/error-card";
import { PickedCountry } from "@/components/ui/picked-country";
import { useEffect } from "react";
import { useGeoDataStore } from "@/store/useGeoDataStore";

const DraggableWorldMap = () => {
    const geoData = useGeoDataStore((state) => state.data);
    const isLoading = useGeoDataStore((state) => state.isLoading);
    const error = useGeoDataStore((state) => state.error);
    const fetchGeoData = useGeoDataStore((state) => state.fetchGeoData);

    useEffect(() => {
        fetchGeoData();
    }, []);

    if (error) {
        return <ErrorCard error={error} />;
    }

    if (isLoading || !geoData) {
        return <Spinner />;
    }

    return (
        <>
            <PickedCountry />
            <HelloToast />
            <AuthDialog />
            <MainPanel />
            <WorldMap geoData={geoData} />
        </>
    );
};

export default DraggableWorldMap;
