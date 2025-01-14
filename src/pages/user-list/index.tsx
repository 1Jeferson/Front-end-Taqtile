import { useQuery } from '@apollo/client';
import { USERS } from '../../graphql/query';
import { IListUsers } from '../../interface';
import LoadingSpinner from '../../components/loading';
import ErrorMessage from '../../components/message';
import { useState } from 'react';
import Button from '../../components/button';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
  const token = localStorage.getItem('token');
  const [offset, setOffset] = useState(0);
  const limit = 20;

  const navigate = useNavigate();

  const { data, loading, error } = useQuery<IListUsers>(USERS, {
    variables: {
      userData: {
        offset: offset,
        limit: limit,
      },
    },
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
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
    <div className='flex justify-center items-center min-h-screen p-6'>
      <div className='w-full max-w-4xl bg-white p-6 rounded-lg shadow-md'>
        <h2 className='text-2xl font-semibold text-center mb-4 text-green-950'>Lista de Usuários</h2>

        <div className='overflow-x-auto'>
          <table className='min-w-full table-auto border-collapse'>
            <thead>
              <tr>
                <th className='px-4 py-2 text-left border-b font-semibold'>Nome</th>
                <th className='px-4 py-2 text-left border-b font-semibold'>E-mail</th>
              </tr>
            </thead>
            <tbody>
              {data?.users.nodes.map((user) => (
                <tr key={user.id} className='border-b'>
                  <td className='px-4 py-2'>{user.name}</td>
                  <td className='px-4 py-2'>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='flex justify-between items-center mt-4'>
          <Button
            onClick={handlePrevPage}
            disabled={offset === 0}
            variant={offset === 0 ? 'disabled' : 'primary'}
            className='px-4 py-2'
          >
            Anterior
          </Button>
          <span className='text-gray-700'>
            Página {currentPage} de {totalPages}
          </span>
          <Button
            onClick={handleNextPage}
            disabled={!pageInfo?.hasNextPage}
            variant={!pageInfo?.hasNextPage ? 'disabled' : 'primary'}
            className='px-4 py-2'
          >
            Próximo
          </Button>
          <Button
            onClick={() => navigate('/add-user')}
            variant='primary'
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
