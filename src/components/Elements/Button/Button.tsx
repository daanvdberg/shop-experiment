import classnames from "classnames";
import { ButtonHTMLAttributes, PropsWithChildren, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "google";
}

export const Button = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<ButtonProps>
>(({ variant = "primary", children, className, ...rest }, ref) => {
  const defaultStyles =
    "h-10 px-4 inline-flex font-normal text-sm uppercase items-center justify-center min-w-[100px] rounded transition-all";
  let variantStyles = "bg-slate-700 hover:bg-slate-600 text-white";

  if (variant === "secondary") {
    variantStyles =
      "bg-transparent border border-slate-700 hover:bg-slate-700 hover:text-white";
  }

  if (variant === "danger") {
    variantStyles = "bg-rose-600 border-rose-700 hover:bg-rose-700 text-white";
  }

  if (variant === "google") {
    variantStyles = "bg-[#4285F4] hover:bg-[#306ccc] text-white";
  }

  return (
    <button
      className={classnames(defaultStyles, variantStyles, className)}
      ref={ref}
      {...rest}
    >
      {children}
    </button>
  );
});
