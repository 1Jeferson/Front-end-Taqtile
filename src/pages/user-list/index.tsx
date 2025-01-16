import { useQuery } from '@apollo/client';
import { USERS_QUERY } from '../../graphql/query';
import { IListUsers } from '../../interface';
import LoadingSpinner from '../../components/loading';
import ErrorMessage from '../../components/message';
import { useState } from 'react';
import Button from '../../components/button';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
  const [offset, setOffset] = useState(0);
  const limit = 20;

  const navigate = useNavigate();

  const { data, loading, error } = useQuery<IListUsers>(USERS_QUERY, {
    variables: {
      userData: {
        offset: offset,
        limit: limit,
      },
    },
  });

  const handleNextPage = () => {
    if (data?.users?.pageInfo?.hasNextPage) {
      setOffset((prevOffset) => prevOffset + limit);
    }
  };

  const pageInfo = data?.users?.pageInfo;

  const handlePrevPage = () => {
    if (data?.users?.pageInfo?.hasPreviousPage) {
      setOffset((prevOffset) => Math.max(prevOffset - limit, 0));
    }
  };

  const handleUserDetails = (userId: string) => {
    navigate(`/user-details/${userId}`);
  };

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

  const currentPage = Math.floor(offset / limit) + 1;
  const totalCount = data?.users?.count || 0;
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className='flex justify-center items-center p-6'>
      <div className='w-full max-w-4xl bg-white p-6 rounded-lg shadow-md'>
        <h2 className='text-2xl font-semibold text-center mb-4 text-green-950'>Lista de Usuários</h2>

        <div className='space-y-6'>
          {data?.users.nodes.map((user) => (
            <div key={user.id} className='flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-4'>
              <div className='flex flex-col sm:flex-row w-full sm:w-2/3 gap-4'>
                <div className='flex flex-col w-full'>
                  <span className='font-semibold text-gray-600'>Nome</span>
                  <span>{user.name}</span>
                </div>
                <div className='flex flex-col w-full'>
                  <span className='font-semibold text-gray-600'>E-mail</span>
                  <span>{user.email}</span>
                </div>
              </div>

              <div className='mt-4 sm:mt-0 sm:flex sm:items-center'>
                <Button className='w-full sm:w-auto' onClick={() => handleUserDetails(user.id)}>
                  Detalhes
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className='flex justify-between items-center mt-4'>
          <Button onClick={handlePrevPage} disabled={offset === 0}>
            Anterior
          </Button>
          <span className='text-gray-700'>
            Página {currentPage} de {totalPages}
          </span>
          <Button onClick={handleNextPage} disabled={!pageInfo?.hasNextPage}>
            Próximo
          </Button>

          <Button
            onClick={() => navigate('/add-user')}
            className='fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center text-2xl'
          >
            +
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserList;
