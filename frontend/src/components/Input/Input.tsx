import React, { InputHTMLAttributes, useState } from "react";
import { PreviewOpen, PreviewCloseOne } from "@icon-park/react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  sizeClass?: string;
  fontClass?: string;
  rounded?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      sizeClass = "h-11 px-4 py-3",
      fontClass = "text-sm font-normal",
      rounded = "rounded-full",
      children,
      type = "text",
      ...args
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="relative">
        <input
          ref={ref}
          type={showPassword ? "text" : type}
          className={`block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 ${rounded} ${fontClass} ${sizeClass} ${className}`}
          {...args}
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute inset-y-0 right-2 flex items-center px-2 text-neutral-500 dark:text-neutral-400"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <PreviewCloseOne theme="outline" size="24" /> : <PreviewOpen theme="outline" size="24" />}
          </button>
        )}
      </div>
    );
  }
);

export default Input;
