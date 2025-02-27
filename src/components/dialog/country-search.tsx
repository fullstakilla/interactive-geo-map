import { useEffect, useState, useMemo, useCallback } from "react";
import { Button } from "../ui/button";
import {
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandDialog,
} from "../ui/command";
import { useGeoDataStore } from "@/store/useGeoDataStore";
import { useMapZoomStore } from "@/store/useMapZoomStore";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";

export default function CountrySearch() {
    const { t } = useAppSettingsStore();
    const [open, setOpen] = useState<boolean>(false);
    const [search, setSearch] = useState("");

    const zoomToGeography = useMapZoomStore((state) => state.zoomToGeography);
    const setPickedCountry = useGeoDataStore((state) => state.setPickedCountry);
    const geoJSONData = useGeoDataStore((state) => state.geoJSONData);

    const filteredCountries = useMemo(() => {
        if (!geoJSONData.length) return [];
        if (!search) return geoJSONData;

        const searchLower = search.toLowerCase();
        return geoJSONData.filter(
            (geography) =>
                geography.properties.name.toLowerCase().includes(searchLower) &&
                geography.properties.name !== "Antarctica"
        );
    }, [geoJSONData, search]);

    const handleSelect = useCallback((geography: any) => {
        setSearch("");
        setOpen(false);
        setPickedCountry(geography.properties.name);
        zoomToGeography(geography);
    }, []);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (
                (e.key === "k" ||
                    e.key === "K" ||
                    e.key === "л" ||
                    e.key === "Л") &&
                (e.metaKey || e.ctrlKey)
            ) {
                e.preventDefault();
                e.stopPropagation();
                setOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down, true);
        return () => document.removeEventListener("keydown", down, true);
    }, []);

    return (
        <>
            <Button
                variant="outline"
                onClick={() => setOpen(true)}
                className="gap-2 p-5"
            >
                <span>🔍</span>
                <span className="hidden md:inline">{t("common.search")}</span>
                <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
                    <span className="text-xs">⌘</span>
                    {t("commandCombo.search")}
                </kbd>
            </Button>
            <CommandDialog
                open={open}
                onOpenChange={setOpen}
                aria-label="Find Country"
            >
                <CommandInput
                    placeholder={t("common.search")}
                    value={search}
                    onValueChange={setSearch}
                />
                <CommandList>
                    <CommandEmpty>{t("common.noCountriesFound")}</CommandEmpty>
                    <CommandGroup heading={t("common.countries")}>
                        {filteredCountries.map((geography) => (
                            <CommandItem
                                key={geography.properties.name}
                                value={geography.properties.name}
                                onSelect={() => handleSelect(geography)}
                                className="cursor-pointer"
                            >
                                {geography.properties.name}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}
