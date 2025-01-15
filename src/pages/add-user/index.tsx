import { useState } from 'react';
import { ValidationCreateUserSchema } from '../../schemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { twMerge } from 'tailwind-merge';
import { IUser } from '../../interface';
import { USERS_QUERY } from '../../graphql/query';
import { REGISTER_MUTATION } from '../../graphql/mutation';
import Button from '../../components/button';
import Input from '../../components/input';
import ErrorMessage from '../../components/message';
import LoadingSpinner from '../../components/loading';

const AddUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    resolver: zodResolver(ValidationCreateUserSchema),
  });

  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);

  const [registerUser, { loading }] = useMutation(REGISTER_MUTATION, {
    onCompleted: () => {
      navigate('/user-list');
    },
    onError: () => {
      setError('Erro ao adicionar usuário. Tente novamente.');
    },
    refetchQueries: [{ query: USERS_QUERY }],
  });

  const onSubmit = async (data: IUser) => {
    setError(null);
    await registerUser({ variables: { createUser: data } });
  };

  return (
    <div className='flex flex-col justify-center items-center gap-8 mt-8 p-10 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-[40%] m-auto rounded-2xl'>
      <Button className='self-start' onClick={() => navigate('/user-list')}>
        Voltar
      </Button>
      <div className='flex flex-col justify-center items-center w-full h-1/2 p-8 rounded-2xl'>
        <h2 className='text-2xl text-center font-semibold py-4 text-green-950'>Adicionar Novo Usuário</h2>

        <form className='flex flex-col justify-center items-center w-full gap-6' onSubmit={handleSubmit(onSubmit)}>
          <Input type='text' name='name' placeholder='Nome' register={register} errorMessage={errors.name?.message} />
          <Input
            type='email'
            name='email'
            placeholder='Email'
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
          <Input
            type='text'
            name='phone'
            placeholder='Telefone'
            register={register}
            errorMessage={errors.phone?.message}
          />
          <Input
            type='date'
            name='birthDate'
            placeholder='Data de Nascimento'
            register={register}
            errorMessage={errors.birthDate?.message}
          />
          <div className='w-full'>
            <select
              {...register('role')}
              className={twMerge(
                'p-2 rounded-md w-full border-2 text-lg focus:outline-none',
                errors.role ? 'border-red-500' : 'border-indigo-500',
              )}
            >
              <option value='user'>User</option>
              <option value='admin'>Admin</option>
            </select>

            <ErrorMessage message={errors.role?.message} />
          </div>

          {error && <ErrorMessage message={error} />}

          <Button className='w-full' disabled={loading}>
            {loading ? <LoadingSpinner /> : 'Adicionar Usuário'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
