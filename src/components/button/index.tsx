import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button = ({ className, children, ...rest }: ButtonProps) => {
  return (
    <button
      className={twMerge(
        'py-4 px-7 w-full font-bold text-white flex items-center justify-center rounded-2xl bg-indigo-500 hover:bg-indigo-700 transition-all duration-300',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
