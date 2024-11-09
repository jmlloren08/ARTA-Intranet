import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../Components/Breadcrumbs/Breadcrumb';

const Sent = () => {
  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Sent" />
        <p>This page is currently under development.</p>
      </div>
    </>
  );
};

Sent.layout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default Sent;