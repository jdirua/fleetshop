import React from "react";
import { cn } from "@/lib/utils";

const PageHeader = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mb-6", className)} {...props}>
    {children}
  </div>
);

const PageHeaderTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h1
    className={cn(
      "text-2xl font-bold tracking-tight text-slate-50",
      className
    )}
    {...props}
  />
);

const PageHeaderDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p
    className={cn("mt-1 text-sm text-slate-400", className)}
    {...props}
  />
);

export { PageHeader, PageHeaderTitle, PageHeaderDescription };
