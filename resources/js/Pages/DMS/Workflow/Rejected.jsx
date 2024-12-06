import React from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../Components/Breadcrumbs/Breadcrumb';

const Rejected = () => {
  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Rejected" />
        <p>This page is currently under development.</p>
      </div>
    </>
  );
};

Rejected.layout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default Rejected;