import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ChartOne = ({ data }) => {

  const colorMap = {
    'Completed': '#28a745',
    'In progress': '#007bff',
    'Not started': '#f39c12',
    'Blocked': '#dc3545',
  };

  const [options, setOptions] = useState({
    series: [{
      data: []
    }],
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        borderRadiusApplication: 'end',
        horizontal: false,
        distributed: true
      }
    },
    colors: [
      colorMap['Completed'],
      colorMap['In progress'],
      colorMap['Not started'],
      colorMap['Blocked']
    ],
    xaxis: {
      categories: ['Completed', 'In progress', 'Not started', 'Blocked']
    }
  });

  useEffect(() => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      series: [{
        data: [
          data.completed || 0,
          data.inProgress || 0,
          data.notStarted || 0,
          data.blocked || 0
        ]
      }]
    }));
  }, [data]);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className='mb-6'>
        <h5 className="text-xl font-semibold text-black dark:text-white">
          Bar Chart
        </h5>
      </div>
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        {/* time range selector */}
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button className="rounded bg-white py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark">
              Day
            </button>
            <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Week
            </button>
            <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Month
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="-ml-5">
          <ReactApexChart
            options={options}
            series={options.series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
