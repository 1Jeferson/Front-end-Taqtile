import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { USER_BY_ID_QUERY } from '../../graphql/query';
import LoadingSpinner from '../../components/loading';
import ErrorMessage from '../../components/message';
import Button from '../../components/button';
import UserInfo from '../../components/user-info';

const UserDetails = () => {
  const { userId } = useParams<{ userId: string }>();
  const { data, loading, error } = useQuery(USER_BY_ID_QUERY, {
    variables: { userId },
  });

  const navigate = useNavigate();

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    const apiErrorMessage = error.graphQLErrors?.[0]?.message;
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <ErrorMessage message={apiErrorMessage} />
      </div>
    );
  }

  return (
    <div className='flex justify-center items-center p-6'>
      <div className='w-full max-w-2xl bg-white p-6 rounded-lg shadow-md'>
        <Button className='self-start mb-8' onClick={() => navigate('/user-list')}>
          Voltar
        </Button>
        <h2 className='text-2xl font-semibold text-center mb-6 text-green-950'>Detalhes do Usuário</h2>

        <div className='space-y-4'>
          <UserInfo label='Nome' value={data?.user?.name} />
          <UserInfo label='E-mail' value={data?.user?.email} />
          <UserInfo label='Telefone' value={data?.user?.phone} />
          <UserInfo label='Data de Nascimento' value={data?.user?.birthDate} />
          <UserInfo label='Função' value={data?.user?.role} />
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
