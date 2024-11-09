import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../Components/Breadcrumbs/Breadcrumb';

const Viewed = () => {
  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Viewed" />
        <p>This page is currently under development.</p>
      </div>
    </>
  );
};

Viewed.layout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default Viewed;