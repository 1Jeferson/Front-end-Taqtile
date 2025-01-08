import { useState } from 'react';
import Button from '../../components/button';
import ErrorMessage from '../../components/message';
import { twMerge } from 'tailwind-merge';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({
    email: '',
    password: '',
  });

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) {
      newErrors.email = 'E-mail é obrigatório';
    }

    if (!password) {
      newErrors.password = 'Senha é obrigatório';
    } else if (password.length < 7) {
      newErrors.password = 'Senha deve ter no mínimo 7 caracteres.';
    } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(password)) {
      newErrors.password = 'Senha deve conter pelo menos um número e uma letra.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Formulário enviado com sucesso!', { email, password });
    }
  };

  return (
    <div className='flex flex-col justify-center items-center gap-8 mt-8 p-10 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-[40%] m-auto rounded-2xl '>
      <div className='flex flex-col justify-center items-center w-full h-1/2 p-8 rounded-2xl '>
        <h2 className='text-2xl text-center font-semibold py-4'>Bem-vindo(a) a Instaq</h2>

        <form className='flex flex-col justify-center items-center w-full gap-6' onSubmit={handleSubmit}>
          <div className='w-full'>
            <input
              type='email'
              placeholder='E-mail'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={twMerge(
                'p-3 rounded-2xl w-full border-2 text-lg focus:outline-none',
                errors.email ? 'border-red-500' : 'border-indigo-500',
              )}
            />
            <ErrorMessage message={errors.email} />
          </div>

          <div className='w-full'>
            <input
              type='password'
              placeholder='Senha'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={twMerge(
                'p-3 rounded-2xl w-full border-2 text-lg focus:outline-none',
                errors.email ? 'border-red-500' : 'border-indigo-500',
              )}
            />
            <ErrorMessage message={errors.password} />
          </div>
          <Button>Entrar</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
