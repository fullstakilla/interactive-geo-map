import { Loader2 } from "lucide-react";

export default function Spinner() {
    return (
        <div className="h-screen w-full flex justify-center items-center">
            <Loader2 className="animate-spin text-blue-500" size={48} />
        </div>
    );
}
