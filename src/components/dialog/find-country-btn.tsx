import { useEffect, useState, useMemo } from "react";
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
import { Country } from "@/types/TopoJSON";
import { toast } from "sonner";

export default function FindCountryBtn() {
    const [open, setOpen] = useState<boolean>(false);
    const [search, setSearch] = useState("");

    const { countries, isLoading } = useGeoDataStore();

    const filteredCountries = useMemo(() => {
        if (!search) return countries;

        const searchLower = search.toLowerCase();
        return countries.filter((country) =>
            country.name.toLowerCase().includes(searchLower)
        );
    }, [countries, search]);

    console.log("find-country-btn render");

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

    const handleSelect = (country: Country) => {
        toast.success(`Clicked on: ${country.name}`);
        setSearch("");
        setOpen(false);
    };

    return (
        <>
            <Button
                variant="outline"
                onClick={() => setOpen(true)}
                className="gap-2 p-5"
            >
                <span>🔍</span>
                <span className="hidden md:inline">Search countries...</span>
                <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </Button>
            <CommandDialog
                open={open}
                onOpenChange={setOpen}
                aria-label="Find Country"
            >
                <CommandInput
                    placeholder={
                        isLoading
                            ? "Loading countries..."
                            : "Search for a country..."
                    }
                    value={search}
                    onValueChange={setSearch}
                />
                <CommandList>
                    <CommandEmpty>
                        {isLoading ? "Loading..." : "No countries found."}
                    </CommandEmpty>
                    <CommandGroup heading="Countries">
                        {filteredCountries.map((country) => (
                            <CommandItem
                                key={country.name}
                                value={country.name}
                                onSelect={() => handleSelect(country)}
                                className="cursor-pointer"
                            >
                                {country.name}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}
