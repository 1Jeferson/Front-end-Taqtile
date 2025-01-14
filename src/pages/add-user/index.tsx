import LoadingSpinner from '../../components/loading';
import ErrorMessage from '../../components/message';
import Button from '../../components/button';
import { IUser } from '../../interface';
import { USERS } from '../../graphql/query';
import { twMerge } from 'tailwind-merge';
import { useForm } from 'react-hook-form';
import { REGISTER } from '../../graphql/mutation';
import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { ValidationCreateUserSchema } from '../../schemas';

const AddUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    resolver: zodResolver(ValidationCreateUserSchema),
  });

  const navigate = useNavigate();

  const [registerUser, { loading, error }] = useMutation(REGISTER, {
    onCompleted: () => {
      navigate('/user-list');
    },
    refetchQueries: [{ query: USERS }],
  });

  const onSubmit = async (data: IUser) => {
    try {
      await registerUser({ variables: { createUser: data } });
    } catch (error) {}
  };

  return (
    <div className='flex flex-col justify-center items-center gap-8 mt-8 p-10 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-[40%] m-auto rounded-2xl'>
      <Button className='self-start px-4 py-2 rounded-md' onClick={() => navigate(-1)}>
        Voltar
      </Button>
      <div className='flex flex-col justify-center items-center w-full h-1/2 p-8 rounded-2xl'>
        <h2 className='text-2xl text-center font-semibold py-4 text-green-950'>Adicionar Novo Usuário</h2>

        <form className='flex flex-col justify-center items-center w-full gap-6' onSubmit={handleSubmit(onSubmit)}>
          <div className='w-full'>
            <input
              type='text'
              placeholder='Nome Completo'
              {...register('name')}
              className={twMerge(
                'p-3 rounded-md w-full border-2 text-lg focus:outline-none',
                errors.name ? 'border-red-500' : 'border-indigo-500',
              )}
            />
            <ErrorMessage message={errors.name?.message} />
          </div>

          <div className='w-full'>
            <input
              type='email'
              placeholder='E-mail'
              {...register('email')}
              className={twMerge(
                'p-3 rounded-md w-full border-2 text-lg focus:outline-none',
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
                'p-3 rounded-md w-full border-2 text-lg focus:outline-none',
                errors.password ? 'border-red-500' : 'border-indigo-500',
              )}
            />
            <ErrorMessage message={errors.password?.message} />
          </div>

          <div className='w-full'>
            <input
              type='tel'
              placeholder='Telefone'
              {...register('phone')}
              className={twMerge(
                'p-3 rounded-md w-full border-2 text-lg focus:outline-none',
                errors.phone ? 'border-red-500' : 'border-indigo-500',
              )}
            />
            <ErrorMessage message={errors.phone?.message} />
          </div>

          <div className='w-full'>
            <input
              type='date'
              placeholder='Data de Nascimento'
              {...register('birthDate')}
              className={twMerge(
                'p-3 rounded-md w-full border-2 text-lg focus:outline-none',
                errors.birthDate ? 'border-red-500' : 'border-indigo-500',
              )}
            />
            <ErrorMessage message={errors.birthDate?.message} />
          </div>

          <div className='w-full'>
            <select
              {...register('role')}
              className={twMerge(
                'p-3 rounded-md w-full border-2 text-lg focus:outline-none',
                errors.role ? 'border-red-500' : 'border-indigo-500',
              )}
            >
              <option value='user'>User</option>
              <option value='admin'>Admin</option>
            </select>

            <ErrorMessage message={errors.role?.message} />
          </div>

          {error && <ErrorMessage message={error.message} />}

          <Button className='w-full' disabled={loading}>
            {loading ? <LoadingSpinner /> : 'Adicionar Usuário'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
