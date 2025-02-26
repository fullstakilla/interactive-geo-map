"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { Button } from "./button";

export function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();

    const toggleLocale = () => {
        const nextLocale = locale === "en" ? "ru" : "en";
        router.push(`/${nextLocale}`);
    };

    return (
        <div className="absolute top-14 right-24 z-10">
            <Button
                variant="outline"
                size="sm"
                onClick={toggleLocale}
                className="bg-white hover:bg-white/90 text-black shadow-lg"
            >
                {locale === "en" ? "RU" : "EN"}
            </Button>
        </div>
    );
}
