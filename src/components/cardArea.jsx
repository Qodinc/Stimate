import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils"

const CardVariants = cva(
  "shadow-2xl rounded-3xl ",
  {
    variants: {
      size: {
        default: "w-full max-w-[25.25rem] py-1",
        lg: "w-[100%] px-11 py-11",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const Card = React.forwardRef(({ className, size , asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"
    return (
      (<Comp
        className={cn(CardVariants({ size, className }))}
        ref={ref}
        {...props} />)
    );
  })
  Card.displayName = "div"
  
  
  export { Card, CardVariants }