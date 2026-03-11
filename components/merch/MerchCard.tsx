import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

export function MerchCard({
    title,
    price,
    imageUrl,
    available = true,
}: {
    title: string;
    price: string;
    imageUrl?: string;
    available?: boolean;
}) {
    return (
        <Card className="group flex flex-col h-full bg-(--color-jet-black) border-(--color-steel-gray) hover:border-(--color-sharp-red) overflow-hidden p-4">
            <div className="relative w-full aspect-[4/5] bg-(--color-graphite) rounded-lg mb-4 overflow-hidden">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-(--color-steel-gray)">
                        <span className="font-heading text-4xl">OTD X MERCH</span>
                    </div>
                )}
            </div>

            <div className="flex flex-col flex-1 items-center text-center">
                <h3 className="font-heading uppercase text-white text-xl md:text-2xl tracking-wide mb-1 transition-colors">
                    {title}
                </h3>
                <p className="text-(--color-chrome-silver) text-lg font-sans mb-6">{price}</p>

                <div className="mt-auto w-full">
                    <Button
                        variant={available ? "primary" : "secondary"}
                        className="w-full"
                        disabled={!available}
                    >
                        {available ? "Add to Cart" : "Coming Soon"}
                    </Button>
                </div>
            </div>
        </Card>
    );
}
