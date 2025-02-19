"use client";

import React, { useEffect, useState } from "react";
import { useMapControls } from "@/hooks/useMapControls";
import { WorldMap } from "@/components/world-map";

const DraggableWorldMap = () => {
    const { transform, bind } = useMapControls();

    return (
        <div
            className="relative w-screen h-screen overflow-hidden bg-[#a4d9eb]"
            {...bind()}
        >
            <WorldMap transform={transform} />
        </div>
    );
};

export default DraggableWorldMap;
