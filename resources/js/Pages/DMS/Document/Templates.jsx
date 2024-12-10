import React from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../Components/Breadcrumbs/Breadcrumb';

const Templates = () => {
  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Templates" />
        <p>This page is currently under development.</p>
      </div>
    </>
  );
};

Templates.layout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default Templates;