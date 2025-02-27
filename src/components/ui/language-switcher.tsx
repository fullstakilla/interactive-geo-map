"use client";

import { useAppSettingsStore } from "@/store/useAppSettingsStore";
import { Button } from "./button";

const LOCALE_NAMES: Record<string, string> = {
    en: "EN",
    ru: "RU",
};

export function LanguageSwitcher() {
    const { locale, toggleLocale } = useAppSettingsStore();

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={toggleLocale}
            className="fixed top-14 right-5 z-50 bg-white/80 hover:bg-white/90 w-[60px]"
        >
            {LOCALE_NAMES[locale]}
        </Button>
    );
}
