import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ className, children, ...rest }) => {
  return (
    <button
      className={`py-4 px-7 w-full font-bold text-white flex items-center justify-center rounded-2xl bg-indigo-500 hover:bg-indigo-700 transition-all duration-300 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
