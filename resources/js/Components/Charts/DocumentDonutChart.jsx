import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const donutChartOptions = {
    colors: ['#3C50E0', '#80CAEE', '#F7A35C', '#E74C3C', '#18BC9C', '#3498DB', '#9B59B6', '#F1C40F', '#E67E22', '#BDC3C7'],
    chart: {
        type: 'donut',
    },
    labels: [
        'Approved',
        'Rejected',
        'In Progress',
        'Archived',
        'Due for Review',
        'Under Revision',
        'Under Legal Review',
        'Signed/Executed',
        'Waiting for Input',
        'Draft Expiring Soon',
    ],
    legend: {
        position: 'bottom',
    },
};

const DocumentDonutChart = () => {
    const [donutChartState, setDonutChartState] = useState({
        series: [30, 5, 15, 10, 8, 12, 6, 20, 3, 4]
    });

    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
            <div className="mb-4 justify-between gap-4 sm:flex">
                <h4 className="text-xl font-semibold text-black dark:text-white">Document Status Breakdown</h4>
            </div>
            <ReactApexChart
                options={donutChartOptions}
                series={donutChartState.series}
                type="donut"
                height={350}
            />
        </div>
    );
}

export default DocumentDonutChart;