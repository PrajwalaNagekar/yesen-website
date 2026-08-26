import logoAsset from "@/assets/yesen-logo.svg";

type LogoProps = {
  className?: string;
  variant?: "dark" | "light";
  /** kept for API compatibility with previous wordmark component */
  showTagline?: boolean;
};

/**
 * Official YESEN Technologies Pvt Ltd logo, cropped to the artwork bounds of the
 * supplied file. The white plate baked into the source file is knocked out
 * to transparency so the mark sits directly on any background.
 */
export function Logo({ className = "", variant = "dark" }: LogoProps) {
  const filterId = `yesen-knockout-${variant}`;

  return (
    <svg
      viewBox="60 265 1360 425"
      role="img"
      aria-label="YESEN Technologies Pvt Ltd — Technology by Nature"
      className={className}
    >
      <defs>
        <filter id={filterId} colorInterpolationFilters="sRGB">
          {/* alpha = 3 - (r+g+b) → pure white becomes fully transparent */}
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    -1 -1 -1 0 3"
          />
        </filter>
      </defs>
      <image
        href={logoAsset}
        x="0"
        y="0"
        width="1536"
        height="1024"
        style={{
          filter:
            variant === "light"
              ? `url(#${filterId}) brightness(0) invert(1)`
              : `url(#${filterId})`,
        }}
      />
    </svg>
  );
}

export default Logo;
