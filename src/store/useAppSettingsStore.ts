import { SUPPORTED_LOCALES, Translations } from "@/types/locales";
import { LocaleType } from "@/types/locales";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { en } from "@/locales/en";
import { ru } from "@/locales/ru";

type ProjectionType = "geoMercator" | "geoOrthographic";

const translations: Record<LocaleType, Translations> = {
    en,
    ru,
};

const getInitialState = () => {
    if (typeof window === "undefined") {
        return { locale: "en", projection: "geoMercator" };
    }

    try {
        const stored = localStorage.getItem("app-settings");
        if (stored) {
            const parsed = JSON.parse(stored);
            return {
                locale: parsed.state.locale || "en",
                projection: parsed.state.projection || "geoMercator",
            };
        }
    } catch (e) {
        console.warn("Failed to parse localStorage", e);
    }

    return { locale: "en", projection: "geoMercator" };
};

const initialState = getInitialState();

interface AppSettings {
    projection: ProjectionType;
    locale: LocaleType;
    translations: Translations;
    setProjection: (projection: ProjectionType) => void;
    toggleLocale: () => void;
    t: (
        key: string,
        params?: Record<string, string | number | undefined>
    ) => string;
}

export const useAppSettingsStore = create<AppSettings>()(
    persist(
        (set, get) => ({
            projection: initialState.projection as ProjectionType,
            locale: initialState.locale as LocaleType,
            translations: translations[initialState.locale as LocaleType],
            setProjection: (projection) => set({ projection }),
            toggleLocale: () => {
                const currentIndex = SUPPORTED_LOCALES.indexOf(get().locale);
                const nextIndex = (currentIndex + 1) % SUPPORTED_LOCALES.length;
                const newLocale = SUPPORTED_LOCALES[nextIndex];
                set({
                    locale: newLocale,
                    translations: translations[newLocale],
                });
            },
            t: (
                key: string,
                params?: Record<string, string | number | undefined>
            ) => {
                const keys = key.split(".");
                let result: any = get().translations;

                for (const k of keys) {
                    result = result?.[k];
                }

                if (!result) return key;

                if (params) {
                    return Object.entries(params).reduce(
                        (str, [key, value]) => {
                            return str.replace(
                                `{{${key}}}`,
                                String(value ?? "")
                            );
                        },
                        result
                    );
                }

                return result;
            },
        }),
        {
            name: "app-settings",
            partialize: (state) => ({
                locale: state.locale,
                projection: state.projection,
            }),
        }
    )
);
