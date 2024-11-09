import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../Components/Breadcrumbs/Breadcrumb';

const Commendation = () => {
  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Commendation" />
        <p>This page is currently under development.</p>
      </div>
    </>
  );
};

Commendation.layout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default Commendation;