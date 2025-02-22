import { useState } from "react";
import { ProjectionConfig } from "react-simple-maps";
import { useGesture } from "react-use-gesture";

const MINIMAL_SCALE = 2;
const MAXIMAL_SCALE = 10;
const SCALE_STEP = 1;

export const projectionConfig: ProjectionConfig = {
    scale: 65,
    center: [0, 0],
};

export const useMapControls = () => {
    const [transform, setTransform] = useState({
        scale: MINIMAL_SCALE,
        translateX: 0,
        translateY: 100,
    });

    const bind = useGesture({
        onDrag: ({
            movement: [mx, my],
            memo = {
                translateX: transform.translateX,
                translateY: transform.translateY,
            },
        }) => {
            const { scale } = transform;

            const BOUNDS_X = 170 * scale;
            const BOUNDS_Y_UP = 220 * scale;
            const BOUNDS_Y_DOWN = 70 * scale;

            const newTranslateX = Math.max(
                -BOUNDS_X,
                Math.min(memo.translateX + mx, BOUNDS_X)
            );

            const newTranslateY = Math.max(
                -BOUNDS_Y_DOWN,
                Math.min(memo.translateY + my, BOUNDS_Y_UP)
            );

            setTransform({
                ...transform,
                translateX: newTranslateX,
                translateY: newTranslateY,
            });

            return memo;
        },
        onWheel: ({ delta: [, dy] }) => {
            if (dy === 0) return;

            const newScale =
                dy > 0
                    ? Math.max(transform.scale - SCALE_STEP, MINIMAL_SCALE)
                    : Math.min(transform.scale + SCALE_STEP, MAXIMAL_SCALE);

            if (newScale === transform.scale) return;

            const scaleFactor = newScale / transform.scale;

            setTransform({
                scale: newScale,
                translateX: transform.translateX * scaleFactor,
                translateY: transform.translateY * scaleFactor,
            });
        },
    });

    return {
        transform,
        bind,
    };
};
