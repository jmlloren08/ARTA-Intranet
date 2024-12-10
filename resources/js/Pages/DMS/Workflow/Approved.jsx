import React from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../Components/Breadcrumbs/Breadcrumb';

const Approved = () => {
  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Approved" />
        <p>This page is currently under development.</p>
      </div>
    </>
  );
};

Approved.layout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default Approved;