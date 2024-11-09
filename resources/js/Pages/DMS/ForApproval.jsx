import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../Components/Breadcrumbs/Breadcrumb';

const ForApproval = () => {
  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="For Approval" />
        <p>This page is currently under development.</p>
      </div>
    </>
  );
};

ForApproval.layout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default ForApproval;