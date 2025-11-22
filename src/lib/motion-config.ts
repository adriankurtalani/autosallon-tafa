// Motion configuration for performance optimization
import { Variants } from "framer-motion";

// Reduced motion variants for accessibility and performance
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

// Optimized transition settings
export const defaultTransition = {
  duration: 0.5,
  ease: [0.4, 0, 0.2, 1], // Custom easing for smoother animations
};

export const fastTransition = {
  duration: 0.3,
  ease: [0.4, 0, 0.2, 1],
};

// Check for reduced motion preference
export const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

