import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../Components/Breadcrumbs/Breadcrumb';

const Draft = () => {
  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Draft" />
        <p>This page is currently under development.</p>
      </div>
    </>
  );
};

Draft.layout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default Draft;