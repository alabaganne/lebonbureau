/* LeBonBureau — Button. One component for the design system's pill buttons.
   Renders a Next <Link> when `href` is set, otherwise a native <button>.

   <Button variant="primary" size="lg" href="/cart">Passer la commande</Button>
   <Button variant="ghost" block onClick={...}>Ajouter au panier</Button>
*/

import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "dark" | "ghost";
type Size = "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  block?: boolean;
  className?: string;
  children: ReactNode;
}

function classes({ variant = "primary", size = "md", block, className }: BaseProps): string {
  return [
    "btn",
    `btn-${variant}`,
    size === "lg" ? "btn-lg" : "",
    block ? "btn-block" : "",
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
