import { useGeoDataStore } from "@/store/useGeoDataStore";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";

export function PickedCountry() {
    const pickedCountry = useGeoDataStore((state) => state.pickedCountry);
    const setPickedCountry = useGeoDataStore((state) => state.setPickedCountry);
    const { t } = useAppSettingsStore();

    if (!pickedCountry) return null;

    return (
        <div className="absolute left-1/2 top-10 transform -translate-x-1/2 -translate-y-1/2 w-full z-50">
            <div className="text-white text-xl font-bold text-center drop-shadow-md flex items-center justify-center">
                {t("common.youAreIn")} {pickedCountry}
                <button
                    className="ml-2 pb-1 inline-flex items-center justify-center rounded-full w-6 h-6 text-lg text-white hover:text-white hover:bg-white/20 transition-colors"
                    aria-label="Clear selected country"
                    onClick={() => setPickedCountry(null)}
                >
                    ×
                </button>
            </div>
        </div>
    );
}
