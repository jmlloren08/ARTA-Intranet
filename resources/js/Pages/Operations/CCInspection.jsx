import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../Components/Breadcrumbs/Breadcrumb';

const CCInspection = () => {
  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="CC Inspection" />
        <p>This page is currently under development.</p>
      </div>
    </>
  );
};

CCInspection.layout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default CCInspection;