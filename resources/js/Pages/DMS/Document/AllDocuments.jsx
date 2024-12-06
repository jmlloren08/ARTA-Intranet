import React from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../Components/Breadcrumbs/Breadcrumb';

const AllDocuments = () => {
  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="All Documents" />
        <p>This page is currently under development.</p>
      </div>
    </>
  );
};

AllDocuments.layout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default AllDocuments;