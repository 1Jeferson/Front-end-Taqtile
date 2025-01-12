import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: 'primary' | 'disabled';
}

const Button = ({ className, children, variant = 'primary', ...rest }: ButtonProps) => {
  const variantStyles = {
    primary: 'bg-indigo-500 hover:bg-indigo-700 text-white',
    disabled: 'bg-gray-300 cursor-not-allowed text-gray-500',
  };

  return (
    <button
      className={twMerge(
        'px-7 py-4 rounded-2xl font-bold transition-all duration-300',
        variantStyles[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
