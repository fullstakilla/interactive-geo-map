import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from "./card";
import { Button } from "./button";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";

export function ErrorCard({ error }: { error: string }) {
    const { t } = useAppSettingsStore();

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <Card className="w-[380px] border-red-200 bg-red-50/90 backdrop-blur-sm">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-red-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                        <CardTitle className="text-red-700">
                            {t("error.map.title")}
                        </CardTitle>
                    </div>
                    <CardDescription className="text-red-600">
                        {t("error.map.description")}
                    </CardDescription>
                </CardHeader>
                <div className="px-6 py-2">
                    <div className="rounded-lg bg-red-100/50 px-3 py-2 font-mono text-sm text-red-700 border border-red-200">
                        {error}
                    </div>
                </div>
                <CardFooter className="justify-end pt-4">
                    <Button
                        variant="outline"
                        onClick={() => window.location.reload()}
                        className="border-red-200 text-red-700 hover:bg-red-100"
                    >
                        {t("common.tryAgain")}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
