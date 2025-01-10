import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { USERS } from '../../graphql/query';
import { IListUsers } from '../../interface';
import LoadingSpinner from '../../components/loading';
import ErrorMessage from '../../components/message';

const UserList = () => {
  const token = localStorage.getItem('token');

  const { data, loading, error } = useQuery<IListUsers>(USERS, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  useEffect(() => {
    if (error) {
      console.error('Erro da consulta:', error);
    }
  }, [error]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message='Erro ao carregar a lista de usuários.' />;

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
                  <td className='px-4 py-2'>
                    <div className='flex items-center justify-between'>
                      <span className='truncate max-w-xs'>{user.email}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
