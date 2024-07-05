import { ReactNode } from 'react';

import './index.css';

interface TootipProps {
  children?: ReactNode;
  desc?: string;
}

const Tooltip = ({ children, desc }: TootipProps) => {
  return (
    <div className={`tooltipWrapper`}>
      <span>{children}</span>
      <div className='tooltip after:block before:block absolute -right-8 -top-[68px]'>
        {desc}
      </div>
    </div>
  );
};

export default Tooltip;
