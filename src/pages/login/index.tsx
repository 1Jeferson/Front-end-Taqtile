import Button from '../../components/button';

const Login = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-8 mt-8 p-10 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-[40%] m-auto rounded-2xl '>
      <h2 className='text-2xl font-semibold'>Bem-vindo(a) a Instaq</h2>

      <form className='flex flex-col justify-center items-center w-full gap-6'>
        <input
          type='email'
          placeholder='E-mail'
          className='p-3 rounded-2xl w-full border-indigo-500 border-2 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400'
        />

        <input
          type='password'
          placeholder='Senha'
          className='p-3 rounded-2xl w-full border-indigo-500 border-2 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400'
        />

        <Button>Entrar</Button>
      </form>
    </div>
  );
};

export default Login;
