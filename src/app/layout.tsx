import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/index.css";
import { Toaster } from "sonner";
import ClientProviders from "@/providers/client-providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Interactive Map",
    description: "Interactive Map with notes",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ClientProviders>{children}</ClientProviders>
                <Toaster position="bottom-left" richColors closeButton />
            </body>
        </html>
    );
}
