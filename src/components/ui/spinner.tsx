import { Loader2 } from "lucide-react";

export default function Spinner() {
    return (
        <div className="h-screen w-full flex justify-center items-center bg-[#e3ddcd]">
            <Loader2 className="animate-spin text-[#2c3639]" size={48} />
        </div>
    );
}
