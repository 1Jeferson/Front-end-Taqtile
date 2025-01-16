interface InfoRowProps {
  label: string;
  value: string;
}

const InfoRow = ({ label, value }: InfoRowProps) => {
  return (
    <div className='flex justify-between items-center'>
      <span className='font-semibold text-gray-700'>{label}</span>
      <span className='text-gray-900'>{value}</span>
    </div>
  );
};

export default InfoRow;
