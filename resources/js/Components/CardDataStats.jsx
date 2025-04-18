import { Link } from '@inertiajs/react';
import React from 'react';

const CardDataStats = ({
  title,
  total,
  children,
  link
}) => {
  return (
    <div className='rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark transition ease-in-out duration-300'>
      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4
            className='text-title-xl font-bold text-black dark:text-white hover:cursor-pointer'
          >
            <Link
              href={link}
            >
              {total}
            </Link>
          </h4>
          <span className="text-sm font-medium">{title}</span>
        </div>
        <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4 hover:bg">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CardDataStats;
