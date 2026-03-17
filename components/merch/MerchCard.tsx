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
    // Generate unique seeded images based on product title for variety
    const randomMerchImage = `https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop&sig=${encodeURIComponent(title)}`;
    const displayImage = imageUrl || randomMerchImage;

    return (
        <Card className="group flex flex-col h-full bg-(--color-jet-black) border-(--color-steel-gray) hover:border-(--color-sharp-red) overflow-hidden p-4">
            <div className="relative w-full aspect-[4/5] bg-(--color-graphite) rounded-lg mb-4 overflow-hidden">
                <Image
                    src={displayImage}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
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
