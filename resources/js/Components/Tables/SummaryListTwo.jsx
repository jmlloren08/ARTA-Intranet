import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SummaryListTwo = ({ refresh }) => {

  const [activities, setActivities] = useState([]);

  const fetchActivities = async () => {
    try {
      const response = await axios.get('/get-all-activities');
      setActivities(response.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }

  useEffect(() => {
    fetchActivities();
  }, [refresh]);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <div className='mb-6'>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Summary List
          </h5>
        </div>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[300px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">Work item</th>
              <th className="min-w-[300px] py-4 px-4 font-medium text-black dark:text-white">Description</th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">Category</th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">Progress</th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">Complexity</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activityItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">{activityItem.work_item}</h5>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div >
  );
};

export default SummaryListTwo;
