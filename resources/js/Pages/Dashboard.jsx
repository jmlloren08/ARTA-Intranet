import DefaultLayout from '../layout/DefaultLayout';
import { Head } from '@inertiajs/react';
const Dashboard = () => {
    return (
        <>
            <Head title="Dashboard" />
            <h1>Dashboard</h1>
            <p>This page is under development.</p>
        </>
    );
}

Dashboard.layout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default Dashboard;