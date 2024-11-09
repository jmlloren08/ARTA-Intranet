import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../Components/Breadcrumbs/Breadcrumb';

const eBOSSInspection = () => {
  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="eBOSS Inspection" />
        <p>This page is currently under development.</p>
      </div>
    </>
  );
};

eBOSSInspection.layout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default eBOSSInspection;