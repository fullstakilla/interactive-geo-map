import { useState } from "react";
import { useGesture } from "react-use-gesture";

const MINIMAL_SCALE = 2;
const MAXIMAL_SCALE = 5;
const SCALE_STEP = 1;

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

            // Ограничения на перетаскивание
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

            setTransform((prev) => ({
                ...prev,
                translateX: newTranslateX,
                translateY: newTranslateY,
            }));

            return memo;
        },
        onWheel: ({ delta: [, dy] }) => {
            if (dy === 0) return;

            setTransform((prev) => {
                const newScale =
                    dy > 0
                        ? Math.max(prev.scale - SCALE_STEP, MINIMAL_SCALE)
                        : Math.min(prev.scale + SCALE_STEP, MAXIMAL_SCALE);

                const scaleFactor = newScale / prev.scale;

                return {
                    scale: newScale,
                    translateX: prev.translateX * scaleFactor,
                    translateY: prev.translateY * scaleFactor,
                };
            });
        },
    });

    return { transform, bind };
};
