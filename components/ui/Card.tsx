import * as React from "react"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    withGlow?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className = "", withGlow = true, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={`group relative overflow-hidden rounded-xl bg-(--color-graphite) border border-(--color-steel-gray) transition-all duration-300 ${withGlow ? "hover:scale-[1.02] hover:border-(--color-sharp-red) hover:shadow-[0_0_30px_rgba(255,42,42,0.15)]" : ""
                    } ${className}`}
                {...props}
            >
                {children}
            </div>
        )
    }
)
Card.displayName = "Card"

export { Card }
