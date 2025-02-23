import MainPanel from "@/components/ui/main-panel";
import { AuthDialog } from "@/components/dialog/auth-dialog";
import { HelloToast } from "@/components/ui/hello-toast";
import { WorldMap } from "@/components/world-map";

const DraggableWorldMap = async () => {
    return (
        <>
            <WorldMap />
            <HelloToast />
            <AuthDialog />
            <MainPanel />
        </>
    );
};

export default DraggableWorldMap;
