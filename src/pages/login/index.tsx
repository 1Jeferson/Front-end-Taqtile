import { useMutation } from '@apollo/client';
import { twMerge } from 'tailwind-merge';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button';
import ErrorMessage from '../../components/message';
import { LOGIN } from '../../graphql/mutation';
import { ValidationLoginSchema } from '../../schemas';
import LoadingSpinner from '../../components/loading';

interface LoginData {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(ValidationLoginSchema),
  });

  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const [login, { loading }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.login.token);
      navigate('/user-list');
    },
    onError: (err) => {
      console.error('Erro no login:', err);
      setError('Falha ao fazer login. Tente novamente.');
    },
  });

  const onSubmit = async (data: LoginData) => {
    setError(null);

    try {
      await login({
        variables: {
          data,
        },
      });
    } catch {}
  };

  return (
    <div className='flex flex-col justify-center items-center gap-8 mt-8 p-10 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-[40%] m-auto rounded-2xl'>
      <div className='flex flex-col justify-center items-center w-full h-1/2 p-8 rounded-2xl'>
        <h2 className='text-2xl text-center font-semibold py-4 text-green-950'>Bem-vindo(a) a Instaq</h2>

        <form className='flex flex-col justify-center items-center w-full gap-6' onSubmit={handleSubmit(onSubmit)}>
          <div className='w-full'>
            <input
              type='email'
              placeholder='E-mail'
              {...register('email')}
              className={twMerge(
                'p-3 rounded-2xl w-full border-2 text-lg focus:outline-none',
                errors.email ? 'border-red-500' : 'border-indigo-500',
              )}
            />
            <ErrorMessage message={errors.email?.message} />
          </div>

          <div className='w-full'>
            <input
              type='password'
              placeholder='Senha'
              {...register('password')}
              className={twMerge(
                'p-3 rounded-2xl w-full border-2 text-lg focus:outline-none',
                errors.password ? 'border-red-500' : 'border-indigo-500',
              )}
            />
            <ErrorMessage message={errors.password?.message} />
          </div>

          {error && <ErrorMessage message={error} />}

          <Button disabled={loading}>{loading ? <LoadingSpinner /> : 'Entrar'}</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
