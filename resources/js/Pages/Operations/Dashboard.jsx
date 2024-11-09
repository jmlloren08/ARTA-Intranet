import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../Components/Breadcrumbs/Breadcrumb';

const Dashboard = () => {
  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Dashboard" />
        <p>This page is currently under development.</p>
      </div>
    </>
  );
};

Dashboard.layout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default Dashboard;