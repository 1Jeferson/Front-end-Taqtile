import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const buttonStyles = tv({
  base: 'px-4 py-2 rounded-md font-bold transition-all duration-300',
  variants: {
    variant: {
      primary: 'bg-indigo-500 hover:bg-indigo-700 text-white',
      disabled: 'bg-gray-300 cursor-not-allowed text-gray-500',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

const Button = ({ className, disabled, children, ...rest }: ButtonProps) => {
  return (
    <button
      className={twMerge(buttonStyles({ variant: disabled ? 'disabled' : 'primary' }), className)}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
