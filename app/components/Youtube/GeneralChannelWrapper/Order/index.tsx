import React from 'react';
import './index.css';
import { OrderType } from '..';

interface OrderProps {
  order: OrderType;
  setOrder: (order: OrderType) => void;
}

const Order = ({ order, setOrder }: OrderProps) => {
  const orderOptions: { title: string; type: 'latest' | 'text' }[] = [
    { title: '가나다순', type: 'text' },
    { title: '등록순', type: 'latest' },
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
