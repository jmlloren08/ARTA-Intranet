import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../Components/Breadcrumbs/Breadcrumb';

const Orientation = () => {
  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Orientation" />
        <p>This page is currently under development.</p>
      </div>
    </>
  );
};

Orientation.layout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default Orientation;