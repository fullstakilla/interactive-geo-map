"use server";

export async function getGeoData() {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_TOPOJSON_API!);
        if (!response.ok) {
            throw new Error("Failed to fetch geography data");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching geography data:", error);
        throw error;
    }
}
