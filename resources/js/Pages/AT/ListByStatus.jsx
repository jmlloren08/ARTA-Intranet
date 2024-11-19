import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DefaultLayout from '../../layout/DefaultLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import Breadcrumb from '../../Components/Breadcrumbs/Breadcrumb';

const ListByStatus = () => {

  const [activitiesWhereStatus, setActivitiesWhereStatus] = useState([]);
  const { selectedStatus } = usePage().props;

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get('/get-activities-where-status', {
          params: { status: selectedStatus || null }
        });
        setActivitiesWhereStatus(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    }
    if (selectedStatus) {
      fetchActivities();
    }
  }, [selectedStatus]);

  return (
    <>
      <div className="mx-auto max-w-270">
        <Head title="List By Status" />
        <Breadcrumb pageName={selectedStatus} />
        <div className='flex flex-col gap-y-4 rounded-sm border border-stroke bg-white p-3 mb-12 shadow-default dark:border-strokedark dark:bg-boxdark sm:flex-row sm:items-center sm:justify-between'>
          <div className='flex flex-col gap-4 2xsm:flex-row 2xsm:items-center'>
            <div className='flex -space-x-2'></div>
            <div>
              <Link
                href='/'
                className='flex items-center gap-2 rounded bg-primary py-2 px-4.5 font-medium text-white hover:bg-opacity-90'
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <div className='mb-6'>
              <h5 className="text-xl font-semibold text-black dark:text-white">
                List of activities ({selectedStatus})
              </h5>
            </div>
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[300px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">Work item</th>
                  <th className="min-w-[300px] py-4 px-4 font-medium text-black dark:text-white">Description</th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">Category</th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">Status</th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">Complexity</th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">Start date</th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">Due date</th>
                  <th className="min-w-[200px] py-4 px-4 font-medium text-black dark:text-white">Assigned to</th>
                  <th className="min-w-[200px] py-4 px-4 font-medium text-black dark:text-white">Key stakeholders</th>
                  <th className="min-w-[300px] py-4 px-4 font-medium text-black dark:text-white">Action Items and Notes</th>
                </tr>
              </thead>
              <tbody>
                {activitiesWhereStatus.length < 1 ? (
                  <tr>
                    <td colSpan="10" className="text-center py-4 px-4 text-black dark:text-white">
                      No activities found.
                    </td>
                  </tr>
                ) : (
                  activitiesWhereStatus.map((activityItem, key) => (
                    <tr key={key}>
                      <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white">
                          {activityItem.work_item}
                        </h5>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-sm">{activityItem.description}</p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-sm">{activityItem.category}</p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark whitespace-nowrap">
                        <p className={`inline-flex rounded-full bg-opacity-10 py-1 px-4 text-sm whitespace-nowrap
                      ${activityItem.progress === 'Completed' ? 'bg-success text-success' : activityItem.progress === 'In progress' ? 'bg-primary text-primary' : activityItem.progress === 'Not started' ? 'bg-warning text-warning' : 'bg-danger text-danger'}`}>{activityItem.progress}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className={`inline-flex rounded-full bg-opacity-10 py-1 px-4 text-sm whitespace-nowrap
                      ${activityItem.complexity === 'Simple' ? 'bg-primary text-primary' : activityItem.complexity === 'Complex' ? 'bg-warning text-warning' : 'bg-danger text-danger'}`}>
                          {activityItem.complexity}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark whitespace-nowrap">
                        <p className="text-sm">{activityItem.start_date}</p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark whitespace-nowrap">
                        <p className="text-sm">{activityItem.due_date}</p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark whitespace-nowrap">
                        <div className="text-sm">
                          {activityItem.users && activityItem.users.map((assignedTo, index) => (
                            <p
                              key={index}
                              className='bg-opacity-30 rounded-full bg-black text-white px-2 py-1 mb-1 mr-1'
                            >
                              {assignedTo.name}
                            </p>
                          ))}
                        </div>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-sm">{Array.isArray(activityItem.key_stakeholders) ? activityItem.key_stakeholders.join(', ') : activityItem.key_stakeholders}</p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-12 dark:border-strokedark">
                        <p className="text-sm">{activityItem.remarks}</p>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div >
      </div>
    </>
  );
};

ListByStatus.layout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default ListByStatus;