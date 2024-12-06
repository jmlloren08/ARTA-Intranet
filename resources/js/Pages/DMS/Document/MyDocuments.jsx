import React from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../Components/Breadcrumbs/Breadcrumb';

const MyDocuments = () => {
  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="My Documents" />
        <p>This page is currently under development.</p>
      </div>
    </>
  );
};

MyDocuments.layout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default MyDocuments;