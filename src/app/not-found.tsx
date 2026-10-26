import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-[calc(100vh-12rem)] flex flex-col">
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="flex flex-col items-center text-center max-w-md relative">
                    <h1 className="text-[200px] font-dot font-bold text-foreground/15 absolute -top-40 left-1/2 -translate-x-1/2 leading-none">
                        404
                    </h1>
                    <h2 className="font-dot font-bold uppercase text-4xl text-foreground mb-3">
                        Page Not Found
                    </h2>
                    <p className="text-muted-foreground mb-8 text-balance tracking-tight font-medium">
                        The page you&apos;re looking for doesn&apos;t exist or may have been
                        moved.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm transition-colors hover:bg-foreground/[0.04]"
                        >
                            <Home className="h-4 w-4" />
                            Go to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}


