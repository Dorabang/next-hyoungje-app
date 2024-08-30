export type Status = 'sale' | 'sold-out' | 'reservation' | 'all';

const statusOptions = (status?: Status) => {
  if (!status) return;
  let value;

  if (status === 'sale') {
    value = '판매 중';
  } else if (status === 'sold-out') {
    value = '판매 완료';
  } else {
    value = '예약 중';
  }

  return (
    <span
      className={`
        px-3 py-[2px]
        rounded-full
        text-sm
        border
        cursor-default
        ${status === 'sale' ? 'border-sky-500 text-sky-500' : ''}
        ${status === 'sold-out' ? 'border-gray-500 text-gray-500' : ''}
        ${status === 'reservation' ? 'border-rose-500 text-rose-500' : ''}
`}
    >
      {value}
    </span>
  );
};

export default statusOptions;
