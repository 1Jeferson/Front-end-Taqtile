import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button';
import ErrorMessage from '../../components/message';
import { LOGIN_MUTATION } from '../../graphql/mutation';
import { ValidationLoginSchema } from '../../schemas';
import LoadingSpinner from '../../components/loading';
import Input from '../../components/input';
import { IUser } from '../../interface';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    resolver: zodResolver(ValidationLoginSchema),
  });

  const navigate = useNavigate();

  const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.login.token);
      navigate('/user-list');
    },
  });

  const onSubmit = async (data: IUser) => {
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
          <Input
            type='email'
            name='email'
            placeholder='E-mail'
            register={register}
            errorMessage={errors.email?.message}
          />
          <Input
            type='password'
            name='password'
            placeholder='Senha'
            register={register}
            errorMessage={errors.password?.message}
          />

          {error && <ErrorMessage message={error.message} />}

          <Button className='w-full' disabled={loading}>
            {loading ? <LoadingSpinner /> : 'Entrar'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
