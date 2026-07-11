import type { ComponentPropsWithoutRef } from "react";

interface TravelRouteCardProps extends ComponentPropsWithoutRef<"div"> {
  title: string;
  author: string;
  distance?: string;
  initialLikes?: number;
  imageUrl?: string;
}

export function TravelRouteCard({
  title,
  author,
  distance = "—",
  initialLikes = 0,
  imageUrl,
  className = "",
  ...props
}: TravelRouteCardProps) {
  return (
    <div
      className={`overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0d0d0d] shadow-[0_20px_60px_-20px_rgba(255,255,255,0.15)] ${className}`}
      {...props}
    >
      {imageUrl ? (
        <div className="aspect-[4/3] overflow-hidden">
          <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
        </div>
      ) : null}
      <div className="space-y-3 p-6">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-white/40">
          <span>Featured</span>
          <span>{distance}</span>
        </div>
        <h3 className="text-xl font-medium text-white">{title}</h3>
        <p className="text-sm leading-relaxed text-white/60">{author}</p>
        <div className="pt-2 text-sm text-white/50">{initialLikes} likes</div>
      </div>
    </div>
  );
}
