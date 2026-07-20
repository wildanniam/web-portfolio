import Link from "next/link";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "text" | "hero-primary" | "hero-secondary";
  className?: string;
};

const variantClasses = {
  primary:
    "bg-ink-900 text-paper-0 border-ink-900 hover:-translate-y-0.5 hover:bg-ember-700 hover:border-ember-700",
  secondary:
    "border-line-200 bg-paper-0/70 text-ink-900 hover:-translate-y-0.5 hover:border-ink-700 hover:bg-paper-1",
  text: "border-transparent px-0 text-ember-700 hover:text-ink-900",
  "hero-primary":
    "border-paper-0 bg-paper-0 text-ink-900 hover:-translate-y-0.5 hover:border-[#F2A47E] hover:bg-[#F2A47E]",
  "hero-secondary":
    "border-white/38 bg-black/24 text-paper-0 hover:-translate-y-0.5 hover:border-white/68 hover:bg-black/48",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonLinkProps) {
  const classes = `inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-semibold transition-[transform,background-color,border-color,color] duration-200 active:translate-y-px ${variantClasses[variant]} ${className}`;
  const isExternal = href.startsWith("http");

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
