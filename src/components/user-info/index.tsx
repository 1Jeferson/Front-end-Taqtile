interface UserInfoProps {
  label: string;
  value: string;
}

const UserInfo = ({ label, value }: UserInfoProps) => {
  return (
    <div className='flex justify-between items-center'>
      <span className='font-semibold text-gray-700'>{label}</span>
      <span className='text-gray-900'>{value}</span>
    </div>
  );
};

export default UserInfo;
