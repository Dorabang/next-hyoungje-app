import { useContext } from 'react';
import { InputContext } from '@/components/Edit/Input';

const useInputContext = () => {
  const context = useContext(InputContext);

  if (context === undefined) {
    throw new Error('<Input /> 태그 안에서 사용해주세요.');
  }
  return context;
};

export default useInputContext;
