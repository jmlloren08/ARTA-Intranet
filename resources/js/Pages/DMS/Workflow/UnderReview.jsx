import React from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../Components/Breadcrumbs/Breadcrumb';

const UnderReview = () => {
  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Under Review" />
        <p>This page is currently under development.</p>
      </div>
    </>
  );
};

UnderReview.layout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default UnderReview;