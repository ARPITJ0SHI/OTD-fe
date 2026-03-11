import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function NewsCard({
    title,
    category,
    date,
    imageUrl,
    featured = false,
}: {
    title: string;
    category: "Announcements" | "Results" | "Highlights" | string;
    date: string;
    imageUrl?: string;
    featured?: boolean;
}) {
    return (
        <Card className={`group flex flex-col h-full bg-(--color-graphite) border-(--color-steel-gray) hover:border-(--color-sharp-red) overflow-hidden ${featured ? 'md:col-span-2 lg:col-span-2' : ''}`}>
            <div className={`relative w-full ${featured ? 'aspect-video md:aspect-[2/1]' : 'aspect-video'} bg-(--color-jet-black) overflow-hidden`}>
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-(--color-steel-gray) to-(--color-jet-black)" />
                )}
                <div className="absolute top-4 left-4">
                    <Badge variant={category === "Highlights" ? "live" : "default"}>{category}</Badge>
                </div>
            </div>

            <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                    <p className="text-(--color-chrome-silver) text-xs font-sans uppercase tracking-widest mb-3">{date}</p>
                    <h3 className={`font-heading uppercase text-white ${featured ? 'text-4xl md:text-5xl' : 'text-2xl md:text-3xl'} tracking-wide line-clamp-3 group-hover:text-(--color-sharp-red) transition-colors`}>
                        {title}
                    </h3>
                </div>

                <div className="mt-6 flex justify-end">
                    <button className="h-10 w-10 rounded-full border border-(--color-steel-gray) flex items-center justify-center text-white group-hover:bg-(--color-sharp-red) group-hover:border-(--color-sharp-red) transition-colors">
                        <ArrowUpRight size={20} />
                    </button>
                </div>
            </div>
        </Card>
    );
}
