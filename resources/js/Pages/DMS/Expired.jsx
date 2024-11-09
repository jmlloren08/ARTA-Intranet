import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../Components/Breadcrumbs/Breadcrumb';

const Expired = () => {
  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Expired" />
        <p>This page is currently under development.</p>
      </div>
    </>
  );
};

Expired.layout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default Expired;