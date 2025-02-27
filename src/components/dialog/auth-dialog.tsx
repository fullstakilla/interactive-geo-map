import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { signIn, signOut, useSession } from "next-auth/react";
import Image, { ImageProps } from "next/image";
import { toast } from "sonner";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";

export const AuthDialog: React.FC = () => {
    const { data: session, status } = useSession();
    const { t } = useAppSettingsStore();

    if (status == "loading") {
        return null;
    }

    if (session && session.user) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        className="absolute right-5 top-3 z-50 flex items-center"
                        variant={"secondary"}
                    >
                        {session.user.name}
                        <ChevronDown />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>{t("auth.myAccount")}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onSelect={() => signOut()}
                        variant="destructive"
                    >
                        {t("auth.signOut")}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant={"secondary"}
                    className="absolute right-5 top-3 z-50"
                >
                    {t("auth.login")}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t("auth.loginWith")}</DialogTitle>
                </DialogHeader>
                <div className="w-full flex flex-col gap-2">
                    <SignInButton
                        provider="google"
                        text={t("auth.signInWith", {
                            provider: "Google" as any,
                        })}
                        src="/google.svg"
                        alt="google logo"
                        width={13}
                        height={13}
                        className="mt-[2px]"
                    />
                    <SignInButton
                        provider="google"
                        text={t("auth.signInWith", { provider: "Twitter" })}
                        src="/twitter.svg"
                        alt="twitter logo"
                        width={15}
                        height={15}
                        className="mt-[2px]"
                        disabled={true}
                    />
                    <SignInButton
                        provider="google"
                        text={t("auth.signInWith", { provider: "Discord" })}
                        src="/discord.svg"
                        alt="discord logo"
                        width={14}
                        height={14}
                        className="mt-[2px]"
                        disabled={true}
                    />
                </div>
                <span className="text-muted-foreground text-sm">
                    {t("auth.terms")}
                </span>
            </DialogContent>
        </Dialog>
    );
};

interface SignInButtonInterface
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    provider: string;
    src: string;
    width: number;
    height: number;
    alt: string;
}

function SignInButton({
    text,
    provider,
    src,
    width,
    height,
    alt,
    className,
    disabled,
}: SignInButtonInterface) {
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useAppSettingsStore();

    async function handleClick() {
        setIsLoading(true);
        try {
            await signIn(provider);

            toast.success(t("auth.success"));
        } catch (e) {
            toast.error(t("auth.error"));
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Button
            variant={"outline"}
            onClick={handleClick}
            disabled={isLoading || disabled}
        >
            <Image
                src={src}
                width={width}
                height={height}
                alt={alt}
                className={className}
            />
            {text}
        </Button>
    );
}
