
import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative group rounded-xl border border-white/20 shadow-2xl shadow-black/50 overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-purple-500/20",
        className
      )}
      {...props}
    >
      {/* Glass background layer */}
      <div
        className="absolute inset-0 rounded-xl bg-cover bg-center blur-xl scale-110"
        style={{ backgroundImage: "url('/gravel.svg')" }}
      />
      {/* Semi-transparent overlay for tint */}
      <div className="absolute inset-0 rounded-xl bg-black/50" />

      {/* Gradient hover effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-60 transition-opacity duration-300" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-xl font-semibold leading-none tracking-tight text-slate-50 [text-shadow:0_1px_0_rgb(0_0_0_/_50%)]", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-slate-50/80 [text-shadow:0_1px_0_rgb(0_0_0_/_50%)]", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
