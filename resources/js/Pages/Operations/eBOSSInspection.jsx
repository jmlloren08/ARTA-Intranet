import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../Components/Breadcrumbs/Breadcrumb';
import { Head } from '@inertiajs/react';

const eBOSSInspection = () => {
  return (
    <>
      <Head title="eBOSS Inspection" />
      <div className="mx-auto max-w-full">
        <Breadcrumb pageName="List" />
        <div className="flex flex-col gap-y-4 rounded-sm border border-stroke bg-white p-3 mb-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:flex-row sm:items-center sm:justify-between">
          <div className='flex flex-col items-start sm:items-center'>
            <button
              // onClick={openAddModal}
              className='flex items-center gap-2 rounded bg-primary py-2 px-4.5 font-medium text-white hover:bg-opacity-90'
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add New Inspection
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

eBOSSInspection.layout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default eBOSSInspection;