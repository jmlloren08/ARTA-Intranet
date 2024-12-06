import React from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../Components/Breadcrumbs/Breadcrumb';

const InProgress = () => {
  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="In Progress" />
        <p>This page is currently under development.</p>
      </div>
    </>
  );
};

InProgress.layout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default InProgress;