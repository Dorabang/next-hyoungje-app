import React from 'react';
import './index.css';
import { SortType } from '..';

interface OrderProps {
  order: SortType;
  setOrder: (order: SortType) => void;
}

const Order = ({ order, setOrder }: OrderProps) => {
  const orderOptions: { title: string; type: SortType }[] = [
    { title: '가나다순', type: 'name' },
    { title: '등록순', type: 'createdAt' },
  ];

  return (
    <ul className='order'>
      {orderOptions.map(({ title, type }) => (
        <li
          key={title}
          className={`flex items-center cursor-pointer
            hover:text-grayColor-100 active:text-grayColor-100
            transition-colors
            ${order === type ? 'text-grayColor-100' : ''}`}
          onClick={() => setOrder(type)}
        >
          <span>{title}</span>
        </li>
      ))}
    </ul>
  );
};

export default Order;
