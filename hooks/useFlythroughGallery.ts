import { useTransform, useScroll } from "framer-motion";

export function useFlythroughGallery(
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"],
  index: number,
  total: number
) {
  // Each card gets an equal slice of the scroll timeline
  const segmentSize = 1 / total;
  const start = index * segmentSize;
  const mid = start + segmentSize * 0.5;
  const end = start + segmentSize;

  // Scale: 0.1 → 1 → 5 (tiny center → readable → fly past camera)
  const scale = useTransform(
    scrollYProgress,
    [start, mid, end],
    [0.1, 1, 5]
  );

  // Opacity: fade in as it reaches focus, fade out as it flies past
  const opacity = useTransform(
    scrollYProgress,
    [start, start + segmentSize * 0.25, mid, end - segmentSize * 0.15, end],
    [0, 1, 1, 0.5, 0]
  );

  // X offset: drift off to a side as it scales past 1
  const xDirection = index % 2 === 0 ? -1 : 1; // alternate sides
  const x = useTransform(
    scrollYProgress,
    [start, mid, end],
    [0, 0, xDirection * 400]
  );

  // Y offset: drift slightly upward as it flies past
  const y = useTransform(
    scrollYProgress,
    [start, mid, end],
    [0, 0, -150]
  );

  // Caption Opacity
  const captionOpacity = useTransform(
    scrollYProgress,
    [start, start + segmentSize * 0.3, mid, end - segmentSize * 0.2, end],
    [0, 1, 1, 0.5, 0]
  );

  // Caption Y translation
  const captionY = useTransform(
    scrollYProgress,
    [start, start + segmentSize * 0.3, mid],
    [20, 0, 0]
  );

  return { scale, opacity, x, y, captionOpacity, captionY };
}
