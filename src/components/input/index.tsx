import { twMerge } from 'tailwind-merge';
import ErrorMessage from '../message';

interface InputProps {
  type: string;
  placeholder: string;
  errorMessage?: string;
  register: any;
  name: string;
}

const Input = ({ type, placeholder, errorMessage, register, name }: InputProps) => {
  return (
    <div className='w-full'>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={twMerge(
          'px-4 py-2 rounded-md w-full border-2 text-lg focus:outline-none',
          errorMessage ? 'border-red-500' : 'border-indigo-500',
        )}
      />
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
  );
};

export default Input;
