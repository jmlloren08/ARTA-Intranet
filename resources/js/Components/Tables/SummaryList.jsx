import Loader from '@/common/Loader';
import React, { useEffect, useState } from 'react';

const SummaryList = ({ activities, openEditModal }) => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (activities && activities.length > 0) {
      setLoading(false);
    }
  }, [activities]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[300px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">Work item</th >
                <th className="min-w-[300px] py-4 px-4 font-medium text-black dark:text-white">Description</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">Category</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">Status</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">Complexity</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">Start date</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">Due date</th>
                <th className="min-w-[200px] py-4 px-4 font-medium text-black dark:text-white">Assigned to</th>
                <th className="min-w-[200px] py-4 px-4 font-medium text-black dark:text-white">Key stakeholders</th>
                <th className="min-w-[300px] py-4 px-4 font-medium text-black dark:text-white">Action Items and Notes</th>
              </tr >
            </thead >
            <tbody>
              {activities.length < 1 ? (
                <tr>
                  <td colSpan="10" className="text-center py-4 px-4 text-black dark:text-white">
                    No activities found.
                  </td>
                </tr>
              ) : (
                activities.map((activityItem, key) => (
                  <tr key={key}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white hover:cursor-pointer hover:underline"
                        onClick={() => openEditModal(activityItem)}
                      >
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
                        {activityItem.assigned_to && activityItem.assigned_to.map((assignedTo, index) => (
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
                      <p className="text-sm">{activityItem.key_stakeholders}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-12 dark:border-strokedark">
                      <p className="text-sm">{activityItem.remarks}</p>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table >
        </div >
      </div >
    </>
  );
}

export default SummaryList;
