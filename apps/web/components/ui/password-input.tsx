import * as React from "react";
import { Input } from "./input";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { LuEye, LuEyeOff } from "react-icons/lu";

const PasswordInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        className={cn(className)}
        ref={ref}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute right-0 top-0 hover:bg-transparent h-full px-3 py-2"
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? <LuEyeOff /> : <LuEye />}
      </Button>
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
