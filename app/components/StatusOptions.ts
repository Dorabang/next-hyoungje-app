const statusOptions = (
  status: 'sale' | 'sold-out' | 'reservation' | string
) => {
  if (status === 'sale') {
    return '판매 중';
  } else if (status === 'sold-out') {
    return '판매 완료';
  } else {
    return '예약 중';
  }
};

export default statusOptions;
