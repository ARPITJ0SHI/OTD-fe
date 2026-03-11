import { useScroll, useTransform, useSpring, useVelocity } from "framer-motion";

export function useVelocitySkew(
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"],
  direction: "left" | "right" = "left",
  stiffness = 50,
  damping = 15
) {
  // Capture scroll velocity
  const scrollVelocity = useVelocity(scrollYProgress);
  
  // Smooth the velocity so the characters spring back naturally
  const smoothVelocity = useSpring(scrollVelocity, {
    damping,
    stiffness,
  });

  // Map velocity to a skew angle (e.g. max 15 degrees)
  const skewX = useTransform(
    smoothVelocity,
    [-1, 0, 1],
    direction === "left" ? [-15, 0, 15] : [15, 0, -15]
  );

  return { skewX };
}
