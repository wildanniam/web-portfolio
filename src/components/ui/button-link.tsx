import Link from "next/link";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "text";
  className?: string;
};

const variantClasses = {
  primary:
    "bg-ink-900 text-paper-0 border-ink-900 hover:-translate-y-0.5 hover:bg-ember-700 hover:border-ember-700",
  secondary:
    "border-line-200 bg-paper-0/70 text-ink-900 hover:-translate-y-0.5 hover:border-ink-700 hover:bg-paper-1",
  text: "border-transparent px-0 text-ember-700 hover:text-ink-900",
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
