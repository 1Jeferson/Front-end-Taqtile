import { UseFormRegister } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import ErrorMessage from '../message';
import { IUser } from '../../interface';
import { tv } from 'tailwind-variants';

interface InputProps {
  type: string;
  placeholder: string;
  errorMessage?: string;
  register: UseFormRegister<IUser>;
  name: keyof IUser;
}

const inputStyles = tv({
  base: 'px-4 py-2 rounded-md w-full border-2 text-lg focus:outline-none',
  variants: {
    hasError: {
      true: 'border-red-500',
      false: 'border-indigo-500',
    },
  },
  defaultVariants: {
    hasError: false,
  },
});

const Input = ({ type, placeholder, errorMessage, register, name }: InputProps) => {
  return (
    <div className='w-full'>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={twMerge(inputStyles({ hasError: !!errorMessage }))}
      />
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
  );
};

export default Input;
