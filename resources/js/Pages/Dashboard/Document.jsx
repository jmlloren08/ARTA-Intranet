import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '@/Components/Breadcrumbs/Breadcrumb';

const Document = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      </div>
    </>
  );
};

Document.layout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default Document;
