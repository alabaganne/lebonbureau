/* LeBonBureau — Button. One component for the design system's pill buttons.
   Renders a Next <Link> when `href` is set, otherwise a native <button>.

   <Button variant="primary" size="lg" href="/cart">Passer la commande</Button>
   <Button variant="ghost" block onClick={...}>Ajouter au panier</Button>
*/

import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "dark" | "ghost" | "light";
type Size = "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  block?: boolean;
  className?: string;
  children: ReactNode;
}

const baseClasses =
  "inline-flex items-center justify-center text-center gap-[10px] border border-transparent rounded-full px-6 py-[13px] font-semibold text-[15px] tracking-[.01em] whitespace-nowrap transition-[transform,background,color,border-color] duration-200 ease-out active:translate-y-px";

const variantClasses: Record<Variant, string> = {
  primary: "bg-green text-white hover:bg-green-deep",
  dark: "bg-ink text-white hover:bg-black",
  ghost: "bg-transparent text-ink border-line hover:border-ink",
  light: "bg-white text-green-deep hover:bg-sand",
};

const sizeClasses: Record<Size, string> = {
  md: "",
  lg: "px-[30px] py-4 text-base",
};

function classes({ variant = "primary", size = "md", block, className }: BaseProps): string {
  return [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    block ? "w-full justify-center" : "",
    className || "",
  ]
    .filter(Boolean)
    .join(" ");
}

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & { href?: undefined };

type ButtonAsLink = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "href"> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export default function Button(props: ButtonProps) {
  const { variant, size, block, className, children } = props;
  const cls = classes({ variant, size, block, className, children });

  if ("href" in props && props.href !== undefined) {
    const { href, variant: _v, size: _s, block: _b, className: _c, children: _ch, ...rest } =
      props as ButtonAsLink;
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, block: _b, className: _c, children: _ch, ...rest } =
    props as ButtonAsButton;
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
