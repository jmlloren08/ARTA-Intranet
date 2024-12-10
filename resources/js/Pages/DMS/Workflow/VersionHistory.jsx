import React from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../Components/Breadcrumbs/Breadcrumb';

const VersionHistory = () => {
  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Version History" />
        <p>This page is currently under development.</p>
      </div>
    </>
  );
};

VersionHistory.layout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default VersionHistory;