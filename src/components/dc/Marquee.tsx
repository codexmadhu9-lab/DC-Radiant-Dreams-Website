type MarqueeProps = {
  items: string[];
  reverse?: boolean;
  duration?: number;
  className?: string;
  itemClassName?: string;
  separator?: string;
};

export function Marquee({
  items,
  reverse = false,
  duration = 34,
  className = "",
  itemClassName = "",
  separator = "✦",
}: MarqueeProps) {
  const loop = [...items, ...items, ...items, ...items];

  return (
    <div className={`marquee-paused relative w-full overflow-hidden ${className}`}>
      <div
        className={reverse ? "marquee-track-reverse" : "marquee-track"}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {loop.map((item, i) => (
          <span key={`${item}-${i}`} className={`flex shrink-0 items-center ${itemClassName}`}>
            <span className="whitespace-nowrap">{item}</span>
            <span className="mx-6 text-gold sm:mx-10">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
