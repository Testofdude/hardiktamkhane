import { cn } from "@/lib/utils";

interface PressLogoProps {
  name: string;
  className?: string;
}

/**
 * Editorial wordmark rendered in CSS — guarantees crisp scaling, theme-aware
 * color, and perfect spelling without bitmap assets.
 */
export const PressLogo = ({ name, className }: PressLogoProps) => {
  return (
    <span
      className={cn(
        "font-display tracking-tight leading-none select-none",
        "text-foreground/80",
        className,
      )}
      style={{ fontFamily: '"Playfair Display", "Cormorant Garamond", Georgia, serif' }}
    >
      {name}
    </span>
  );
};
