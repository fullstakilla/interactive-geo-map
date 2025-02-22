import MainPanel from "@/components/ui/main-panel";
import { LoginDialog } from "@/components/login-dialog";
import { HelloToast } from "@/components/ui/hello-toast";
import { WorldMap } from "@/components/world-map";
import { NoteDialog } from "@/components/note-dialog";

const DraggableWorldMap = async () => {
    return (
        <>
            <WorldMap />
            <HelloToast />
            <LoginDialog />
            <MainPanel />
            <NoteDialog />
        </>
    );
};

export default DraggableWorldMap;
