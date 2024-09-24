import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils"
const buttonVariants = cva(
  "items-center inline-flex whitespace-nowrap rounded-lg text-baseM font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300 md:text-base border-2 gap-2 justify-center",
  {
    variants: {
      variant: {
        default: "hover:bg-lightAccent hover:border-lightAccent text-white font-medium bg-accent border-accent",
        destructive:
          "hover:bg-red-400 hover:border-red-400 text-white font-medium bg-red-500 border-red-500",
        outline:
          "hover:bg-accentBackground hover:border-lightAccent text-accent font-medium bg-background border-accent",
      },
      size: {
        default: "h-10 px-4 py-2",
        lg: "h-11 px-8",
        full:"h-11 px-8 w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"


export { Button, buttonVariants }