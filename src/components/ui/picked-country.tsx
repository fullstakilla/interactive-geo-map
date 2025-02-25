import { useGeoDataStore } from "@/store/useGeoDataStore";

export function PickedCountry() {
    const pickedCountry = useGeoDataStore((state) => state.pickedCountry);
    const setPickedCountry = useGeoDataStore((state) => state.setPickedCountry);

    if (!pickedCountry) return null;

    return (
        <div className="absolute left-1/2 top-10 transform -translate-x-1/2 -translate-y-1/2 w-full z-50">
            <div className="text-white text-xl font-bold text-center drop-shadow-md flex items-center justify-center">
                You are in: {pickedCountry}
                <button
                    className="ml-2 inline-flex items-center justify-center rounded-full w-6 h-6 text-lg text-white/80 hover:text-white hover:bg-white/20 transition-colors"
                    aria-label="Clear selected country"
                    onClick={() => setPickedCountry(null)}
                >
                    ×
                </button>
            </div>
        </div>
    );
}
