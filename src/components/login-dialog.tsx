"use client";

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
} from "./ui/dropdown-menu";
import { ArrowDown } from "lucide-react";
import { useState } from "react";

export const LoginDialog: React.FC = () => {
    const { data: session, status } = useSession();

    if (status == "loading") {
        return null;
    }

    if (session && session.user) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        className="absolute right-10 top-3 z-50"
                        variant={"secondary"}
                    >
                        {session.user.name}
                        <ArrowDown />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onSelect={() => signOut()}
                        variant="destructive"
                    >
                        Sign Out
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
                    className="absolute right-10 top-3 z-50"
                >
                    Login
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Login with socials</DialogTitle>
                </DialogHeader>
                <div className="w-full flex flex-col gap-2">
                    <SignInButton
                        provider="google"
                        text="Sign in with Google"
                        src="/google.svg"
                        alt="google logo"
                        width={13}
                        height={13}
                        className="mt-[2px]"
                    />
                    <SignInButton
                        provider="google"
                        text="Sign in with Twitter"
                        src="/twitter.svg"
                        alt="twitter logo"
                        width={15}
                        height={15}
                        className="mt-[2px]"
                    />
                    <SignInButton
                        provider="google"
                        text="Sign in with Discord"
                        src="/discord.svg"
                        alt="discord logo"
                        width={14}
                        height={14}
                        className="mt-[2px]"
                    />
                </div>
                <span className="text-muted-foreground text-sm">
                    By accessing this site, you agree to our Terms and
                    Conditions and Privacy Policy. Posting harmful, misleading,
                    or inappropriate content, including hate comments,
                    negativity, or discussions about unrelated groups, is
                    strictly prohibited to maintain a positive and respectful
                    fan community.
                </span>
            </DialogContent>
        </Dialog>
    );
};

interface SignInButtonInterface extends ImageProps {
    text: string;
    provider: string;
}

function SignInButton({
    text,
    provider,
    src,
    width,
    height,
    alt,
    className,
}: SignInButtonInterface) {
    const [isLoading, setIsLoading] = useState(false);

    async function handleClick() {
        setIsLoading(true);
        try {
            await signIn(provider);

            toast.success("Successfully signed in. Refreshing.");
        } catch (e) {
            toast.error("Error happened. Try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Button variant={"outline"} onClick={handleClick} disabled={isLoading}>
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
