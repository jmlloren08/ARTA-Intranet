import React, { useEffect, useState } from 'react';
import CardDataStats from '../../components/CardDataStats';
import DefaultLayout from '../../layout/DefaultLayout';
import ChartOne from '../../Components/Charts/ChartOne';
import ChartThree from '../../Components/Charts/ChartThree';
import axios from 'axios';
import { Head, Link } from '@inertiajs/react';

const Dashboard = () => {

    const [data, setData] = useState({
        completed: 0,
        inProgress: 0,
        notStarted: 0,
        blocked: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/get-count-activities');
                setData(response.data);
            } catch (error) {
                console.log('Error fetching data: ', error);
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <Head title="Activity Tracker/Dashboard" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                <CardDataStats
                    title="Completed"
                    total={data.completed || 0}
                    link={route('list-of-activities-where-status', { status: 'Completed' })}
                >
                    <span className='text-primary'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                    </span>
                </CardDataStats>
                <CardDataStats
                    title="In progress"
                    total={data.inProgress || 0}
                    link={route('list-of-activities-where-status', { status: 'In progress' })}
                >
                    <span className='text-primary'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                    </span>
                </CardDataStats>
                <CardDataStats
                    title="Not started"
                    total={data.notStarted || 0}
                    link={route('list-of-activities-where-status', { status: 'Not started' })}
                >
                    <span className='text-primary'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                        </svg>
                    </span>
                </CardDataStats>
                <CardDataStats
                    title="Blocked"
                    total={data.blocked || 0}
                    link={route('list-of-activities-where-status', { status: 'Blocked' })}
                >
                    <span className='text-primary'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </span>
                </CardDataStats>
            </div>
            <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                <ChartOne data={data} />
                <ChartThree data={data} />
            </div>
        </>
    );
};

Dashboard.layout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default Dashboard;
