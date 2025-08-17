import React from "react";

type InputFieldProps = {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = "outlined",
  size = "md",
}) => {
  // Size styles
  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-3 text-lg",
  };

  // Variant styles
  const variantClasses = {
    outlined: `border ${invalid ? "border-red-500" : "border-gray-300"} bg-white`,
    filled: `bg-gray-100 ${invalid ? "border border-red-500" : "border border-gray-200"}`,
    ghost: `bg-transparent border-b ${invalid ? "border-red-500" : "border-gray-300"}`,
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
      )}

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`rounded-lg focus:outline-none focus:ring-2 ${
          invalid
            ? "focus:ring-red-500"
            : "focus:ring-blue-500 focus:border-blue-500"
        } ${variantClasses[variant]} ${sizeClasses[size]} ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      />

      {helperText && !errorMessage && (
        <span className="text-xs text-gray-500">{helperText}</span>
      )}
      {errorMessage && (
        <span className="text-xs text-red-500">{errorMessage}</span>
      )}
    </div>
  );
};

export default InputField;
