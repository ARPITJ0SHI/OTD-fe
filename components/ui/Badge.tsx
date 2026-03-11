export function Badge({
    children,
    variant = "default",
    className = "",
}: {
    children: React.ReactNode;
    variant?: "default" | "live" | "outline";
    className?: string;
}) {
    const base = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider";

    const variants = {
        default: "bg-(--color-steel-gray) text-white",
        live: "bg-(--color-sharp-red) text-white animate-pulse",
        outline: "border border-(--color-chrome-silver) text-(--color-chrome-silver)",
    };

    return (
        <span className={`${base} ${variants[variant]} ${className}`}>
            {variant === "live" && (
                <span className="mr-1.5 flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
            )}
            {children}
        </span>
    );
}
